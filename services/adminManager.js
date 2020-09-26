// =======================================================
// Filter access for only admin users
// =======================================================

exports.onlyAdmin = function(req, res, next) {
	
	if (req.decoded.user_role != 'admin') {
		res.status(401).send({error:true, message:'Not authorized'});
	}
	else next();
};