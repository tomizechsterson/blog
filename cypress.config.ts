import { defineConfig } from 'cypress'

module.exports = defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1000,
    viewportHeight: 700,
  },
})
