const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required : [true, "Se require ingresar el titulo"]
    },
    precio: {
        type: String,
        required: [true, "Se requiere ingresar el precio del articulo"]
    },
    descripcion : {
        type: String,
        required: [true, "Se require ingresar la descripción"]
    },
    fecha: Date
}, {timestamps:true});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;