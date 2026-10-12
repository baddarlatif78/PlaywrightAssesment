
const { test: base, expect } = require('@playwright/test');
const { JQueryUIPage } = require('../pages/JQueryUIPage');

const test = base.extend({
  jqueryUI: async ({ page }, use) => {
    const jqueryUI = new JQueryUIPage(page);
    await use(jqueryUI);
  }
});

module.exports = { test, expect };
