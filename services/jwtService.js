const log = console.log;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiry = Number(process.env.TOKEN_EXPIRY);

//CREATE TOKEN
exports.createToken = function(user) {
	try {
		let token = jwt.sign({
			id: user._id,
			name: user.name,
			email: user.username,
			phone: user.phonenumber,
			role: user.role
		}, secret, {expiresIn: expiry});
		return token;
	}
	catch(err) {
		log(err);
		return null;
	}
}
//DECODE
exports.decodeToken = function(token) {
	try {
		let decodedToken = jwt.verify(token, secret);
		return decodedToken; 
	}
	catch(err) {
		log(err);
		return null;
	}
}