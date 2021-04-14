const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now()
    })

    return res.redirect("/");
  },

  async show(req, res) {
    const jobs = await Job.get()
    // params.[tem que ser mesmo nome que esta :id do get routes]
    const jobId = req.params.id;
    // função que retorna  resultado de busca se o id for igual
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    // Se Job não existir
    if (!job) {
      return res.send("Job not Found");
    }

    const profile = await Profile.get()

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    // params.[tem que ser mesmo nome que esta :id do get routes]
    const jobId = req.params.id;

    const updatedJob = {
      // Trecho abaixo sobrescreve campos name, total.. com req.body
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    //Chama model Job e passa como para parametro do update o newJob
    await Job.update(updatedJob, jobId)

    res.redirect("/job/" + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id

    await Job.delete(jobId)

    return res.redirect("/");
  }
}
