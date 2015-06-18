var edge=require('edge');
var getApp = edge.func({
    source: function() {/*
        using System;
        using System.Text;
        using System.Diagnostics;
        using System.Threading.Tasks;

        public class AppDetector
        {
            public string applicationName = "App";
            public string windowText = "Text";
            public string applicationDescription = "Description";
            public string applicationVersion = "0.0.0";

            const int PROCESS_VM_READ = 0x0010;
            const int PROCESS_QUERY_INFORMATION = 0x0400;

            [System.Runtime.InteropServices.DllImport("user32.dll")]
            public static extern IntPtr GetForegroundWindow();
            [System.Runtime.InteropServices.DllImport("user32.dll")]
            public static extern uint GetWindowThreadProcessId(IntPtr hWnd, ref uint lpdwProcessId);

            [System.Runtime.InteropServices.DllImport("kernel32.dll")]
            private static extern IntPtr OpenProcess(uint dwDesiredAccess, bool bInheritHandle, uint dwProcessId);

            [System.Runtime.InteropServices.DllImport("psapi.dll")]
            private static extern uint GetModuleBaseName(IntPtr hWnd, IntPtr hModule, StringBuilder lpFileName, int nSize);

            [System.Runtime.InteropServices.DllImport("user32.dll")]
            static extern int GetWindowTextLength(IntPtr hWnd);

            [System.Runtime.InteropServices.DllImport("user32.dll")]
            private static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

            public void getApplicationName(){
                try{
                    IntPtr hwnd;
                    hwnd = GetForegroundWindow();
                    if (hwnd != null) {
                        uint currentPID = 0;
                        GetWindowThreadProcessId(hwnd, ref currentPID);
                        Process proc = Process.GetProcessById((int)currentPID);
                        applicationName = proc.MainModule.ModuleName;
                        applicationVersion = proc.MainModule.FileVersionInfo.FileVersion;
                        applicationDescription = proc.MainModule.FileVersionInfo.FileDescription;
                    }
                } catch(Exception e) {
                }

            }

            public void getWindowText(){
                try{
                    IntPtr hwnd;
                    hwnd = GetForegroundWindow();
                    if (hwnd != null) {
                        int length = GetWindowTextLength(hwnd);
                        StringBuilder winText = new StringBuilder(length + 1);
                        GetWindowText(hwnd, winText, winText.Capacity);
                        windowText = winText.ToString();
                    }
                } catch(Exception e){
                }
            }
        }

        public class Startup
        {
            public async Task<object> Invoke(dynamic input)
            {
                AppDetector app = new AppDetector();
                app.getApplicationName();
                app.getWindowText();
                return app;
            }
        }
    */},
    references: []
});

var http=require('http');
var server=http.createServer(function(req, res){
	getApp(null, function (error, appInfo) {
		if(error){
			console.log("error");
		}
		res.writeHead(200,{'Content-Type':'application/json'});
		var msg=JSON.stringify(appInfo);
		res.end(msg);
	});
});
try{
    //A static port is given, need to be converted into dynamic one.
server.listen(50786,'127.0.0.1'); 
}
catch(e){
console.log('server already running');
}
console.log('server created');
