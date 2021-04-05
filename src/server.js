const express = require("express")
const server = express()
const routes = require("./routes.js")

// usando template engine(motor)
server.set('view engine', "ejs")

// middleware entre chamada do get e do 
// serve para habilitar arquivos estaticos ou seja que nao alteram com frequencia
server.use(express.static("public"))

// .use
// Serve para setar configurações para o servidor

// Liberar o req.body, ou seja libera consulta o corpo da requisicao
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

// liga meu servidor e define a porta, hostname
server.listen(3000, () => console.log("Servidor no Ar"))

