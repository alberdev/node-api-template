
// =======================================================
// -------------------------------------------------------
//
// NODE API
//
// -------------------------------------------------------
// =======================================================

var express     = require('express');
var https 		= require('https');
var fs		 	= require("fs");
var bodyParser	= require('body-parser');
var mongoose    = require('mongoose');
var nunjucks 	= require('nunjucks');
var log			= require('./services/consoleColor');
var config		= require('./config');

// =======================================================
// This middleware will create temp files for upload files
// =======================================================

// var multipart 			= require('connect-multiparty');
// var multipartMiddleware  = multipart();

// =======================================================
// API Versions Control
// =======================================================

var VERSIONS = {'Version 1': '/v1'};

// =======================================================
// Register schemas
// =======================================================

var Version	= require('./models/version.model');

// =======================================================
// Config mongoose
// =======================================================

mongoose.connect(config.app.database, config.app.mongo); // conectar a MongoDB
mongoose.set('debug', true); // log de todos los queries en MongoDB

// =======================================================
// App instance
// =======================================================

var app = express();
app.use(config.app.folder, express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || config.app.port));

// =======================================================
// Body Parser Middleware
// =======================================================

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// =======================================================
// Allow Content
// =======================================================

app.use(function(req, res, next) {
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	  
	// NO CACHE
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
		
	next();
}); 

app.disable('etag');

// =======================================================
// Routes
// =======================================================

var index	 = require('./routes/index.route');
var versions = require('./routes/versions.route');

// =======================================================
// Routes Endpoints
// =======================================================

var cryptManager 		= require('./services/cryptManager');
var headersManager 		= require('./services/headersManager');
var connectionManager 	= require('./services/connectionManager');

app.use([cryptManager.decrypt, cryptManager.encrypt, connectionManager.isCancelable, headersManager.getHeaders]);

app.use(config.app.folder + '/v1', index);
app.use(config.app.folder + '/v1/versions', versions);

// =======================================================
// Create http server & init
// =======================================================

var http = require('http');
var server = http.createServer(app);

server.setTimeout(60000);

// Setup timeout socket server
// Only for chats
/*
server.on('timeout', (socket) => {
  socket.write([
    'HTTP/1.1 408 Request Timeout',
    'Connection: close'
  ].join('\n') + '\n\n');

  socket.end();
});
*/

// =======================================================
// Register SSL files
// For SSL connection (not neccesary with Cloudlfare)
// =======================================================

/*
var credentials = {
	//ca: fs.readFileSync("./ssl/api_app_com.ca-bundle", 'utf8'), // la certification authority o CA
	key: fs.readFileSync("./ssl/api_app_com.key", 'utf8'), // la clave SSL, que es el primer archivo que generamos ;)
	cert: fs.readFileSync("./ssl/api_app_com.crt", 'utf8') // el certificado
};
*/

// =======================================================
// Create server with SSL & init
// For SSL connection (not neccesary with Cloudflare)
// =======================================================

// var server = https.createServer(credentials, app);

// =======================================================
// Configure Nunjucks
// Visible folders
// =======================================================

nunjucks.configure('public', {
    autoescape: true,
    express: app
});

// =======================================================
// Register socket file
// For chats
// =======================================================

/*
var socketService	= require('./services/socketConnection');
var io 				= require('socket.io')(server);
*/

// =======================================================
// Socket connection
// For chats
// =======================================================

/*
var tokenManager 	= require('./services/tokenManager');

io.use(function(socket, next) {
	
	var token = socket.request._query['token'];
	log.consoleColor('SOCKET', 'SOCKET', 'Token', token);
	
	tokenManager.checkToken(token, function(err, decoded){	
		if(err) {
			log.consoleColor('SOCKET_ERROR', 'SOCKET', 'Token Expired', '');
			next(new Error('TOKEN EXPIRED'));
		} else {
			socket.decoded_token = decoded;
			next();
		}	
	});
});

io.on('connection', function(socket){	
	socketService(socket, io);
});
*/

// =======================================================
// Listen connections to server
// =======================================================

server.listen(app.get('port'), function(){
	console.log('Secure node server listening on port ' + app.get('port'));
});
