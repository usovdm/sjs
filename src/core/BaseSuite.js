const { it } = require('@jest/globals')
const { buildDriver } = require('../core/utils')
const { addAttach } = require("jest-html-reporters/helper");

function BaseSuite(suiteFn) {
  beforeEach(async () => {
    this.driver = await buildDriver()
  })

  afterEach(async () => {
    if (jasmine.currentTest.failedExpectations.length > 0) {
      await this._onTestFailed()
    }
    await this.driver.quit()
  })

  this._onTestFailed = async () => {
    const screenshot = await this.driver.takeScreenshot()
    await addAttach(Buffer.from(screenshot, 'base64'))
  }

  this.getDriver = () => this.driver

  return suiteFn.bind(this)
}

module.exports = BaseSuite
