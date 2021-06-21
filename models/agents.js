const mongoose = require('mongoose');
const {Schema} = mongoose;

//Create Schema
const agentSchema = new Schema({
	name: {
		type: 'string',
		//required: [true, 'Your fullname is required']
	},
	email: {
		type: 'string',		
		//required: true,
		match: /.+\@.+\..+/,
		unique: true
	},
	password: {
		type: 'string',
		match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/
	},
	phonenumber: {
		type: 'number',
		//required: [true, 'Your phone number is required'],
		minLength: 11,
		maxLength: 14
	},
	companyname: {
		type: 'string',
		//required: true,
		unique: true
	},
	cacreg: {
		type: 'string',
		//required: true
	},
	idcard: {
		type: 'string',
		//required: true
	},
	avatar: {
		type: 'string',
	},
	properties: {
		type: ['object'],
	},
	rating: {
		type: 'number'
	},
	role: {
		type: 'string',
		default: 'agent'
	}
});

module.exports = mongoose.model('agent', agentSchema);