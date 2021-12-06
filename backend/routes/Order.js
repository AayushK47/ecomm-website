const router = require('express').Router();

const orderController = require('../controllers/Order');
const { decodeToken } = require('../utils/auth');

router.post('/api/order/', decodeToken, orderController.createOrder);
router.get('/api/order/', decodeToken, orderController.getAllOrdersByUser);

module.exports = router;