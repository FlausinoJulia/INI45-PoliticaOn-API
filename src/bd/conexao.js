const bdconfig = require('./bdconfig')
const sql = require('mssql')

async function conectarAoBd ()
{
   try {
      const pool = await sql.connect(bdconfig)
      return pool
   }
   catch (erro) {
      // ver como tratar o erro depois
      console.error(erro);
   }
}

module.exports = {conectarAoBd, sql} 