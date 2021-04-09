const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
  index(req, res) {
    const jobs = Job.get()
    const profile = Profile.get()

    const updatedJobs = jobs.map((job) => {
      // Pega o JobUtils onde esta no Calculo
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? "done" : "progres"

      return {
        // ... espelhando o no caso job, ou seja tras tudo que tem dentro do job
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      }
    })
    // {jobs: updatedJobs} quer dizer que o novo valor do jobs é o atualizado
    return res.render("index", { jobs: updatedJobs });
  },

  create(req, res) {
    return res.render("job");
  },

  save(req, res) {
    const jobs = Job.get()  
    // ? se existir segue a logica senão/ ou segunda opção
    const lastId = jobs[jobs.length - 1]?.id || 0;

    Jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now(),
    });

    return res.redirect("/");
  },

  show(req, res) {
    // params.[tem que ser mesmo nome que esta :id do get routes]
    const jobId = req.params.id;
    // função que retorna  resultado de busca se o id for igual
    const job = Job.data.find((job) => Number(job.id) === Number(jobId));

    // Se Job não existir
    if (!job) {
      return res.send("Job not Found");
    }

    job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"]);

    return res.render("job-edit", { job });
  },

  update(req, res) {
    // params.[tem que ser mesmo nome que esta :id do get routes]
    const jobId = req.params.id;
    // função que retorna  resultado de busca se o id for igual
    const job = Job.data.find((job) => Number(job.id) === Number(jobId));

    // Se Job não existir
    if (!job) {
      return res.send("Job not Found");
    }

    const updatedJob = {
      ...job,
      // Trecho abaixo sobrescreve campos name, total.. com req.body
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    Job.data = Job.data.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    const jobId = req.params.id;

    Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId));

    return res.redirect("/");
  },
};
