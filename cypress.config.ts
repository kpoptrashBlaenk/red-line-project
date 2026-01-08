import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: 'tests/fixtures',
  defaultBrowser: 'electron',

  // because ionic
  includeShadowDom: true,

  // Pixel 7 viewports
  viewportHeight: 915,
  viewportWidth: 412,

  e2e: {
    baseUrl: 'http://localhost:8100',
    supportFile: 'tests/support/e2e.ts',
    specPattern: 'tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
})
