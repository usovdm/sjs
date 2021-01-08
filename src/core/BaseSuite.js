import { addAttach } from 'jest-html-reporters/helper';
import { buildDriver } from './utils';

// eslint-disable-next-line no-undef
const jasmineGlobal = jasmine;

function BaseSuite(suiteFn) {
  beforeEach(async () => {
    this.driver = await buildDriver();
  });

  afterEach(async () => {
    if (jasmineGlobal.currentTest.failedExpectations.length > 0) {
      const screenshot = await this.driver.takeScreenshot();
      await addAttach(Buffer.from(screenshot, 'base64'));
    }
    await this.driver.quit();
  });

  this.getDriver = () => this.driver;

  return suiteFn.bind(this);
}

export default BaseSuite;
