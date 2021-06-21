const log = console.log;
const express = require('express');
const router = express.Router();
siteController = require('../controllers/siteController');
const {authenticateInBrowser, checkCurrentUser} = require('../middlewares/authentication.js');

//router.get('/', siteController.index);
router.get('*', checkCurrentUser); //Divine related to the function i told you to check in the middleware file
router.get('/welcome', authenticateInBrowser, siteController.userWelcome);


module.exports = router;