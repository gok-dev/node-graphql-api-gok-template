require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, "app", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "app", "database", "seeds")
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, "app", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "app", "database", "seeds")
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, "app", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "app", "database", "seeds")
    }
  }
};
