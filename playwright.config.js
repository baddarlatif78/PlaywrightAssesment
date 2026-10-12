
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Keep test execution predictable while building the framework.
  fullyParallel: false,
  workers: 1,
  retries: 0,

  // Show test results in the terminal and generate an HTML report.
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  use: {
  baseURL: 'https://jqueryui.com',
  headless: !!process.env.CI,
  screenshot: 'only-on-failure',
  trace: 'retain-on-failure',
  video: 'retain-on-failure'
},

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
