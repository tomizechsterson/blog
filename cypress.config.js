const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    video: false,
    videoUploadOnPasses: false,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
