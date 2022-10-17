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

roteador.get('/usuarios', getUsuarios)   // get usuarios
roteador.get('/usuarios/:id', getUsuario) // get usuario
roteador.post('/usuarios', adicionarUsuario) // adiciona um usuario
roteador.post('/usuarios/login', login) // login de um usuario
roteador.put('/usuarios/:id', atualizarUsuario) // substitui os dados do user
roteador.delete('/usuarios/:id', excluirUsuario) // deleta usuario

module.exports = roteador