const log = console.log;
const {decodeToken, decodeTokenAsync} = require('../services/jwtService');
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const Agent = require('../models/agents.js');
const Client = require('../models/clients.js');

//To allow check if user is authorized on the Server
exports.authenticateInApi = function(req, res, next) {
	//check if there is an auth token,
	if (!req.headers.authorization) return res.status(403).json({message: 'Authorization header required'});
	const splitHeader = req.headers.authorization.split(' ');
	if (splitHeader[0] !== 'Bearer') return res.status(401).json({message: 'Authorization format is Bearer <token>'}); 
	const token = splitHeader[1];
	//decode the token
	let decodedToken = decodeToken(token);
	if (!decodedToken) return res.status(401).json({message: 'Invalid authorization token. Please login'});
	else{ 
		req.user = decodedToken;
		next();	
	}
}

//To check if user is authorized on the browser
exports.authenticateInBrowser = function(req, res, next) {
	const token = req.cookies.jwt;
	if (token) {
		let decodedToken = decodeToken(token);
		if (!decodedToken) return res.status(401).redirect('/auth/login');
		else next();
	}
	else{
		res.redirect('/auth/login');
	}
}
//Check current user and get a user object that can be used to display user data in frontend(ejs). Divine please check this
exports.checkCurrentUser = function(req, res, next) {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, secret, async(err, decodedToken)=> {
			if (err) {
				res.locals.user = null;
				log(err.message);
				next();
			}
			else {
				if (req.cookies.isAgent) {
					let user = await Agent.findById(decodedToken.id);
					res.locals.user = user;
					log(res.locals.user.name);
					//return user;
					next();
				}
				else {
					let user = await Client.findById(decodedToken.id);
					res.locals.user = user;
					log(res.locals.user);
					//return user;
					next();
				}			
			}
		});
	}
	else res.locals.user = null;
	next();
}

//check by user role
//check if user is admin
exports.checkIfAdmin = function(req, res, next) {
	if (req.user.role !== 'admin') return res.status(401).json({message: 'This route is restricted to admin users'});
	return next();
}
//check if user is an agent
exports.checkIfAgent = function(req, res, next) {
	if (req.user.role !== 'agent') res.status(401).json({message: 'This route is restricted to real estate agent users'});
	return next();
}
//check if user is a regular client
exports.checkIfAClient = function(req, res, next) {
	if (req.user.role !== 'client') res.status(401).json({message: 'This route is restricted to client users'});
	return next();
}
