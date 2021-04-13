const Database = require("./config")

const initDb = {
    // async fala para o JavaScript que dentro da estrutura vai ter awaits
    async init() {
        // Await significa que ele tem que esperar o comando terminar a execução
        // No banco de dados, para só depois seguir para proximo comando
 
        // Inicia a conexão com o banco de dados
        const db = await Database()

        // Passa comando sql como parametro, tem que ser passado dentro dessas crases => ``
        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
)`);

        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            createdAt DATETIME    
    )`)

        // Comando para executar DML -- Insert into...
        await db.run(`INSERT INTO profile(
            name,
            avatar, 
            monthly_budget, 
            days_per_week, 
            vacation_per_year, 
            value_hour)
        values(
            'Sergio', 
            'https://avatars.githubusercontent.com/u/29148210?v=4', 
            3000, 
            4, 
            6, 
            75)

`)

        // Inserte 1º Job default do dashboard
        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            createdAt
            ) values (
                "Pizzaria do Sergiao",
                2,
                1,
                1618276840786
    );`)

        // Inserte 2º Job default do dashboard
        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            createdAt
            ) values (
                "Site da Simone",
                3,
                47,
                1618276923415
    );
`)

        // Fecha conexão do banco
        await db.close()
    }
}

initDb.init()