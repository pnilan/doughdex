const db = require('../db');

module.exports = {
  // findAll
  findAll: (table, count, offset) => {
    var queryString = `SELECT * FROM ${table} ORDER BY likes DESC LIMIT ${count} OFFSET ${offset}`;
    return db.query(queryString);
  },

  // incrementLikes
  incrementLikes: (pizzeriaId) => {
    var queryString = `UPDATE pizzerias SET likes = likes + 1 WHERE id = ${pizzeriaId} RETURNING likes`;
    return db.query(queryString);
  },

  // incrementDislikes
  incrementDislikes: (pizzeriaId) => {
    var queryString = `UPDATE pizzerias SET dislikes = dislikes + 1 WHERE id = ${pizzeriaId} RETURNING dislikes`;
    return db.query(queryString);
  }
};