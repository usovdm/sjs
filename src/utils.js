const { Builder, By } = require('selenium-webdriver')
// todo: set root path to prevent imports like '../utils'
// todo: install babel to use ES6 import

const getDriver = async (browser = 'chrome') => await new Builder().forBrowser(browser).build()

const afterEachCommon = async (driver) => {
    // todo: move to object DriverWrapper = { driver, afterEach }
    // await this.driver.quit()
    await driver.quit()
}

// todo: separate to DriverWrapper class, Test class, utils functions
const ByTestId = testId => By.css(`[test-id="${testId}"`)

module.exports = {
    getDriver,
    afterEachCommon,
    ByTestId
}
