const { conectarAoBd, sql } = require('../bd/conexao')
const bcrypt = require('bcrypt');
const { Int } = require('mssql');
const { json } = require('body-parser');

// GET ALL // 
const getUsuarios = async (req, res) => {

    try 
    {
        const pool = await conectarAoBd()
        const result = await pool.request().query('SELECT * FROM [politicaOn].[Usuario]')

        res.json(result.recordset)
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }

}

// GET //
const getUsuario = async (req, res) => {
    try
    {
        const { id } = req.params

        const pool = await conectarAoBd()
        const result = await pool.request()
                                 .input("id", id)
                                 .query('SELECT * FROM politicaOn.Usuario WHERE id=@id')
    
        if(result.recordset[0] == null)
            return res.json({msg: "Usuário não está cadastrado"})

        return res.json(result.recordset[0])
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }
}

function emailValido(email) {
    // pegamos a parte da string correspondente ao usuario (tudo antes do @)
    usuario = email.substring(0, email.indexOf("@")) 
    // pegamos a parte da string correspondente ao dominio (tudo depois do @)
    dominio = email.substring(email.indexOf("@") + 1, email.length);
    
    if ((usuario.length >=1) &&      // usuario tem pelo menos um caractere?
        (dominio.length >=3) &&      // dominio tem pelo menos 3 caracteres?
        (usuario.search("@")==-1) && // tem @?
        (dominio.search("@")==-1) && // tem @?
        (usuario.search(" ")==-1) && // verifica se tem espaço em branco
        (dominio.search(" ")==-1) && // verifica se tem espaço em branco
        (dominio.search(".")!=-1) && // verifica se tem pelo menos um ponto
        (dominio.indexOf(".") >=1)&& // vê se o ponto não está no começo
        (dominio.lastIndexOf(".") < dominio.length - 1)) // vê se o ponto não está final
        return true
    else
        return false
}

// POST // 
const adicionarUsuario = async (req, res) => {

    const { nome, senha, idEstado, email } = req.body

    if (nome == null || senha == null || idEstado == null || email == null ||
        nome == ""   || senha == ""   || idEstado <= 0    || email == "") 
    {
        return res.status(400).json({msg: 'Certifique-se de preencher todos os dados'})
    }

    if (!emailValido(email)) 
        return res.status(422).json({msg: 'Email inválido!'})

    try
    {
        const pool = await conectarAoBd()

        const selectResult = await pool.request()
                                 .input("email", email)
                                 .query('SELECT * FROM politicaOn.Usuario WHERE email=@email')  

        if (selectResult.recordset[0] != null)
        {
            return res.status(409)
                      .json({msg: "Este email já está cadastrado" })
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("senha", sql.VarChar, hashedPassword)
            .input("idEstado", sql.Int, idEstado)
            .input("email", sql.VarChar, email)
            .query('INSERT INTO politicaOn.Usuario (nome, senha, idEstado, email) VALUES (@nome, @senha, @idEstado, @email)')
        
        res.json({nome, senha, idEstado, email})    
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }
}

// LOGIN //
const login = async (req, res) => {
    try
    {
        const email = req.body.email

        const pool = await conectarAoBd()
        const resultado = await pool.request()
                                 .input("email", email)
                                 .query('SELECT * FROM politicaOn.Usuario WHERE email=@email')

        if (resultado.recordset[0] == null)
        {
            return res.status(404).send('Email incorreto!')
        }
        
        bcrypt.compare(req.body.senha,  resultado.recordset[0]["senha"], function(err, result) {
            if (result == true)
            {
                return res.status(200).json(resultado.recordset[0])
            }
                
            else 
                return res.status(401).send('Senha incorreta!');
        });
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }
}

// PUT //
const atualizarUsuario = async (req, res) => {
    let { nome, senha, idEstado, email } = req.body

    try {
        const { id } = req.params

        // se o usuario n forneceu nenhum dado para alteração
        if (nome == null && senha == null && idEstado == null && email == null)
        {
            return res.status(400)
                      .json({ msg: "Certifique-se de preencher os campos necessários para a alteração" })
        }        
        else 
        {
            const pool = await conectarAoBd()
            const usuario = await pool.request()
                                      .input("id", id)
                                      .query('SELECT * FROM politicaOn.Usuario WHERE id=@id')

            if (nome == null || nome == "")
                nome = usuario.recordset[0].nome
            if (senha == null || senha == "")
                senha = usuario.recordset[0].senha
            if (idEstado == null || idEstado <= 0)
                idEstado = usuario.recordset[0].idEstado
            if (email == null || email == "")
                email = usuario.recordset[0].email

            await pool
                .request()
                .input("nome", sql.VarChar, nome)
                .input("senha", sql.VarChar, senha)
                .input("idEstado", sql.Int, idEstado)
                .input("email", sql.VarChar, email)
                .input("id", id)
                .query('UPDATE politicaOn.Usuario SET nome=@nome, senha=@senha, idEstado=@idEstado, email=@email WHERE id=@id')
            
            res.json({nome, senha, idEstado, email})
        }
    }
    catch(erro){
        res.status(500)
        res.send(erro.message)
    }
}

// DELETE //
const excluirUsuario = async (req, res) => {
    try
    {
        const pool = await conectarAoBd()

        const resultado = await pool
            .request()
            .input("id", req.params.id)
            .query('DELETE FROM politicaOn.Usuario WHERE id=@id')

            if (resultado.rowsAffected[0] === 0) return res.sendStatus(404)
            
            return res.sendStatus(204)
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }
}

module.exports = { 
    getUsuarios, 
    getUsuario,
    adicionarUsuario,
    login,
    atualizarUsuario,
    excluirUsuario
}