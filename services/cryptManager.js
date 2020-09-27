// =======================================================
// Crypt Text
// =======================================================

var crypto 	= require('crypto')
var config	= require('../config');
   
// DECRYPT JSON
// Decode body encrypted json

exports.decrypt = function(req, res, next){
	
	if (req.body.encoded != null) {
		var text = decryptText(req.body.encoded, req.body.request_id);
		if (text != "") {
			req.decrypted = JSON.parse(text);
			console.log('DECODED: ' + JSON.stringify(req.decrypted, null, 4));
		}
	}	
	next();
};

function decryptText(encryptdata, iv) {

	console.log('ENCODED: ' + encryptdata);
	console.log('IV: ' + iv);
	var decipher = crypto.createDecipheriv('aes-256-cbc', config.crypt.key, iv);
	let decrypted = decipher.update(encryptdata,'base64','utf8') + decipher.final('utf8');
	return decrypted;
}

// ENCRYPT JSON
// Modify json response to encrypt

exports.encrypt = function(req, res, next){
	
	((proxied) => {
		res.json = function (data) {
			return proxied.call(this, encryptJSON(data));
		};
	})(res.json);
/*
	res.json = function (data) {
		return encryptJSON(data);
	};
*/
  	
	next();
};

function encryptJSON(json) {
	let iv = makeIV(16);
	let encoded = makeEncrypt(json, iv);
	return { request_id: iv, encoded: encoded };
}

function makeEncrypt(json, iv) {
	console.log('TEXT: ' + JSON.stringify(json, null, 4));
	console.log('IV: ' + iv);
	if(!json) return ''
	var cipher = crypto.createCipheriv('aes-256-cbc', config.crypt.key, iv);
	let crypted = cipher.update(JSON.stringify(json), 'utf8', 'base64') + cipher.final('base64');
	return crypted;
}

function makeIV(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}