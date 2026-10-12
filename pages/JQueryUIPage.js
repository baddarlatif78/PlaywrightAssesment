
class JQueryUIPage {
  constructor(page) {
    this.page = page;
  }

  async openHomePage() {
    await this.page.goto('/');
  }

  async openDemo(demoName) {
    await this.page
      .getByRole('link', { name: demoName, exact: true })
      .first()
      .click();
  }

  getDemoFrame() {
    return this.page.frameLocator('.demo-frame');
  }
}

module.exports = { JQueryUIPage };
