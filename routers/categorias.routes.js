const express = require('express');
const router = express.Router();
const { obtenerTodasCategorias, obtenerAplicacionesCategoria, 
    crearCategoria, obtenerAplicacionCategoria, guardarComentario,
    guardarAplicacion
} = require('../controllers/categorias.controller');

// Obtener todas las categorias
router.get('/categorias', obtenerTodasCategorias);

// Obtener todas las aplicaciones de una categoria
router.get('/categorias/:idCategoria/aplicaciones', obtenerAplicacionesCategoria);

// Obtener una aplicacion en especifico de una categoria
router.get('/categorias/:idCategoria/aplicaciones/:idAplicacion', obtenerAplicacionCategoria);

// Guardar un nuevo comentario en una aplicacion de una categoria en especifico
router.post('/categorias/:idCategoria/aplicaciones/:idAplicacion/comentarios', guardarComentario);

// Guardar una nueva aplicacion en una categoria en especifico
router.post('/categorias/:idCategoria/aplicaciones', guardarAplicacion);

// Crear una categoria
router.post('/categorias', crearCategoria);

module.exports = router;