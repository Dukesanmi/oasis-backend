const log = console.log;
const express = require('express');
const router = express.Router();
AuthController = require('../controllers/authController');
const {authenticateInApi, checkIfAdmin} = require('../middlewares/authentication.js');

//GET requests
router.get('/register', AuthController.agentReg);
router.get('/login', AuthController.agentLogin);
router.get('/logout', AuthController.logout);

//POST requests
router.post('/register/agent', AuthController.registerAgent);
router.post('/register/client', AuthController.registerClient);
router.post('/login/agent', AuthController.loginAgent);
router.post('/login/client', AuthController.loginClient);
router.post('/login/admin', AuthController.loginAdmin);


//for admin checking purposes
router.get('/users/admin', authenticateInApi, checkIfAdmin, AuthController.getAdminDetails);
router.get('/users/agents', authenticateInApi, checkIfAdmin, AuthController.adminGetAgents);
router.get('/users/agents/:id', authenticateInApi, checkIfAdmin, AuthController.adminGetAgentById);
router.get('/users/clients', authenticateInApi, checkIfAdmin, AuthController.adminGetClients);
router.get('/users/clients/:id', authenticateInApi, checkIfAdmin, AuthController.adminGetClientById);
router.delete('/users/agents/:id',authenticateInApi, checkIfAdmin, AuthController.adminRemoveAgent);
router.delete('/users/clients/:id',authenticateInApi, checkIfAdmin, AuthController.adminRemoveClient);

module.exports = router;
