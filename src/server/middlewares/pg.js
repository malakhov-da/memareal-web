const { Pool } = require('pg');

const client = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres'
});

module.exports = {
    client
};
