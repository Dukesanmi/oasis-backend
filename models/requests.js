const mongoose = require('mongoose');
const {Schema} = mongoose;

//Create Schema
const requestSchema = new Schema({
	name: {
		type: 'string',
		required: true 
	},
	email: {
		type: 'string',		
		required: [true, 'Your email address is required'],
		match: /.+\@.+\..+/,
		unique: true
	},
	phonenumber: {
		type: 'number',
		required: [true, 'Your phone number is required'],
		//match: /./,//tbd
		minLength: 11,
		maxLength: 14
	},
	role: {
		type: 'string',
		enum: ['admin', 'agent', 'client']
	},
	category: {
		type: 'string',
		enum: ['Buy', 'Rent', 'Shortlet', 'Long-term Lease', 'Rent-to-own', 'Mortgage', 'Off-plan', 'Joint Venture', 'Flat mate'],
		required: true
	},
	type: {
		type: 'string',
		enum: ['House', 'Flat', 'Land', 'Commercial'],
		required: true
	},
	subtype: {
		type: 'string',
		required: true
		//conditional
	},
	numberofrooms: {
		type: 'number'
	},
	state: {
		type: 'string',
		required: true,
		enum: ['Lagos, Abuja']
	},
	location: {
		type: 'string',
		required: true
		//conditional
	},
	budget: {
		type: 'number',
		required: true
	},
	additionaldescription: {
		type: 'string',
		required: true,
	},
	dateposted: {
		type: 'Date',
		default: Date.now,
		required: true
	}
});

module.exports = mongoose.model('request', requestSchema);