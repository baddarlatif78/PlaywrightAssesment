
const { test, expect } = require('../fixtures/testFixtures');

test('Case 2 - Select specific items', async ({ page, jqueryUI }) => {
  await jqueryUI.openHomePage();
  await jqueryUI.openDemo('Selectable');

  const frame = jqueryUI.getDemoFrame();
  const items = frame.locator('#selectable li');

  await expect(items).toHaveCount(7);

  await items.nth(0).click();
  await items.nth(2).click({ modifiers: ['Control'] });
  await items.nth(6).click({ modifiers: ['Control'] });

  await expect(items.nth(0)).toHaveClass(/ui-selected/);
  await expect(items.nth(2)).toHaveClass(/ui-selected/);
  await expect(items.nth(6)).toHaveClass(/ui-selected/);

  await expect(frame.locator('#selectable li.ui-selected'))
    .toHaveCount(3);
});
