var mongoose 		= require('mongoose');  
var log				= require('../services/consoleColor');
var versionWorker	= require('../controllers/version.worker');
var _this 			= this;

// =======================================================  
// HELPERS
// =======================================================  


// =======================================================  
// GET
// =======================================================  


exports.findAll = function(req, res) {
	
	log.color(req, 'Version', 'findAll');
	
	versionWorker.findAll(req.decoded, function(error, versions) {
		if (error) res.status(error.code).send(error);
		else res.json(versions);
	});
};

exports.findAllByType = function(req, res) {
	
	log.color(req, 'Version', 'findAllByType');
	
	versionWorker.findAllByType(req.params.type, req.decoded, function(error, versions) {
		if (error) res.status(error.code).send(error);
		else res.json(versions);
	});
};

exports.findById = function(req, res) { 
	
	log.color(req, 'Version', 'findById');
	
	versionWorker.findById(req.params.id, req.decoded, function(error, version) {
		if (error) res.status(error.code).send(error);
		else res.json(version);
	});	
};

// =======================================================  
// POST
// ======================================================= 

exports.addNew = function(req, res) {  
    
    log.color(req, 'Version', 'addNew');
	
	versionWorker.create(req.body, req.decoded, function(error, version) {
		if (error) res.status(error.code).send(error);
		else res.json(version);
	});
};

// =======================================================  
// PUT
// =======================================================  

exports.updateById = function(req, res) {
	
	log.color(req, 'Version', 'updateById');
	
	versionWorker.update(req.params.id, req.body, req.decoded, function(error, version) {
		if (error) res.status(error.code).send(error);
		else res.json(version);
	});
};

// =======================================================  
// DELETE
// =======================================================  

exports.deleteById = function(req, res) { 
	
	log.color(req, 'Version', 'deleteById');
	
	versionWorker.remove(req.params.id, req.decoded, function(error, response){
		if (error) res.status(error.code).send(error);
		else res.status(response.code).send(response);
	});
};