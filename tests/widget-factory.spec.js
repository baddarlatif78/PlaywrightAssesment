
const { test, expect } = require('../fixtures/testFixtures');

test('Case 7 - Widget Factory demo loads correctly', async ({ page, jqueryUI }) => {
  await jqueryUI.openHomePage();
  await jqueryUI.openDemo('Widget Factory');

  const frame = jqueryUI.getDemoFrame();

  // Verify that the demo iframe loads.
  await expect(frame.locator('body')).toBeVisible();

  // Capture details to identify the correct control.
  console.log('Main page URL:', page.url());

  console.log(
    'Demo frame URL:',
    await frame.locator('body').evaluate(() => window.location.href)
  );

  console.log('Frame text:', await frame.locator('body').innerText());

  console.log(
    'Buttons:',
    await frame.locator('button').allTextContents()
  );

  console.log(
    'Inputs:',
    await frame.locator('input').evaluateAll(elements =>
      elements.map(element => ({
        type: element.type,
        value: element.value,
        id: element.id,
        text: element.getAttribute('aria-label')
      }))
    )
  );
});
