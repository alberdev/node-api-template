
// Pass generator
// ===============================================================

exports.generatePassNumbers = function(length) {
	
	var pass = "", possible = "0123456789";
	for( var i=0; i < length; i++ ) pass += possible.charAt(Math.floor(Math.random() * possible.length));
	return pass;
};

exports.generatePassString = function(length) {
	
	var pass = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for( var i=0; i < length; i++ ) pass += possible.charAt(Math.floor(Math.random() * possible.length));
	return pass;
};