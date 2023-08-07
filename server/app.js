require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());

app.use(morgan(':method :url :status - :response-time ms :remote-addr'));

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.use('/api', routes);

app.all('*', (req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log(`Listening on port ${PORT}`);