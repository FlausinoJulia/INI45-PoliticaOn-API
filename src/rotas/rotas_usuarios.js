// rotas cadastro de usuarios //
const express = require('express')
const roteador = express.Router();

const { 
    getUsuarios, 
    adicionarUsuario, 
    login,
    getUsuario,
    atualizarUsuario,
    excluirUsuario
} = require('../controllers/controller_usuarios')

const { 
    getEstados,
    getEstado
} = require('../controllers/controller_estados')

// rotas usuarios
roteador.get('/usuarios', getUsuarios)   // get usuarios
roteador.get('/usuarios/:id', getUsuario) // get usuario
roteador.post('/usuarios', adicionarUsuario) // adiciona um usuario
roteador.post('/usuarios/login', login) // login de um usuario
roteador.put('/usuarios/:id', atualizarUsuario) // substitui os dados do user
roteador.delete('/usuarios/:id', excluirUsuario) // deleta usuario

// rotas estados
roteador.get('/estados', getEstados)   // get estados
roteador.get('/estados/:id', getEstado) // get estado


module.exports = roteador