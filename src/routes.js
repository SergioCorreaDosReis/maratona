const express = require("express");
const routes = express.Router()
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")
// const Profile = require("./model/Profile")


// request, response
// Lista de Rotas Get e Posts
routes.get('/', JobController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

// exporta  o  routes
module.exports = routes;