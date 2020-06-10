// Importar a depenência SQLite3.
const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá fazer operações no banco de dados.
const db = new sqlite3.Database("./src/database/database.db")

// Exportar o objeto DB para a aplicação ter acesso e manipulá-lo.
module.exports = db

// Utilizar o objeto de banco de dados para as nossas operações.
// db.serialize(() => { // serialize() executa código no banco de dados.
//     // Com comandos SQL, eu vou:
    
//     // Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address1 TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // Inserir dados na tabela
//     const query = `
//             INSERT INTO places(
//                 image,
//                 name,
//                 address1,
//                 address2,
//                 state,
//                 city,
//                 items
//             ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     // Caso haja erro no cadastro de dados.
//     function afterInstertData(err) {
//         // Se houver erro, mostre o erro.
//         if(err) {
//             return console.log(err)
//         }
    
//         // Se não houver erro, mostrar os valores no console.
//         console.log("Cadastrado com sucesso!")
//         console.log(this)
//     }
    
//     // Usa as const's e a função recém declarada para arquivar os dados no banco.
//     db.run(query, values, afterInstertData)
        
//     // Consultar os dados da tabela
//     db.all(`SELECT * FROM places`, function(err, rows) {  // "*" significa todos. Podemos digitar um campo específico também.
//         // Se houver erro, mostre o erro
//         if(err) {
//             return console.log(err)
//         }
            
//         // Se não houver erro, mostrar os dados.
//         console.log("Aqui estão seus registros!")
//         console.log(rows)
//     })

//     // Deletar um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
//         // Se houver erro, mostre o erro.
//         if(err) {
//             return console.log(err)
//         }
    
//         // Se não houver erro, afirmar que foi.
//         console.log("Registro deletado com sucesso!")
//     })
// })
