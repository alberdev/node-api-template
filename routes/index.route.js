var express 		= require('express');
var router 			= express.Router();
var cryptManager 	= require('../services/cryptManager');

// WITHOUT TOKEN
// =======================================================

router.get('/', function(req, res){
	res.json({message: 'Node server working!'});
});

// =======================================================  

module.exports = router;