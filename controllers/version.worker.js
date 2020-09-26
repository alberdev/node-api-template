var mongoose 			= require('mongoose');  
var Version  			= mongoose.model('Version');
var authorizeManager	= require('../services/authorizeManager');
var _this 				= this;

const DEFAULT_LIMIT = 0;
const DEFAULT_PAGE = 0;
const DEFAULT_SELECT = null;
const DEFAULT_POPULATE = null;

// =======================================================  
// FIND
// ======================================================= 

exports.find = function(search, unique, limit, page, populate, select, decoded, response) {
		
	Version.
		find(search).
		select(select).
		skip(limit * page).
		limit(limit).
		populate(populate).
		sort({ title: 'desc' }).
		exec(function(err, items) {
		
		if (err) response({ error:true, code: 501, type: 'SERVER_ERROR', message: err.message, data: err }, null);
		else if (unique) 
		{
			var item = items[0];
			if (!item) response({ error:true, code: 404, type: 'NO_RESULTS', message: 'Could not find any item' }, null);
			else response(null, item);
		}
		else 
		{
			console.log('VERSIONS RESULTS: ' + items.length);
			response(null, items);
		} 
		
	});
};

exports.findAll = function(decoded, response) {
	_this.find(null, false, DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_POPULATE, DEFAULT_SELECT, decoded, response);
};

exports.findAllByType = function(type, decoded, response) {
	_this.find({ 'type': type }, false, DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_POPULATE, DEFAULT_SELECT, decoded, response);
};

exports.findById = function(id, decoded, response) {
	_this.find({ '_id': id }, true, DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_POPULATE, DEFAULT_SELECT, decoded, response);
};

// =======================================================  
// NEW
// ======================================================= 

exports.create = function(body, decoded, response) {
	
	var version = new Version();
	version.fill(body);
	version.save(function(err, savedVersion) {
	    if(err) response({ error:true, code: 501, type: 'SERVER_ERROR', message: err.message, data: err }, null);
	    else response(null, savedVersion);
	});
};

// =======================================================  
// UPDATE
// ======================================================= 

exports.update = function(id, body, decoded, response) {
	
	_this.find({ '_id': id }, true, DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_POPULATE, DEFAULT_SELECT, decoded, function(error, version) {
		if (error) response(error, null);
		else {
			version.fill(body);
			version.save(function(err, updatedVersion) {
			    if(err) response({ error:true, code: 501, type: 'SERVER_ERROR', message: err.message, data: err }, null);
			    else response(null, updatedVersion);
			});
		}
	});
};

// =======================================================  
// REMOVE
// ======================================================= 

exports.remove = function(id, decoded, response) {
	
	Version.find({ '_id': id }).remove().exec(function(err, removed) {
		if (err) response({ error:true, code: 501, type: 'SERVER_ERROR', message: err.message, data: err }, null);
		else response(null, {error:false, code: 204, type: 'DELETED_SUCCESS', message: removed + ' Items removed successfully'});
	});
};
