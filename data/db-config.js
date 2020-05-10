const knex = require("knex");

const knexfile = require("../knexfile");

const environment = process.env.DB_ENV || "development";

module.exports = knex(knexfile[environment]);
