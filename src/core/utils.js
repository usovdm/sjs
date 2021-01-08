import { Builder, By } from 'selenium-webdriver';
// todo: set root path to prevent imports like '../utils'

const buildDriver = async (browser = 'chrome') => new Builder().forBrowser(browser).build();

// todo: separate to DriverWrapper class, utils functions
const ByTestId = (testId) => By.css(`[test-id="${testId}"`);

export {
  buildDriver,
  ByTestId,
};
