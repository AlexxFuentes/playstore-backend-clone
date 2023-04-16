const Categoria = require('../models/categorias');
const mongoose = require('mongoose');

// Obtener todas las categorias
// db.categorias.find({}, {_id: true, nombreCategoria: true})
const obtenerTodasCategorias = (req, res) => {
    Categoria.find({}, {_id: true, nombreCategoria: true})
    .then((data)=>{
        res.json(data);
    }).catch((error)=>{
        res.json(error);
    });
}

// Obtener las aplicaciones de una categoria
//db.categorias.find({_id: ObjectId('64174023e69fdd32e4aec7b4')}, {aplicaciones: true})
const obtenerAplicacionesCategoria = (req, res) => {
    const idCategoria = req.params.idCategoria;
    Categoria.find({_id: mongoose.Types.ObjectId(idCategoria)}, {aplicaciones: true})
    .then((data)=>{
        res.json(data);
    }).catch((error)=>{
        res.json(error);
    });
}

// Obtener una aplicacion en especifico de una categoria
// db.categorias.find({_id: ObjectId('64174023e69fdd32e4aec7b4'), "aplicaciones._id": ObjectId('64174023e69fdd32e4aec6ec')}, {"aplicaciones.$": true})
const obtenerAplicacionCategoria = (req, res) => {
    const { idCategoria, idAplicacion } = req.params;

    Categoria.find(
        {
            _id: mongoose.Types.ObjectId(idCategoria), 
            "aplicaciones._id": mongoose.Types.ObjectId(idAplicacion)
        }, 
        {"aplicaciones.$": true})
    .then((data)=>{
        res.json(data);
    }).catch((error)=>{
        res.json(error);
    });
}

// Guardar un nuevo comentario en una aplicacion de una categoria en especifico
// db.categorias.updateOne({_id: ObjectId('64174023e69fdd32e4aec7b4'), "aplicaciones._id": ObjectId('64174023e69fdd32e4aec6ec')}, {$push: {"aplicaciones.$.comentarios": {nombreUsuario: 'Usuario 1', comentario: 'Comentario 1'}}})
const guardarComentario = (req, res) => {
    const { idCategoria, idAplicacion } = req.params;
    const { comentario, calificacion, usuario } = req.body;

    Categoria.updateOne(
        {
            _id: mongoose.Types.ObjectId(idCategoria),
            "aplicaciones._id": mongoose.Types.ObjectId(idAplicacion)
        },
        {
            $push: {
                "aplicaciones.$.comentarios": {
                    comentario: comentario,
                    calificacion: calificacion,
                    usuario: usuario,
                    fecha: new Date()
                }
            }
        }
    ).then((data)=>{
        res.json(data);
    }).catch((error)=>{
        res.json(error);
    });
}

// Guardar una nueva aplicacion en una categoria en especifico
// db.categorias.updateOne({_id: ObjectId('64174023e69fdd32e4aec7b4')}, {$push: {aplicaciones: {nombreAplicacion: 'Aplicacion 1', descripcion: 'Descripcion 1', comentarios: []}}})
const guardarAplicacion = (req, res) => {
    const { idCategoria } = req.params;
    const { nombre, descripcion, precio, desarrollador, icono } = req.body;

    Categoria.updateOne(
        {
            _id: mongoose.Types.ObjectId(idCategoria)
        },
        {
            $push: {
                aplicaciones: {
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    desarrollador: desarrollador,
                    icono: icono,
                    app: "app/demo.apk",
                    instalada: false,
                    calificacion: 0,
                    descargas: 0,
                    imagenes: ["img/app-screenshots/1.webp", "img/app-screenshots/2.webp", "img/app-screenshots/3.webp"],
                    comentarios: []
                }
            }
        }
    ).then((data)=>{
        res.json(data);
    }).catch((error)=>{
        res.json(error);
    });
}

// Crear una categoria
// db.categorias.insertOne({nombreCategoria: 'Categoria 1'})
const crearCategoria = (req, res) => {
    const { nombreCategoria, descripcion } = req.body;

    if (!nombreCategoria || !descripcion) {
        res.status(400).json({ mensaje: 'El nombre de la categoría y la descripción son obligatorios' });
        return;
    }

    Categoria.findOne({ nombreCategoria: nombreCategoria })
    .then((categoriaExistente)=>{
        if (categoriaExistente) {
            res.status(400).json({ mensaje: 'Ya existe una categoría con ese nombre' });
            return;
        }
        Categoria.create({
            nombreCategoria: nombreCategoria,
            descripcion: descripcion,
            aplicaciones: []
        }).then((data)=>{
            res.json(data);
        }).catch((error)=>{
            res.json(error);
        });
    }).catch((error)=>{
        res.json(error);
    });
}

// Exportar las funciones
module.exports = {
    obtenerTodasCategorias,
    obtenerAplicacionesCategoria,
    obtenerAplicacionCategoria,
    guardarComentario,
    guardarAplicacion,
    crearCategoria
};
