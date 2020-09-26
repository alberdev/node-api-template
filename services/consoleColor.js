var clc   = require('cli-color');
var _this = this;

exports.consoleColor = function(method, field, func, value) {  
  
  switch (method) {
	  case 'GET': console.log(clc.xterm(45).bgBlack.bold(' ' + field + ' ') + ' ' + clc.xterm(105)(func) + ' ' + value); break;
	  case 'POST': console.log(clc.greenBright.bgBlack.bold(' ' + field + ' ') + ' ' + clc.xterm(105)(func) + ' ' + value); break;
	  case 'PUT': console.log(clc.xterm(226).bgBlack.bold(' ' + field + ' ') + ' ' + clc.xterm(105)(func) + ' ' + value); break;
	  case 'DELETE': console.log(clc.xterm(203).bgBlack.bold(' ' + field + ' ') + ' ' + clc.xterm(105)(func) + ' ' + value); break;
	  case 'SOCKET': console.log(clc.xterm(15).bgXterm(199).bold(' ' + field + ' ') + ' ' + clc.xterm(199)(func) + ' ' + value); break;
	  case 'SOCKET_DISCONNECT': console.log(clc.xterm(15).bgXterm(128).bold(' ' + field + ' ') + ' ' + clc.xterm(128)(func) + ' ' + value); break;
	  case 'SOCKET_ERROR': console.log(clc.xterm(15).bgXterm(9).bold(' ' + field + ' ') + ' ' + clc.xterm(9)(func) + ' ' + value); break;
  }
};

exports.color = function(req, model, method) {
	_this.consoleColor(req.method, model, method, '\nBODY: ' + JSON.stringify(req.body, null, 4) + '\nPARAMS: ' + JSON.stringify(req.params));
};