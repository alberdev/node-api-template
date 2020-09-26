// =======================================================
// Headers
// =======================================================

exports.getHeaders = function(req, res, next){
	
	// Language
	if (req.headers['language'] != null) {
		req.language = req.headers['language']; 
		next();
	}
	else res.status(404).send({ error: true, code: 404, type: 'UNABLE_GET_HEADERS', message: 'Unable get headers' });
};