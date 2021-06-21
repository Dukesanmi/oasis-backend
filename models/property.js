const mongoose = require('mongoose');
const {Schema} = mongoose;

//Create Schema
const propertySchema = new Schema({
	title: {
		type: 'string',
		maxLength: 50,
		required: true
	},
	description: {
		type: 'string',
		maxLength: 450,
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
	subType: {
		type: 'string',
		required: true
		//conditional
	},
	landSize: {
		type: 'string'
	},
	numberOfRooms: {
		type: 'number'
	},
	otherFeatures: {
		type: 'string'
	},
	state: {
		type: 'string',
		enum: ['Abuja', 'Lagos'],
		required: true
	},
	location: {
		type: 'string',
		required: true
		//conditional
	},
	address: {
		type: 'string',
		required: true
		//may not be displayed unnecessarily to clients
	},
	price: {
		type: 'number',
		required: true
	},
	additionalFees: {
		type: 'string',
		required: true
	},
	pictures: {
		type: 'array',
		required: true
	},
	videp-tour: {
		type: 'string'
	},
	agent: {
		type: //r/ship
	},
	datePosted: {
		type: 'Date',
		default: Date.now
		required: true
	},
	comments: {
		type: 'object'
	},
	availability: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('property', propertySchema);