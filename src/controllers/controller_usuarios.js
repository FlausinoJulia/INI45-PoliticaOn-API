const { conectarAoBd, sql } = require('../bd/conexao')

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
    
        return res.json(result.recordset[0])
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }
}

// POST // 
const adicionarUsuario = async (req, res) => {

    const { nome, senha, idEstado, email } = req.body

    // fazer verificações
    if (nome == null|| senha == null || idEstado == null || email == null)
    {
        return res.status(400).json({msg: 'Certifique-se de preencher todos os dados'})
    }

    // talvez tenha a opção de não fornecer o estado, tem que tratar isso
    // if (idEstado == null)
    // {}

    try
    {
        const pool = await conectarAoBd()
        await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("senha", sql.VarChar, senha)
            .input("idEstado", sql.Int, idEstado)
            .input("email", sql.VarChar, email)
            .query('INSERT INTO politicaOn.Usuario (nome, senha, idEstado, email) VALUES (@nome, @senha, @idEstado, @email)')
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }
}

// PUT //
const atualizarUsuario = async (req, res) => {
    const { nome, senha, idEstado, email } = req.body

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

            if (nome == null)
                nome = usuario.recordset[0].nome
            if (senha == null)
                senha = usuario.recordset[0].senha
            if (idEstado == null)
                idEstado = usuario.recordset[0].idEstado
            if (email == null)
                email = usuario.recordset[0].email

            
        }
    }
    catch(erro){
        res.status(500)
        res.send(erro.message)
    }
}

module.exports = { 
    getUsuarios, 
    getUsuario,
    adicionarUsuario,
    atualizarUsuario
}