require('dotenv').config();
const path = require('path');
const { Client } = require('pg');
const fs = require('node:fs/promises');

const db = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

var pizzaData = {};

fs.readFile(process.env.DATA_PATH)
  .then((data) => {
    pizzaData = JSON.parse(data);
  })
  .catch((err) => {
    console.error('Error reading and parsing pizza data:', err);
  })
  .then(() => {
    return db.connect();
  })
  .then(() => {
    console.log('Setting up database');
    return db.query('DROP TABLE IF EXISTS pizzerias');
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS users');
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS saved_pizzerias');
  })
  .then(() => {
    return db.query(`CREATE TABLE pizzerias (
      id SERIAL PRIMARY KEY,
      google_maps_places_id VARCHAR,
      name VARCHAR NOT NULL,
      address VARCHAR,
      operational BOOLEAN NOT NULL DEFAULT TRUE,
      location JSON NOT NULL,
      likes INTEGER NOT NULL DEFAULT 0,
      dislikes INTEGER NOT NULL DEFAULT 0,
      date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);
  })
  .then(() => {
    return Promise.all(Object.keys(pizzaData).map((id) => {
      var queryArgs = [id, pizzaData[id].name, pizzaData[id].formatted_address, JSON.stringify(pizzaData[id].geometry.location)];
      return db.query('INSERT INTO pizzerias (google_maps_places_id, name, address, location) VALUES ($1, $2, $3, $4)', queryArgs);
    }));
  })
  .then(() => {
    console.log('Successfully seeded pizzeria table');
  })
  .catch((err) => {
    console.error('Error seeding pizzeria table:', err);
  })
  .finally(() => {
    db.end();
  });




