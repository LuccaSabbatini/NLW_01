const express = require("express") // Alocando express em uma variável
const server = express() // Alocando o objeto do servidor em uma variável
const nunjucks = require("nunjucks") // Alocando Template Engine a uma variável
const db = require("./database/db") // Importando o banco de dados exportado pelo arquivo db.js em uma variável no servidor.

// Configurar pasta public.
server.use(express.static("public"))

// Habilitar o uso do req.body.
server.use(express.urlencoded({ extended: true }))

// Utilizando Template Engine - HTML Dinâmico.
nunjucks.configure("src/views", { // Qual pasta estão os htmls.
    express: server, // Variável do servidor express.
    noCache: true // Não armazenará versões antigas dos HTML's na memória Cache.
})

// Configurar caminhos/rotas da minha aplicação.
// Página inicial
server.get("/", (req, res) => { // req: Requisição (Pergunta) e res: Resultado (Resposta).
    return res.render("index.html")
})

// Página create-point
server.get("/create-point", (req, res) => { // req: Requisição (Pergunta) e res: Resultado (Resposta).
    // Pegar as respostas do formulário no verbo HTTP GET (inseguro).
    // console.log(req.query) // req.query: Retorna um objeto com as query strings da url.
    
    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {
    // Pegar respostas do formulário no verbo HTTP POST (seguro).
    console.log(req.body) // req.body: O corpo do nosso formulário.
    
    // Inserir formulário no banco de dados.
    // Variável contendo campos da tabela.
    const query = `
            INSERT INTO places(
                image,
                name,
                address1,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
    `
    
    // Variável contendo valores dos campos.
    const values = [
            req.body.image,
            req.body.name,
            req.body.address1,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
    ]

    // Caso haja erro no cadastro de dados.
    function afterInstertData(err) {
        // Se houver erro, mostre o erro.
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
    
        // Se não houver erro, mostrar os valores no console.
        console.log("Cadastrado com sucesso!")
        console.log(this)

        // Retorna para a página create-point com a propriedade saved: true (acionará o modal).
        return res.render("create-point.html", { saved: true })
    }
    
    // Usa as const's e a função recém declarada para arquivar os dados no banco.
    db.run(query, values, afterInstertData)
})

// Página search-results
server.get("/search", (req, res) => { // req: Requisição (Pergunta) e res: Resultado (Resposta)
    const search = req.query.search

    // Pesquisa vazia.
    if(search == "") {
        // Retorna para a página de resultados com 0 resultados.
        return res.render("search-results.html", { total: 0 })
    }
    
    // Pegar os dados no banco na cidade de pesquisa.
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {  // "*" significa todos. Podemos digitar um campo específico também.
        // Se houver erro, mostre o erro                                                   "LIKE" '${search}' significa que tudo que vem antes ou depois do resultado é considerado. Não leva ao pé da letra.
        if(err) {
            return console.log(err)
        }
        
        // Total de registros
        const total = rows.length

        // Se não houver erro, enviar os dados para a página html dinâmica.
        return res.render("search-results.html", { places: rows, total: total })
    })
})

// Ligar o servidor
server.listen(3000)