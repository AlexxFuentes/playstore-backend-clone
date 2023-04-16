const mongoose = require('mongoose');

const esquemaCategoria = new mongoose.Schema({
    nombreCategoria: String,
    descripcion: String,
    aplicaciones: Array,
});

module.exports = mongoose.model('categorias', esquemaCategoria);
