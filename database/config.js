const log = console.log;
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_URI_LOCAL;

module.exports = function() {
	mongoose.connect(connectionString, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false
	}, (err)=> {
		if (err) throw err;
		log('Database connected!');
	});
}