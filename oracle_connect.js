// **************************************************************
// *  @Autor -> Carlos Rodrigues                                *
// *  Para utilizar 'oracledb', instale o client da oracle      *
// *                                                            *
// **************************************************************

const oracledb = require('oracledb')
// api de conexão com banco, oracle - node

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "senha_banco";

async function run(){
  let connection; // Var de conexão com banco

  try { // Tenta fazer a conexão com banco
    connection = await oracledb.getConnection(
      {
        user              : "carlos", // Usuario do banco
        password          : mypw, // Senha do user
        connectionString  : "192.168.56.3/xe" // Local e schema do banco
      }
    )

    // Se tudo der certo - Print para validar a conexão
    console.log("Conexão com banco realizada com sucesso\n")

    // Criando uma var para receber a consulta
    const consulta = await connection.execute(
      `SELECT cod_aluno, nome, cidade, cep
       FROM taluno`
       // WHERE cod_aluno = :cod_aluno`,
       // [2] // Passando valor para a consulta
    )
    console.log(consulta.rows)

  } catch (err) { // Caso não consiga, catch vai tratar a falha
    console.error(err)
  } finally { // Finalização
    if (connection){
      try{
        await connection.close()
      } catch (err){
        console.log(err);
      }
    } // If para fechar a conexao com banco
  }// Finally
}

run()
