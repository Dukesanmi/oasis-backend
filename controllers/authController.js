const log = console.log;
const Admin = require('../models/admins.js');
const Agent = require('../models/agents.js');
const Client = require('../models/clients.js');
const bcrypt = require('bcryptjs');
const {createToken} = require('../services/jwtService');
const expiry = Number(process.env.TOKEN_EXPIRY);
const cloudinary = require('cloudinary').v2;

//GET requests
//agent sign-up page
exports.agentReg = function(req, res) {
	res.sendFile(process.cwd() + '/pages/signupAgent.html');
}
//agent sign in
exports.agentLogin = function(req, res) {
	res.sendFile(process.cwd() + '/pages/loginAgent.html');
}
//logout
exports.logout = function(req, res) {
	res.cookie('jwt', '', {maxAge: 1});
	res.redirect('https://oasis-properties.netlify.app');
}

//POST requests
//agent sign-up
exports.registerAgent = function(req, res) {
	//check if user with this email address exists
	Agent.findOne({email: req.body.email}, (err, existingUser)=> {
		if (err) return res.status(500).json({err});
		if (existingUser) return res.status(400).json({message: 'a user with this email address already exists!'});
		//create new user
		Agent.create({...req.body}, (err, newUser)=> {
			if (err) return res.status(500).json({err});
			//hash user password
			bcrypt.genSalt(10, (err, salt)=> {
				if (err) return res.status(500).json({message: err});
				bcrypt.hash(req.body.password, salt, (err, hashedPassword)=> {
					if (err) return res.status(500).json({err});
					//save password to user data in the db
					newUser.password = hashedPassword;
					newUser.save((err, savedUser)=> {
						if (err) return res.status(500).json({err});
						//create JWT(token) for user
						let token = createToken(newUser);
						if (!token) return res.status(500).json({message: 'Sorry we could not authenticate you. Please login'});
						else {
							res.cookie('jwt', token, {maxAge: expiry * 1000, httpOnly: true});
							res.cookie('isAgent', true, {httpOnly: true});
							return res.status(200).redirect('/welcome');
						}
					});
				});
			});
			//upload and transform images in cloudinary this only works locally from postman for now
			cloudinary.uploader.upload(req.body.cacreg, (err, image)=> {
				if (err) return err;
				newUser.cacreg = image.secure_url;
				newUser.save((err, savedImage)=> {
					if (err) res.status(500).json({err});
					//log(savedImage.cacreg);
				});
			});
 		});
	});
}
//regular user sign-up
exports.registerClient = function(req, res) {
	//check if user with this username exists
	Client.findOne({email: req.body.email}, (err, existingUser)=> {
		if (err) return res.status(500).json({err});
		if (existingUser) return res.status(400).json({message: 'a user with this username already exists!'});
		//create new user
		Client.create({...req.body},(err, newUser)=> {
			if (err) return res.status(500).json({err});
			//hash user password
			bcrypt.genSalt(10, (err, salt)=> {
				if (err) return res.status(500).json({message: err});
				bcrypt.hash(req.body.password, salt, (err, hashedPassword)=> {
					if (err) return res.status(500).json({err});
					//save password to user data in the db
					newUser.password = hashedPassword;
					newUser.save((err, savedUser)=> {
						if (err) return res.status(500).json({err});
						//create JWT(token) for user
						let token = createToken(newUser);
						if (!token) return res.status(500).json({message: 'Sorry we could not authenticate you. Please login'});
						else {
							res.cookie('jwt', token, {maxAge: expiry * 1000, httpOnly: true});
							res.cookie('isAgent', false, {httpOnly: true});
							return res.status(200).redirect('/welcome');
							//return res.status(200).json({message: 'User registration successful', token});
						}
					});
				});
			})
		});
	});
}
//agent sign-in
exports.loginAgent = function(req, res) {
	//check if user exists
	Agent.findOne({email: req.body.email}, (err, userExists)=> {
		if (err) res.status(500).json({err});
		if (!userExists) res.status(401).json({message: 'Incorrect email address'});
		//check if password is correct
		let match = bcrypt.compareSync(req.body.password, userExists.password);
		if (!match) return res.status(401).json({message: 'Incorrect password'});
		//create token
		let token = createToken(userExists);
		if (!token) return res.status(500).json({message: 'Sorry we could not authenticate you. Please login'});
		else {
			res.cookie('jwt', token, {maxAge: expiry, httpOnly: true});
			res.cookie('isAgent', true, {httpOnly: true});
			return res.status(200).redirect('/welcome');
			//return res.status(200).json({message: 'User logged in successfully', token}); 
		}
	});
}
//regular user sign-in
exports.loginClient = function(req, res) {
	//check if user exists
	Client.findOne({email: req.body.email}, (err, userExists)=> {
		if (err) res.status(500).json({err});
		if (!userExists) res.status(401).json({message: 'Incorrect username'});
		//check if password is correct
		let match = bcrypt.compareSync(req.body.password, userExists.password);
		if (!match) return res.status(401).json({message: 'Incorrect password'});
		//create token
		let token = createToken(userExists);
		if (!token) return res.status(500).json({message: 'Sorry we could not authenticate you. Please login'});
		else {
			res.cookie('jwt', token, {maxAge: expiry, httpOnly: true});
			res.cookie('isAgent', false, {httpOnly: true});
			return res.status(200).redirect('/welcome');
			//return res.status(200).json({message: 'User logged in successfully', token});
		}
	});
}
//admin sign-in
exports.loginAdmin = function(req, res) {
	//check if user exists
	Admin.findOne({email: req.body.email}, (err, adminExists)=> {
		if (err) res.status(500).json({err});
		if (!adminExists) res.status(401).json({message: 'Incorrect email address'});
		//check if password is correct
		let match = bcrypt.compareSync(req.body.password, adminExists.password);
		if (!match) return res.status(401).json({message: 'Incorrect password'});
		//create token
		let token = createToken(adminExists);
		if (!token) return res.status(500).json({message: 'Sorry we could not authenticate you. Please login'});
		return res.status(200).json({message: 'Admin logged in successfully', token});
	});
}

