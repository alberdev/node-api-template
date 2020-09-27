// Send push notifications with Apple Push Notification, 
// Google Cloud Messaging, Windows Push Notification and 
// Amazon Device Messaging services
// =======================================================

var mongoose 		= require('mongoose');
var admin 			= require("firebase-admin");
var config			= require('../config');
var serviceAccount 	= require(config.push.cert_folder);
var Q				= require('q');  
var _this 			= this;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.push.database_url
});

// =======================================================
// Helpers
// =======================================================


// =======================================================
// Methods
// =======================================================

exports.sendNotification = function(push_data, id, title, body, next) {
	_this.sendToId(push_data, title, body, 1, { next: next, id: id.toString() });
};

exports.sendToId = function(push_data, title, body, badge, payload){
		
	// See the "Defining the message payload" section above for details
	// on how to define a message payload.
	var not = {
	  notification: {
	    title: title,
	    body: body,
	    badge: badge.toString()
	    //sound = "ping.aiff";
	  },
	  data: payload
	};
	
	// Set the message as high priority and have it expire after 24 hours.
	var options = {
	  priority: "high",
	  timeToLive: 60 * 60 * 24
	};
	
	// Send a message to the device corresponding to the provided
	// registration token with the provided options.
	if (push_data.token != null) {
		admin.messaging().sendToDevice(push_data.token, not, options)
		  .then(function(response) {
		    console.log("Successfully sent message:", JSON.stringify(response, null, 4));
		  })
		  .catch(function(error) {
		    console.log("Error sending message:", JSON.stringify(error, null, 4));
		  })
	} else {
		console.log("Error sending message: No push token provided by user");
	}
};

