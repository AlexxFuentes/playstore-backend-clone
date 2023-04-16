const express = require('express');
const cors = require('cors'); //Para gestionar politicas de dominios cruzados
const bodyParser = require('body-parser');
const database = require('./modules/database');
const categoriasRutes = require('./routers/categorias.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use(categoriasRutes);

app.listen(8888, ()=>{
    console.log('Servidor del backend levantado en 8888');
});