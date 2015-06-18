#include <node.h>
#include <string>
#include <iostream>

using namespace v8;

HHOOK mouseHook;
HHOOK keyboardHook;

Local<Function> cb;

LRESULT CALLBACK MouseCallback(int nCode, WPARAM wParam, LPARAM lParam)
{
	MOUSEHOOKSTRUCT * pMouseStruct = (MOUSEHOOKSTRUCT *)lParam;
	if (pMouseStruct != NULL){
		if (wParam == WM_LBUTTONUP || wParam == WM_RBUTTONUP)
		{
			//printf("%s\n", "click: ");
			const unsigned argc = 1;
			Local<Value> argv[argc] = { Local<Value>::New(String::New("click")) };
			cb->Call(Context::GetCurrent()->Global(), argc, argv);
		}
	}
	return CallNextHookEx(mouseHook, nCode, wParam, lParam);
}

LRESULT CALLBACK KeyboardCallback(int nCode, WPARAM wParam, LPARAM lParam)
{
	if (nCode >= 0){
		if (wParam == WM_KEYUP){
			//printf("%s\n", "keyboard");
			const unsigned argc = 1;
			Local<Value> argv[argc] = { Local<Value>::New(String::New("keyboard")) };
			cb->Call(Context::GetCurrent()->Global(), argc, argv);
		}
	}
	return CallNextHookEx(keyboardHook, nCode, wParam, lParam);
}


void setHook(){
    // std::string test="this is a test!";
    // printf("%s\n", test);
  	HINSTANCE hInstance = GetModuleHandle(NULL);
	if (!(mouseHook = SetWindowsHookEx(WH_MOUSE_LL, MouseCallback, hInstance, NULL))){
		printf("%s\n", "Failed to install mouse hook!");
	}
	if (!(keyboardHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardCallback, hInstance, NULL))){
		printf("%s\n", "Failed to install keyboard hook!");
	}
	else{
		printf("%s\n", "hook installed!");
	}
}

Handle<Value> RunCallback(const Arguments& args) {
	HandleScope scope;
	cb = Local<Function>::Cast(args[0]);
	/*const unsigned argc = 1;
	Local<Value> argv[argc] = { Local<Value>::New(String::New("hello world")) };
	cb->Call(Context::GetCurrent()->Global(), argc, argv);
	cb->Call(Context::GetCurrent()->Global(), argc, argv);
*/
	setHook();
	MSG msg;
	while (GetMessage(&msg, NULL, 0, 0)){

	}
	UnhookWindowsHookEx(mouseHook);
	UnhookWindowsHookEx(keyboardHook);
	return scope.Close(Undefined());
}

void Init(Handle<Object> exports, Handle<Object> module) {
  exports->Set(String::NewSymbol("runCallback"),
      FunctionTemplate::New(RunCallback)->GetFunction());
}

NODE_MODULE(addon, Init)
