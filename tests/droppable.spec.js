
const { test, expect } = require('../fixtures/testFixtures');

test('Case 1 - Droppable works correctly', async ({ page, jqueryUI }) => {
  await jqueryUI.openHomePage();
  await jqueryUI.openDemo('Droppable');

  const frame = jqueryUI.getDemoFrame();
  const draggable = frame.locator('#draggable');
  const droppable = frame.locator('#droppable');

  await expect(draggable).toBeVisible();
  await expect(droppable).toContainText('Drop here');

  await draggable.dragTo(droppable);

  await expect(droppable).toHaveText('Dropped!');
});
