var express 		= require('express');
var router 			= express.Router();
var tokenManager 	= require('../services/tokenManager');
var cryptManager 	= require('../services/cryptManager');
var adminManager 	= require('../services/adminManager');
var versionCtrl		= require('../controllers/version.ctrl'); 


// WITHOUT TOKEN
// =======================================================
  
router.route('/')
	.get(versionCtrl.findAll); 
  
router.route('/:type') 
	.get(versionCtrl.findAllByType); 
  
// WITH TOKEN
// =======================================================  

router.use(tokenManager.tokenMiddleware);

router.route('/') 
	.post(adminManager.onlyAdmin, versionCtrl.addNew);  

router.route('/:id')
	.get(adminManager.onlyAdmin, versionCtrl.findById)					
	.put(adminManager.onlyAdmin, versionCtrl.updateById)			
	.delete(adminManager.onlyAdmin, versionCtrl.deleteById); 

// ======================================================= 

module.exports = router;