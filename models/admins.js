const mongoose = require('mongoose');
const {Schema} = mongoose;

//Create Schema
const adminSchema = new Schema({
	name: {
		type: 'string',
		required: [true, 'Fullname is required']
	},
	email: {
		type: 'string',		
		required: [true, 'Email address is required'],
		match: /.+\@.+\..+/,
		unique: true
	},
	password: {
		type: 'string',
	},
	phonenumber: {
		type: 'number',
		required: [true, 'Phone number is required'],
		//match
		minLength: 11,
		maxLength: 14
	},
	avatar: {
		type: 'string'
		//default:
	},
	role: {
		type: 'string',
		default: 'admin'
	}
});

module.exports = mongoose.model('admin', adminSchema);