const { conectarAoBd, sql } = require('../bd/conexao')

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

const getUsuario = async (req, res) => {

    const { id } = req.params

    res.send(id)
}

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



module.exports = { 
    getUsuarios, 
    getUsuario,
    adicionarUsuario
}