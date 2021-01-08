import { addAttach } from 'jest-html-reporters/helper';
import { buildDriver } from './utils';

function BaseSuite(suiteFn) {
  beforeEach(async () => {
    this.driver = await buildDriver();
  });

  afterEach(async () => {
    if (jasmine.currentTest.failedExpectations.length > 0) {
      await this._onTestFailed();
    }
    await this.driver.quit();
  });

  this._onTestFailed = async () => {
    const screenshot = await this.driver.takeScreenshot();
    await addAttach(Buffer.from(screenshot, 'base64'));
  };

  this.getDriver = () => this.driver;

  return suiteFn.bind(this);
}

export default BaseSuite;
