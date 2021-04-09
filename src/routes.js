const express = require("express");
const routes = express.Router()
const ProfileController = require("./controllers/ProfileController")
const Profile = require("./model/Profile")

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria do Sergiao",
            "daily-hours": 2,
            "total-hours": 1,
            createdAt: Date.now()
        },
        {
            id: 2,
            name: "Site da Simone",
            "daily-hours": 3,
            "total-hours": 47,
            createdAt: Date.now()

        }
    ],

    controllers: {
        index(req, res) {

            const updatedJobs = Job.data.map((job) => {
                // Ajustes no job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? "done" : "progress"


                return {
                    // ... espelhando o no caso job, ou seja tras tudo que tem dentro do job
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })
            // {jobs: updatedJobs} quer dizer que o novo valor do jobs é o atualizado
            return res.render("index", { jobs: updatedJobs })
        },

        create(req, res) {
            return res.render("job")
        },

        save(req, res) {

            // ? se existir segue a logica senão/ ou segunda opção
            const lastId = Job.data[Job.data.length - 1]?.id || 0

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createdAt: Date.now()
            })

            return res.redirect("/")
        },

        show(req, res) {
            // params.[tem que ser mesmo nome que esta :id do get routes]
            const jobId = req.params.id
            // função que retorna  resultado de busca se o id for igual
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            // Se Job não existir
            if (!job) {
                return res.send("Job not Found")
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render("job-edit", { job })
        },

        update(req, res) {
            // params.[tem que ser mesmo nome que esta :id do get routes]
            const jobId = req.params.id
            // função que retorna  resultado de busca se o id for igual
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            // Se Job não existir
            if (!job) {
                return res.send("Job not Found")
            }

            const updatedJob = {
                ...job,
                // Trecho abaixo sobrescreve campos name, total.. com req.body
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map( job => {
                if (Number( job.id ) === Number( jobId )) {
                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/'+ jobId)
        },

        delete(req, res) {
            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
            // Calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // arredondamento para cima^

            const createdDate = new Date(job.createdAt)
            // Dia de Vencimentos
            const dueDay = createdDate.getDate() + Number(remainingDays) // getDay = dia 
            // data de vencimento
            const dueDateInMs = createdDate.setDate(dueDay)

            // Diferenca de tempo em milessegundos
            const timeDiffInMs = dueDateInMs - Date.now()

            // Transformar milissegundos em dias
            // millsegundo | Minuto | Hora | Dia (24 horas)
            const daysInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / daysInMs)

            // Restam X dias
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]

    }
}


// request, response
//routes.get('/index', (req, res) => res.render(basePath + "/index"))

// Passo as referencias dos objetos pós refatoração
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

// devolve o  routes
module.exports = routes;