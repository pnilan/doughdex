require('dotenv').config();
const { findAll, incrementLikes, incrementDislikes } = require('../models');
const axios = require('axios');

module.exports = {

  getPizzerias: (req, res) => {

    var table = 'pizzerias';
    var count = req.query.count || 5;
    var offset = (req.query.page - 1 || 0) * count;

    var pizzeriasObject = {
      'table': table,
      'page': req.query.page || 0,
      'count': count
    };

    findAll('pizzerias', count, offset)
      .then((result) => {
        pizzeriasObject.results = result.rows;
        res.send(pizzeriasObject);
      })
      .catch((err) => {
        console.error('Error retrieving pizzerias:', err);
        res.status(500).end();
      });
  },

  getPizzeriaDetails: (req, res) => {

    var googleId = req.params.google_id;

    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${googleId}&key=${process.env.API_KEY}`)
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => {
        console.error('Error retrieving data from Google Places API:', err);
        res.status(500).send({ error: err });
      });
  },

  updatePizzeria: (req, res) => {
    var attribute = req.params.attribute;
    var pizzeriaId = req.params.pizzeria_id;

    if (attribute === 'like') {
      incrementLikes(pizzeriaId)
        .then((result) => {
          res.send(result.rows[0]);
        })
        .catch((err) => {
          console.error(`Error updating like count for pizzeria ${pizzeriaId}`);
          res.status(500).send({ 'Error': err });
        });
    } else if (attribute === 'dislike') {
      incrementDislikes(pizzeriaId)
        .then((result) => {
          res.send(result.rows[0]);
        })
        .catch((err) => {
          console.error(`Error updating dislike count for pizzeria ${pizzeriaId}`);
          res.status(500).send({ 'Error': err });
        });
    } else {
      res.status(404).end();
    }
  }

};