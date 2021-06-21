const log = console.log;


exports.agentReg = function(req, res) {
	res.sendFile(process.cwd() + '/pages/signupAgent.html');
}
exports.agentLogin = function(req, res) {
	res.sendFile(process.cwd() + '/pages/signupAgent.html');
}

exports.userWelcome= function(req, res) {
	res.render('welcome');
}