//for admin activities
exports.getAdminDetails = function(req, res)  {
	Admin.find({}, (err, admins)=> {
		if (err) return res.status(500).json({err});
		return res.status(200).json({message: 'Request successful', admins});
	});
}
exports.adminGetAgents = function(req, res) {
	Agent.find({}, (err, agents)=>{
		if (err) return res.status(500).json({err});
		return res.status(200).json({message: 'Request successful', agents});
	});
}
exports.adminGetAgentById = function(req, res) {
	Agent.find(req.params.id, (err, agent)=>{
		if (err) return res.status(500).json({err});
		return res.status(200).json({message: 'Request successful', agent});
	});
}
exports.adminGetClients = function(req, res) {
	Client.find({}, (err, clients)=>{
		if (err) return res.status(500).json({err});
		return res.status(200).json({message: 'Request successful', clients});
	});
}
exports.adminGetClientById = function(req, res) {
	Client.findById(req.params.id, (err, client)=> {
		if (err) return res.status(500).json({err});
		return res.status(200).json({message: 'Request successful', client});
	});
}
exports.adminRemoveAgent = function(req, res) {
	Agent.findByIdAndDelete(req.params.id, (err, agent)=> {
		if (err) return res.status(500).json({err});
		else if (!agent) return res.status(404).json({message: 'Agent not found'});
		return res.status(200).json({message: 'Agent successfully removed'});
	});
}
exports.adminRemoveClient = function(req, res) {
	Client.findByIdAndDelete(req.params.id, (err, client)=> {
		if (err) return res.status(500).json({err});
		else if (!client) return res.status(404).json({message: 'User not found'});
		return res.status(200).json({message: 'User successfully removed'});
	});
}
