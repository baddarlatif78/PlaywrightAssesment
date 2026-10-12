
const { test, expect } = require('../fixtures/testFixtures');

test('Case 4 - Datepicker selects the current date', async ({ page, jqueryUI }) => {
  await jqueryUI.openHomePage();
  await jqueryUI.openDemo('Datepicker');

  const frame = jqueryUI.getDemoFrame();
  const dateInput = frame.locator('#datepicker');

  const today = await page.evaluate(() => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  });

  await dateInput.click();

  await frame.locator('td.ui-datepicker-today a').click();

  await expect(dateInput).toHaveValue(today);
});
