var mongoose 	= require('mongoose');
var _this 		= this;

// CHECK ORDER
// ===============================================================

exports.isAuthorizedOrder = function(order, decoded) {
	if (isClientInOrder(order, decoded.user_id) || isProfessionalInOrder(order, decoded.user_id) || decoded.user_role == 'admin') return true;
	else return false;
};

function isClientInOrder(order, client_id) {
	return (order.client_id._id == client_id);
};

function isProfessionalInOrder(order, professional_id) {
	for(var i = 0; i < order.items.length; i++) {
		if (order.items[i].professional_id._id == professional_id) {
			return true;
		}
	}
	return false;
};

// CHECK EVENT
// ===============================================================

exports.isAuthorizedEvent = function(event, decoded) {
	if ((event.user_id == decoded.user_id) || decoded.user_role == 'admin') return true;
	else return false;
};


// CHECK USER
// ===============================================================

exports.isAuthorizedUser = function(user, decoded) {
	
	if (user._id != decoded.user_id && decoded.user_role != 'admin') return false;
	else return true;
};

exports.isAuthorizedUserId = function(userid, decoded) {
	
	if (userid != decoded.user_id && decoded.user_role != 'admin') return false;
	else return true;
};

/*
// Check id
// ===============================================================

exports.isAuthorizedUserId = function(userId, decoded, result) {

	if (userId != decoded.user_id) {
		User.findById(userId, function(err, user) {
		    if (err) result(false);
		    if (!user) result(false);		
			else if (_this.isAuthorizedUser(user, decoded)) result(true);
			else result(false);
	    });
	}
	else result(true);
};
*/