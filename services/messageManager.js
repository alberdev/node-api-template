
module.exports = 
{
	// SERVER ERROR
	SERVER_ERROR: function(error) {
		return { error:true, code: 501, type: 'SERVER_ERROR', message: error.message, data: error };
	},
	
	// ERROR
	//NO_RESULTS: 		{ error:true, code: 404, type: 'NO_RESULTS', message: 'Could not find any item' },
	NOT_AUTHORIZED: 	{ error:true, code: 401, type: 'NOT_AUTHORIZED', message: 'Not authorized' },
	UNABLE_GET_TOKEN: 	{ error:true, code: 499, type: 'UNABLE_GET_TOKEN', message: 'Unable to get token' },
	TOKEN_ERROR: function(message) {
		return { error:true, code: 498, type: 'TOKEN_ERROR', message: message };
	},
	
	// SUCCESS
	NO_RESULTS: 		{ error:false, code: 200, type: 'NO_RESULTS', message: 'Could not find any item' },
	DELETED_SUCCESS: function(quantity) {
		return { error:false, code: 204, type: 'DELETED_SUCCESS', message: quantity + ' Items removed successfully' };
	},	
}; 
