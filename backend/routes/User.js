const router = require('express').Router();

const userController = require('../controllers/User');
const { decodeToken } = require('../utils/auth');

router.post('/api/register', userController.registerUser);
router.post('/api/login', userController.login);
router.get('/api/user', decodeToken, userController.getUserById);

module.exports = router;