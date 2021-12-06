const Product = require('../models/Product');

async function createProduct(req, res) {
    try {
        console.log(req.file);
        req.body.image = `http://${process.env.HOST}:${3001}/images/${req.file.filename}`

        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            data: product
        });
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: "Some error occurred. Please try again after some time."
        });
    }
}

async function getAllProduct(req, res) {
    try {
        const product = await Product.findAll();
        res.status(200).json({
            message: "Products found",
            data: product
        });
    } catch(e) {
        res.status(500).json({
            message: "Some error occurred. Please try again after some time."
        });
    }
}

async function getProductById(req, res) {
    try {
        const product = await Product.findByPk(req.params.id);
        res.status(200).json({
            message: `Product with id ${req.params.id} found`,
            data: product
        });
    } catch(e) {
        res.status(500).json({
            message: "Some error occurred. Please try again after some time."
        });
    }
}

async function updateProductById(req, res) {
    try {
        const product = await Product.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: `Product with id ${req.params.id} found`,
            data: product
        });
    } catch(e) {
        res.status(500).json({
            message: "Some error occurred. Please try again after some time."
        });
    }
}

async function deleteProductById(req, res) {
    try {
        const product = await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: `Product with id ${req.params.id} found`,
            data: product
        });
    } catch(e) {
        res.status(500).json({
            message: "Some error occurred. Please try again after some time."
        });
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById
}