// pegamos o module do express no module exports
const express = require('express')

const app   = express(); // o app vai receber todas as dependências do express
app.use(express.json()); // middleware - definindo que o express vai utilizar o json para se comunicar (res, req)
const porta = 3000;      // definindo a porta padrão como 3000

const usuarios = [];


// método post para adicionar um usuario
app.post("/usuarios", (requisicao, resposta) => {
    
    // desestruturamos o body, pois já sabemos quais parâmetros tem dentro dele
    const { nome, senha, email, estado } = requisicao.body; 
    // const body = requisicao.body; // pega o corpo da requisicao

    // inserimos no array de usuarios um objeto com os dados que pegamos da requisicao post
    usuarios.push(
        { nome, senha, email, estado }
    );
    
    console.log(body);

});

// definindo que o servidor vai escutar a porta 3000
app.listen(porta, () => console.log("Servidor está rodando na porta 3000"));