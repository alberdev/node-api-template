var express 		= require('express');
var router 			= express.Router();
var cryptManager 	= require('../services/cryptManager');
var authCtrl        = require('../controllers/auth.ctrl');
var usersCtrl       = require('../controllers/user.ctrl');
var postalcodeCtrl  = require('../controllers/postalcode.ctrl');
var geodataCtrl  	= require('../controllers/geodata.ctrl');

// WITHOUT TOKEN
// =======================================================

router.get('/', function(req, res){
	res.json({message: 'Node server working!'});
});

// =======================================================  

module.exports = router;