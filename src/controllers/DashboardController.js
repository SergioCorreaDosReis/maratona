const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        // await serve para informar que ele tem esperar todo comando ser executado para ele seguir com a sequencia do código
        const profile = await Profile.get()

        // indicadores de qtd por status do painel do indice
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // total de horas/dia por job em prodresso
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            // Pega o JobUtils onde esta no Calculo
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? "done" : "progress"

            // Soma um ao count do status
            // Acessa a variavel statusCount e passa como conteudo a chave do objeto statusCount que pode ser progress, done, total
            statusCount[status] += 1

            // total de horas/dia por job em prodresso
            jobTotalHours = status == "progress" ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours

            // if (status == "progress"){
            //     jobTotalHours += Number(job["daily-hours"])
            // }

            return {
                // ... espelhando o no caso job, ou seja tras tudo que tem dentro do job
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]),
            }
        })

        // qtd de horas almejo trabalhar em dias, informação esta no profile 
        // MENOS 
        // qtd de horas de cada job/dia em "progress"
        const freeHours = profile["hours-per-day"] - jobTotalHours

        // {jobs: updatedJobs} quer dizer que o novo valor do jobs é o atualizado
        // mesma logicva para profile:profile
        return res.render("index", {
            jobs: updatedJobs,
            profile: profile,
            statusCount: statusCount,
            freeHours: freeHours
        });
    }
}