var fs 			= require('fs');
var Jimp 		= require("jimp");

exports.upload = function(type, photos, decoded, response) {
	console.log('uploading');
	generateFolders(photos, decoded.user_id, function(destination_folder, original_filename, square_filename) {			
		uploadFile(photos.path, destination_folder, original_filename, function(err, uploaded){
			
			if (err) response(err, null, null);
			else {
				console.log('File uploaded to: ' + destination_folder + '/' + original_filename);
				obtainResizedImage(type, destination_folder, original_filename, square_filename, function(err, file){
					if (err) response(err, null, null);
					else response(null, file, original_filename);
				});
			}
			
		});
	});
};

function generateFolders(photos, userid, next) {
	
	// Paths
	var destination_folder = './public/uploads/' + userid;
    
    // File Names
    var filename = photos.name.split('.');
	var original_filename = photos.name;
	var square_filename = filename[0] + '_256_256.' + filename[1];
		   
	if (!fs.existsSync(destination_folder)){
		fs.mkdirSync(destination_folder);
	}
	
	next(destination_folder, original_filename, square_filename);
};

function uploadFile(tmp_path, destination_folder, original_filename, response) {
	
	fs.readFile(tmp_path, function (err, data) {
		    
	    if (err) {
		    response(err, null);
		    return;
		}
		
		fs.writeFile(destination_folder + '/' + original_filename, data, function (err) {
	        if (err) response(err, null);
	        else response(null, true);
	    });
	    
	    //dont forgot the delete the temp files.
		fs.unlink(tmp_path, function() {
            if (err) console.log('ERROR deleting temp files: ' + err.message);
        });
	});
};

function obtainResizedImage(type, destination_folder, original_filename, square_filename, response) {
	
	Jimp.read(destination_folder + '/' + original_filename, function (err, jimp_image) {
	    
	    if (err) response(err, null);
	    else {
		    jimp_image
		    	.scaleToFit(512, 512)
				.quality(60)                 
				.write(destination_folder + '/' + original_filename); 
				
		    var file = original_filename;
		    
		    if (type == 'avatar') { 
		        jimp_image
		        	.cover(256, 256)            
			        .quality(60)                 
			        .write(destination_folder + '/' + square_filename); 
			    file = square_filename;
		    }
		    
		    response(null, file);
	    }
	});
};