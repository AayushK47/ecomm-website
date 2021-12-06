const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const productController = require('../controllers/Product');

router.post('/api/product', upload.single('image'), productController.createProduct);
router.get('/api/product', productController.getAllProduct);
router.get('/api/product/:id', productController.getProductById);
router.put('/api/product/:id', productController.updateProductById);
router.delete('/api/product/:id', productController.deleteProductById);

module.exports = router;