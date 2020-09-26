var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var	VersionSchema = new Schema({
	type: { type: String, required: true }, // ios, android...
	name: { type: String, required: true },
	update: { type: Boolean, required: true }
}, {
	versionKey: '_v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Update values
// =======================================================

VersionSchema.methods.fill = function(data) {
    
    var item = this;
    
    if (data.type != undefined)		item.type	= data.type;
    if (data.name != undefined)		item.name	= data.name;
    if (data.update != undefined)	item.update	= data.update;
};

module.exports = mongoose.model('Version', VersionSchema);