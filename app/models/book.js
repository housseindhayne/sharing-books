var mongoose = require('mongoose');

module.exports = mongoose.model('Book', {
	name : {type : String, default: ''},
	owner : {type : String, default: ''},
	cover : {type : String, default: ''},
	description : {type : String, default: ''},
	reservedBy : {type : String, default: 'No one'}

});