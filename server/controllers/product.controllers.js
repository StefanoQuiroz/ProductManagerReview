const Product = require('../models/product.models');

const findProduct = (req, res) => {
    Product.find({})
        .then(results => res.json({datos:results}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(404);
        })
}
const findOneProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(result => res.json({datos:result}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(404);
        })
}
const createProduct = (req, res) => {
    Product.create(req.body)
        .then(result => res.json({datos:result}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(500);
        })
}
const updateProduct = (req, res) => {
    Product.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(result => res.json({datos:result}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(500);
        })
}
const deleteProduct = (req, res) => {
    Product.deleteOne({_id:req.params.id})
        .then(result => res.json({datos:result}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(404);
        })
}

module.exports = {findProduct, findOneProduct, createProduct, updateProduct, deleteProduct};