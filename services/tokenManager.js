var jwt    			= require('jsonwebtoken');
var config			= require('../config');
var messageManager	= require('../services/messageManager');


// Create token
// =======================================================

exports.createToken = function(user, expiration) {    
  return jwt.sign(user, config.token.phrase, { expiresIn: expiration });			  
};


// Check token and callback decode
// =======================================================

exports.checkToken = function(token, callback) {
	jwt.verify(token, config.token.phrase, callback);
};


// Get token and decode
// =======================================================

exports.tokenMiddleware = function(req, res, next){
	
	// var token = req.body.token || req.query.token || req.headers['Authorization'];
	var token = null;
	var bearerToken = req.headers['authorization'];
	if (bearerToken != null) token = bearerToken.split("Bearer ")[1];
	if (token != null) {
		jwt.verify(token, config.token.phrase, function(err, decoded){
			if(err) res.status(498).send(messageManager.TOKEN_ERROR(err.message));
			else {
				req.decoded = decoded; // establecemos el token en el request
				next();
			}
		});
	} else {
		res.status(499).send(messageManager.UNABLE_GET_TOKEN);
	}
};