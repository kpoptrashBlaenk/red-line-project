import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: 'tests/fixtures',
  defaultBrowser: 'electron',

  // because ionic
  includeShadowDom: true,

  // Pixel 7 viewports
  viewportHeight: 915,

  viewportWidth: 412,

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    indexHtmlFile: 'tests/support/component-index.html',
    supportFile: 'tests/support/component.ts',
    specPattern: 'tests/component/specs/**/*.cy.{js,jsx,ts,tsx}',
  },
  e2e: {
    supportFile: 'tests/support/e2e.ts',
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
  },
})
