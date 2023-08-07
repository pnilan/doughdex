const routes = require('express').Router();
const controllers = require('./controllers');

// GET pizzeria information
routes.get('/pizzerias', controllers.getPizzerias);

// GET detailed pizza information
routes.get('/pizzerias/places/:google_id', controllers.getPizzeriaDetails);

// PUT - update pizzeria attribute
routes.put('/pizzerias/:pizzeria_id/:attribute', controllers.updatePizzeria);

module.exports = routes;