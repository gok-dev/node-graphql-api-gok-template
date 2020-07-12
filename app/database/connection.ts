require('dotenv').config();
import * as knex from "knex";

const db = knex({
  client: "postgres",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  },
});

export default db;
