const log = console.log;
const Admin = require('../models/admins.js');
const bcrypt = require('bcryptjs');
const password = process.env.ADMIN_PASSWORD;

module.exports = function() {
	//check if there is an admin account
	Admin.findOne({role: 'admin'}, (err, admin)=> {
		if (err) throw err;
		if (admin) {log('admin account already exists');}
		//if there is none create an admin account
		else {
			Admin.create({
				name: 'Oasis Properties',
				email: 'ouremail@example.com',
				phonenumber: '09035053891',
				role: 'admin'
			}, (err, adminUser)=> {
				if (err) throw err;
				//generate salt and hash the password
				bcrypt.genSalt(10, (err, salt)=> {
					if (err) throw err;
					log(password);
					bcrypt.hash(password, salt, (err, hash)=> {
						if (err) throw err;
						adminUser.password = hash;
						adminUser.save((err, saved)=> {
							if (err) throw err;
							else log('Admin account created!');
						});
					});
				});
			});
		}	
	});
}