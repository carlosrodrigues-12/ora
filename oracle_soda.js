// ****************************************************************
// *  @Autor -> Carlos Rodrigues                                  *
// *  Para utilizar 'oracledb', instale o client da oracle        *
// *                                                              *
// *  Para utilizar SODA no banco oracle, dê permissão ao usuário *
// *                                                              *
// *  ex: GRANT SODA_APP TO carlos;                               *
// ****************************************************************

const oracledb = require('oracledb')
// api de conexão com banco, oracle - node

const mypw = "senha_banco";
oracledb.autoCommit = true;

async function run() {

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

    const soda = connection.getSodaDatabase();
    const collectionName = 'nodb_soda_collection';
    const myCollection = await soda.createCollection(collectionName);

    const myContent = { name: "Sally", address: {city: "Melbourne"} };
    await myCollection.insertOne(myContent);

    const filterSpec = { "address.city": "Melbourne" };
    const myDocuments = await myCollection.find().filter(filterSpec).getDocuments();
    myDocuments.forEach(function(element){
      const content = element.getContent();
      console.log(content.name + ' lives in Melbourne.');
    })

  } catch (err) { // Caso não consiga, catch vai tratar a falha
    console.error("Error in processing:\n", err)
  } finally { // Finalização
    if (connection){
      try{
        await connection.close()
      } catch (err){
        console.log("Error in closing connection:\n", err);
      }
    } // If para fechar a conexao com banco
  }// Finally
}

run()
