// rotas cadastro de usuarios //
const express = require('express')
const roteador = express.Router();

const { 
    getUsuarios, 
    adicionarUsuario, 
    getUsuario 
} = require('../controllers/controller_usuarios')

roteador.get('/usuarios', getUsuarios)   // get usuarios
roteador.get('/usuarios:id', getUsuario) // get usuario

roteador.post('/usuarios', adicionarUsuario) // adiciona um usuario

// roteador.delete('/usuarios:id', excluirUsuario) // deleta usuario

// roteador.put('/usuarios:id', atualizarUsuario) // substitui todos os dados

module.exports = roteador