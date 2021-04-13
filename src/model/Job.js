const Database = require("../db/config")

module.exports = {
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return jobs.map(job => ({
            // não utilizamos o return dentro por que quando nao tem if ou outro comando posso utilizar o retorno dentro()
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            createdAt: job.createdAt
        }))
    },
    update(newJob) {
        data = newJob
    },
    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    },
    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name, 
            daily_hours, 
            total_hours, 
            createdAt
            ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.createdAt}
            )`)

        await db.close()
    }

}