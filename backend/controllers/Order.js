const Order = require('../models/Orders');
const Product = require('../models/Product');

async function createOrder(req, res) {
    const order = Order.create(req.body);
    res.status(201).json({
        message: "Order created successfully",
        order
    });
}

async function getAllOrdersByUser(req, res) {
    console.log(req.userId);
    const orders = await Order.findAll({
        where: {
            userId: req.userId
        },
        include: [Product]
    })
    console.log(JSON.stringify(orders, null, 4))
    res.status(201).json({
        message: "Order created successfully",
        data: orders
    });
}

module.exports = {
    createOrder,
    getAllOrdersByUser
}