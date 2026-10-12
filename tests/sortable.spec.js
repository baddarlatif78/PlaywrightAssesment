
const { test, expect } = require('../fixtures/testFixtures');

test('Case 6 - Sort Item 7 to the top', async ({ page, jqueryUI }) => {
  await jqueryUI.openHomePage();
  await jqueryUI.openDemo('Sortable');

  const frame = jqueryUI.getDemoFrame();
  const items = frame.locator('#sortable li');

  const expectedInitialOrder = [
    'Item 1', 'Item 2', 'Item 3', 'Item 4',
    'Item 5', 'Item 6', 'Item 7'
  ];

  await expect(items).toHaveText(expectedInitialOrder);

  const source = frame.locator('#sortable li').filter({
    hasText: /^Item 7$/
  });

  const target = frame.locator('#sortable li').first();

  const sourceBox = await source.boundingBox();
  const targetBox = await target.boundingBox();

  if (!sourceBox || !targetBox) {
    throw new Error('Could not locate the sortable items');
  }

  await page.mouse.move(
    sourceBox.x + sourceBox.width / 2,
    sourceBox.y + sourceBox.height / 2
  );

  await page.mouse.down();

  await page.mouse.move(
    sourceBox.x + sourceBox.width / 2 + 8,
    sourceBox.y + sourceBox.height / 2 + 8,
    { steps: 3 }
  );

  await page.mouse.move(
    targetBox.x + targetBox.width / 2,
    targetBox.y + 2,
    { steps: 15 }
  );

  await page.mouse.up();

  await expect(items.first()).toHaveText('Item 7');

  console.log('Final order:', await items.allTextContents());
});
