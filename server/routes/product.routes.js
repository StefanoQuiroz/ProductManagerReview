const express = require('express');
const router = express();
const {findProduct, findOneProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/product.controllers');

router.get(`/product`, findProduct);
router.get(`/product/:id`, findOneProduct);
router.post(`/product/create`, createProduct);
router.put(`/product/update/:id`, updateProduct);
router.delete(`/product/delete/:id`, deleteProduct);

module.exports = router;

