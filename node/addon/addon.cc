#define BUILDING_NODE_EXTENSION

#import <ApplicationServices/ApplicationServices.h>
#import <CoreFoundation/CoreFoundation.h>
#include <node.h>
#include <iostream>
#include <v8.h>
using namespace v8;
using namespace std;

Local<Function> cb;
Local<Function> logCb;

CGEventRef MouseTapCallback( CGEventTapProxy aProxy, CGEventType aType, CGEventRef aEvent, void* aRefcon ) {
    const unsigned argc = 1;

    if( aType == kCGEventLeftMouseDown ) {
      Local<Value> argv[argc] = { Local<Value>::New(String::New("down")) };
      cb->Call(Context::GetCurrent()->Global(), argc, argv);
    } else if(aType == kCGEventLeftMouseUp) {
    } else {
    }

    // CGPoint theLocation = CGEventGetLocation(aEvent); // theLocation.x, theLocation.y
    return aEvent;
}

void LogWithCallback(const char* str) {
    const unsigned argc = 1;
    Local<Value> argv[argc] = { Local<Value>::New(String::New(str))};
    logCb->Call(Context::GetCurrent()->Global(), argc, argv);
}


Handle<Value> RunCallback(const Arguments& args) {
    HandleScope scope;
    cb    = Local<Function>::Cast(args[0]);
    logCb = Local<Function>::Cast(args[1]);

    CGEventMask theEventMask =  CGEventMaskBit(kCGEventLeftMouseDown) |
                                CGEventMaskBit(kCGEventLeftMouseUp);
    CFMachPortRef theEventTap = CGEventTapCreate(
                                    kCGSessionEventTap,
                                    kCGHeadInsertEventTap,
                                    0,
                                    theEventMask,
                                    MouseTapCallback,
                                    NULL
                                );
    if(!theEventTap) {
        LogWithCallback("Failed to create event tap!");
    }

    CFRunLoopSourceRef theRunLoopSource =
        CFMachPortCreateRunLoopSource( kCFAllocatorDefault, theEventTap, 0);

    CFRunLoopAddSource(
        CFRunLoopGetCurrent(),
        theRunLoopSource,
        kCFRunLoopCommonModes
    );
    CGEventTapEnable(
        theEventTap,
        true
    );
    LogWithCallback("Before CFRunLoopRun");
    //CFRunLoopRunInMode(kCFRunLoopDefaultMode, 10, false);
    CFRunLoopRun();
    LogWithCallback("After CFRunLoopRun");

    return scope.Close(Undefined());
}

void Init(Handle<Object> exports, Handle<Object> module) {
    exports->Set(
        String::NewSymbol("runCallback"),
        FunctionTemplate::New(RunCallback)->GetFunction()
    );
}

NODE_MODULE(addon, Init);
