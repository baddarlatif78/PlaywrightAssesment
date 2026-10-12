
const { test, expect } = require('../fixtures/testFixtures');

test('Case 3 - Controlgroup controls work correctly', async ({ page, jqueryUI }) => {
  await jqueryUI.openHomePage();
  await jqueryUI.openDemo('Controlgroup');

  const frame = jqueryUI.getDemoFrame();

  const automaticLabel = frame.locator('label[for="transmission-automatic"]');
  const standardLabel = frame.locator('label[for="transmission-standard"]');
  const insuranceLabel = frame.locator('label[for="insurance"]');

  const automatic = frame.locator('#transmission-automatic');
  const standard = frame.locator('#transmission-standard');
  const insurance = frame.locator('#insurance');
  const cars = frame.locator('#horizontal-spinner');

  await automaticLabel.click();
  await expect(automatic).toBeChecked();

  await insuranceLabel.click();
  await expect(insurance).toBeChecked();

  await cars.fill('2');
  await expect(cars).toHaveValue('2');

  await standardLabel.click();
  await expect(standard).toBeChecked();
  await expect(automatic).not.toBeChecked();

  await automaticLabel.click();
  await expect(automatic).toBeChecked();

  await expect(insurance).toBeChecked();
  await expect(cars).toHaveValue('2');
});
