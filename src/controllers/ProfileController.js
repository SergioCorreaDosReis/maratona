const Profile = require("../model/Profile")

module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() })
    },

    update(req, res) {
        // re.body para pegar os dados
        const data = req.body
        // Definir quantas semanas tem em um ano = 52
        const weekPerYear = 52
        // Remover as semanas de férias do ano, para pegar quantas semanas tem em um mês
        const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12
        // Horas por semana eu estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        // Total de horas trabalhadas por mes
        const monthlyTotalHours = weekTotalHours * weekPerMonth

        // Valor da hora de trabalho
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        }) 
        
        return res.redirect("/profile")

    }
}