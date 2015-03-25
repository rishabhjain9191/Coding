var path=require('path');
var a="C:\\Users\\Win64\\AppData\\Roaming\\Adobe\\CEP\\extensions\\com.creativeworx.tthtml\\node\\";
var b="C:\\Users\\Win64\\AppData\\Roaming\\Adobe\\CEP\\extensions\\com.creativeworx.tthtml\\node\\windows\\build\\Release\\addon.node";

console.log(path.relative(a,b));