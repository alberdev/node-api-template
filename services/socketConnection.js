
// =======================================================
// -------------------------------------------------------
//
//                     SOCKET CONNECTION
//
// -------------------------------------------------------
// =======================================================

var log			= require('../services/consoleColor');
var pushManager	= require('../services/pushManager');
var userWorker	= require('../controllers/user.worker');
var messageWorker	= require('../controllers/message.worker'); 
var usernames = {};

module.exports = function (socket, io) {
	
	var srvSockets = io.sockets.sockets;
	log.consoleColor('SOCKET', 'SOCKET', 'Client ' + socket.decoded_token.user_email + ' connected with socket ' + socket.id, '');
	log.consoleColor('SOCKET', 'SOCKET', 'Decoded token\n', JSON.stringify(socket.decoded_token, null, 4));
	
/*
	userWorker.updateSocketId(socket.id, socket.decoded_token.user_id, null, function(error, user) {
		if (error) log.consoleColor('SOCKET_ERROR', 'SOCKET', 'Error\n', JSON.stringify(error, null, 4));
		else {
			log.consoleColor('SOCKET', 'SOCKET', socket.id + ' saved in user', '');
			
			// ---------------------
			// Look connected users
			// ---------------------
			userWorker.findBySocketsId(Object.keys(srvSockets), null, function(error, users) {
				if (error) log.consoleColor('SOCKET_ERROR', 'SOCKET', 'Error\n', JSON.stringify(error, null, 4));
				else log.consoleColor('SOCKET', 'SOCKET', 'Clients connected: ' + Object.keys(srvSockets).length + ' [ ' + Object.keys(srvSockets) + ' ]\n', JSON.stringify(users, null, 4));	
			});
		}
	});
*/
	
	
	userWorker.findById(socket.decoded_token.user_id, socket.decoded_token, function(err, user){
		if (err) log.consoleColor('SOCKET_ERROR', 'SOCKET', 'Error\n', JSON.stringify(err, null, 4));
		else {
			socket.username = user.username;
		}
	});
	
	// =======================================================  
	// CHECK
	// ======================================================= 
	
	socket.on('check', function(data){
		log.consoleColor('SOCKET', 'ON', 'check', JSON.stringify(data, null, 4));
		socket.emit('checkresponse', 'SERVER', 'checked');
    });
	
	// =======================================================  
	// ADD USER TO CHAT ROOM
	// ======================================================= 
	
	socket.on('adduser', function(data){
		
		log.consoleColor('SOCKET', 'ON', 'adduser', JSON.stringify(data, null, 4));
		
		socket.username = data.username;
		socket.room = data.offerid;
		socket.join(data.offerid);
		socket.emit('updatechat', 'SERVER', 'you have connected to room ' + data.offerid);
		// socket.broadcast.to(data.offer._id).emit('updatechat', 'SERVER', username + ' has connected to this room');
		usernames[data.username] = data.username;
    });
    
    // =======================================================  
	// REMOVE USER FROM CHAT ROOM
	// ======================================================= 
	
	socket.on('removeuser', function(data){
		
		log.consoleColor('SOCKET', 'ON', 'removeuser', JSON.stringify(data, null, 4));
		
		socket.username = data.username;
		socket.room = data.offerid;
		socket.leave(data.offerid);
		socket.emit('updatechat', 'SERVER', 'user have exit room ' + data.offerid);
		// socket.broadcast.to(data.offer._id).emit('updatechat', 'SERVER', username + ' has connected to this room');
		usernames[data.username] = data.username;
    });
    
    // =======================================================  
	// SEND MESSAGE
	// =======================================================  
    
    socket.on('sendmessage', function (data) {
	    
	    log.consoleColor('SOCKET', 'ON', 'sendmessage', JSON.stringify(data, null, 4));
	    
	    messageWorker.create(data, socket.decoded_token, function(err, message){
			if (err) log.consoleColor('SOCKET_ERROR', 'SOCKET', 'Error\n', JSON.stringify(err, null, 4));
			else {
				// EMIT SOCKET TO USERS IN OFFER ROOM
				log.consoleColor('SOCKET', 'EMIT', 'receivemessage', JSON.stringify(data, null, 4));
				io.sockets.in(socket.room).emit('receivemessage', message);
				
				// SEND USERS NOTIFICATIONS PUSH
// 				var clients = io.sockets.clients(socket.room);
				console.log('------------ CLIENTS ------------');
				io.of('/').in(socket.room).clients((error, clients) => {
				  if (error) throw error;
				  console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
				});
// 				console.log(clients);
				pushManager.sendNotificationToRoom(socket.room, socket.decoded_token, message.text, 'chat');
			}
		});
	});
    
	// =======================================================  
	// SOCKET DISCONNECTED
	// =======================================================  
	
	socket.on('disconnect', function(){
		
		log.consoleColor('SOCKET', 'ON', 'disconnect', socket.id);
		
		delete usernames[socket.username];
		// echo globally that this client has left
		// socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
    });
  
};
