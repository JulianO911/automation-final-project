const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: false,
    screenshotOnRunFailure: false,
    reporter: "mochawesome",
    reporterOptions: {
      charts: true,
      html: true,
      json: true,
      reportDir: "cypress/reports",
      reportFilename: "report",
      overwrite: true
    },
    setupNodeEvents(on, config) {
      
    },
    baseUrl: "https://ecommerce-playground.lambdatest.io/"
  },
});
