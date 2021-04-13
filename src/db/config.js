const sqlite3 = require('sqlite3')
const { open } = require("sqlite")

// connection string  de abertura do Banco de Dados
module.exports = () => open({filename: "./database.sqlite",driver: sqlite3.Database,})