// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "yaziyorum",
      user: "react",
      password: "admin",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
