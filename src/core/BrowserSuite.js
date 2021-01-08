import { addAttach } from 'jest-html-reporters/helper';
import { buildDriver } from './utils';

// eslint-disable-next-line no-undef
const jasmineGlobal = jasmine;

class BrowserSuite {
  constructor(suiteFn) {
    this.getDriver = () => this.driver;

    beforeEach(async () => {
      this.driver = await buildDriver();
    });

    afterEach(async () => {
      if (this.isTestFailed()) {
        await this.addScreenshotToReport();
      }
      await this.getDriver().quit();
    });

    return suiteFn.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  isTestFailed() {
    return jasmineGlobal.currentTest.failedExpectations.length > 0;
  }

  async addScreenshotToReport() {
    const screenshot = await this.getDriver().takeScreenshot();
    await addAttach(Buffer.from(screenshot, 'base64'));
  }
}

export default BrowserSuite;
