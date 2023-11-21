const { defineConfig } = require("cypress");
/**** cucumber */
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
/******/
const { Client } = require('pg')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      /** cucumber */
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      /*****/
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

      return config;
    },
    baseUrl: process.env.FRONTEND_URL,
    env : {
      BACKEND_URL : process.env.BACKEND_URL
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false,
    html: true,
    json: true,
  }
});