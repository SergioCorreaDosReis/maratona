module.exports = {
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
        const dayDiff = ceil(timeDiffInMs / daysInMs)
        // const dayDiff = Math.floor(timeDiffInMs / daysInMs)

        // Restam X dias
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]

}