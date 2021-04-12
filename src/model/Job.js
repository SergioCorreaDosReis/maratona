
let data = [
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
]

module.exports = {
    get() {
        return data
    },
    update(newJob) {
        data = newJob
    },
    delete(id) {
        data = data.filter((job) => Number(job.id) !== Number(id))
    },
    create(newJob){
        data.push(newJob)
    }

}