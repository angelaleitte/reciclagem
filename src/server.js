const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta public onde estão os estilos, imagens e scripts
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { 
   express: server,
   noCache: true 
})

// confgurar caminhos da aplicação (ROTA)
// página inicial
// req: requisição
// res: resposta

server.get("/", (req, res) => {
   //sem instalar nunjuks 
   //res.render(__dirname + "/views/index.html") 
   
   //com nunjuks instalado: npm install nunjucks
   return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    //sem instalar nunjuks 
    //res.render(__dirname + "/views/create-point.html")   


    //com nunjuks instalado : npm install nunjucks
    return res.render("create-point.html")  
 })

 server.post("/savepoint", (req, res) => {
    console.log(req.body)

    //inserir dados no banco de dados
   const query =`
                    INSERT INTO placees(
                        image, name, address, address2, state, city, items
                    ) VALUES (
                        ?,?,?,?,?,?,?);
                `

    const values = [ 
        req.body.image, 
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso");
        console.log(this)

        return res.render("create-point.html", {saved: true})

        //return res.send("ok")
    }
    db.run(query, values, afterInsertData);

   
 })

 server.get("/search", (req, res) => {
    const search = req.query.search
    if(search ==""){
       //pesquisa vazia
       //com nunjuks instalado : npm install nunjucks
        //mostrar a página html com os dados dobanco de dados
        return res.render("search-results.html", {total: 0})  
       
    }

    //sem instalar nunjuks 
    //res.render(__dirname + "/views/create-point.html")   

   //pegar os dados do banco de dados
   //3 - consultar dados na tabela
   db.all(`SELECT * FROM placees WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        //console.log("Aqui estão seus registros:");
        //console.log(rows);
        const total = rows.length;

        //com nunjuks instalado : npm install nunjucks
        //mostrar a página html com os dados dobanco de dados
        return res.render("search-results.html", {places: rows, total: total})  
    })

 })





//ligar o servido
server.listen(3000);