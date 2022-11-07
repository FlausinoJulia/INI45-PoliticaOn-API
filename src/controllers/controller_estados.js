const { conectarAoBd, sql } = require('../bd/conexao')

// GET ALL // 
const getEstados = async (req, res) => {
    try 
    {
        const pool = await conectarAoBd()
        const result = await pool.request().query('SELECT * FROM [politicaOn].[Estado]')

        res.json(result.recordset)
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }

}

// GET //
const getEstado = async (req, res) => {
    try
    {
        const { id } = req.params

        const pool = await conectarAoBd()
        const result = await pool.request()
                                 .input("id", id)
                                 .query('SELECT * FROM politicaOn.Estado WHERE id=@id')
    
        if(result.recordset[0] == null)
            return res.json({msg: "Esse estado não está cadastrado"})

        return res.json(result.recordset[0])
    }
    catch (erro)
    {
        res.status(500)
        res.send(erro.message)
    }
}

module.exports = { 
    getEstados, 
    getEstado
}