const { defineConfig } = require("cypress");
const { Client } = require('pg')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_DATABASE,
            ssl: false,
            port: parseInt(process.env.DATABASE_PORT)
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows;
        }
      })
    },
    baseUrl: process.env.FRONTEND_URL,
    env : {
      BACKEND_URL : process.env.BACKEND_URL
    }
  },
});
