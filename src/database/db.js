//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose(); //habilita informações de logs no console

//criar o objeto que irá fazer operações no bancode dados
const db = new sqlite3.Database("./src/database/database.db");

//utilizar o objeto de banco de dados, para nossas operações
db.serialize(()=>{
    //com comandos SQL:
    //1 - criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS placees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //2 - inserir dados na tabela
   /* const query =`
                    INSERT INTO placees(
                        image, name, address, address2, state, city, items
                    ) VALUES (
                        ?,?,?,?,?,?,?);
                `

    const values = [ 
        "https://www.larplasticos.com.br/wp-content/uploads/2020/02/S%C3%ADmbolo-da-reciclagem-1024x576.jpg",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso");
        console.log(this)
    }
    db.run(query, values, afterInsertData);
    */

    //3 - consultar dados na tabela
    /*db.all(`SELECT * FROM placees`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros:");
        console.log(rows);
    })*/

    //4 - deletar um dado da tabela
    //db.run(`DELETE FROM placees WHERE id = ?`, [7], function(err){
    /*db.run(`DELETE FROM placees`, function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })*/

    //3 - consultar dados na tabela
    db.all(`SELECT * FROM placees`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros:");
        console.log(rows);
    })
    

});


module.exports = db




