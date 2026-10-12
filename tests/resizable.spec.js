
const { test, expect } = require('../fixtures/testFixtures');

test('Case 5 - Resizable box dimensions change', async ({ page, jqueryUI }) => {
  await jqueryUI.openHomePage();
  await jqueryUI.openDemo('Resizable');

  const frame = jqueryUI.getDemoFrame();
  const box = frame.locator('#resizable');
  const handle = frame.locator('#resizable .ui-resizable-se');

  const getSize = () => box.evaluate(element => {
    const rect = element.getBoundingClientRect();

    return {
      width: rect.width,
      height: rect.height
    };
  });

  const initialSize = await getSize();
  const handleBox = await handle.boundingBox();

  if (!handleBox) {
    throw new Error('Resize handle is not visible');
  }

  const startX = handleBox.x + handleBox.width / 2;
  const startY = handleBox.y + handleBox.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + 120, startY + 100, { steps: 20 });
  await page.mouse.up();

  await expect.poll(async () => {
    const finalSize = await getSize();

    return (
      finalSize.width !== initialSize.width ||
      finalSize.height !== initialSize.height
    );
  }).toBe(true);

  const finalSize = await getSize();

  console.log('Initial dimensions:', initialSize);
  console.log('Final dimensions:', finalSize);
});
