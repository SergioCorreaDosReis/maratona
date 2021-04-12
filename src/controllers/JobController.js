const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  save(req, res) {
    const jobs = Job.get()  
    // ? se existir segue a logica senão/ ou segunda opção
    const lastId = jobs[jobs.length - 1]?.id || 0;

    Job.create({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now(),
    })

    return res.redirect("/");
  },

  show(req, res) {
    const jobs = Job.get()  
    // params.[tem que ser mesmo nome que esta :id do get routes]
    const jobId = req.params.id;
    // função que retorna  resultado de busca se o id for igual
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    // Se Job não existir
    if (!job) {
      return res.send("Job not Found");
    }
    
    const profile = Profile.get()

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  update(req, res) {
    const jobs = Job.get()  
    // params.[tem que ser mesmo nome que esta :id do get routes]
    const jobId = req.params.id;
    // função que retorna  resultado de busca se o id for igual
    const job = jobs.find((job) => Number(job.id) === Number(jobId))

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

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob
      }

      return job
    })

    //Chama model Job e passa como para parametro do update o newJob
    Job.update(newJobs)

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    const jobId = req.params.id
    
    Job.delete(jobId)

    return res.redirect("/");
  }
}
