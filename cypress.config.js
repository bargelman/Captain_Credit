const { defineConfig } = require("cypress");

module.exports = defineConfig({
  taskTimeout: 60000,
  defaultCommandTimeout: 25000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  responseTimeout: 60000,
  chromeWebSecurity: false,
  e2e: {
    testIsolation: false,
    hideXHRInCommandLog: true,
    baseUrl: "https://amazon.com",
    setupNodeEvents(on, config) {},
  },
});
