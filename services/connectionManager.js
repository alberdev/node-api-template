// =======================================================
// Connection Manager
// =======================================================
   
exports.isCancelable = function(req, res, next){
	
	req.cancelRequest = false;
    req.on('close', function (err){
	   console.log('REQUEST CANCELLED! ' + req.originalUrl);
       req.cancelRequest = true;
    });

	next();
};