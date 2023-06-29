const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "sto3ye",
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    baseUrl: "https://ecommerce-playground.lambdatest.io/"
  },
});
