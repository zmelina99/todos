//set up connection between database and server

const Pool = require('pg').Pool;

const { DB_DEPLOY, PORT, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const pool = new Pool(DB_DEPLOY);

module.exports = pool;
