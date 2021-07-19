const express = require('express');
const router = express();
const {findProduct, findOneProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/product.controllers');
const { authenticate } = require('../config/jwt.config');

router.get(`/product`, authenticate, findProduct);
router.get(`/product/:id`, authenticate, findOneProduct);
router.post(`/product/create`, authenticate, createProduct);
router.put(`/product/update/:id`, authenticate, updateProduct);
router.delete(`/product/delete/:id`, authenticate, deleteProduct);

module.exports = router;

