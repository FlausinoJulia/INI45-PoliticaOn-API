const config = require('./config') 
const express = require('express')
const app = express()

// configurando a porta que deverá ser escutada
app.set('port', config.port)

// usaremos o body parser para definir o formato das requisições/respostas
const bodyParser = require('body-parser') 
// a req/res pode ser dos seguintes formatos:
app.use(bodyParser.json());                        // json
app.use(bodyParser.urlencoded({extended: false})); // urlencoded

var rotasDeUsuarios = require('./src/rotas/rotas_usuarios')
app.use(rotasDeUsuarios)

module.exports = app