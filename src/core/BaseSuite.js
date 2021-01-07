const { it } = require('@jest/globals')
const { buildDriver } = require('../core/utils')
const { addAttach } = require("jest-html-reporters/helper");

function BaseSuite(suiteFn) {
  beforeEach(async () => {
    this.driver = await buildDriver()
  })

  afterEach(async () => {
    await this.driver.quit()
  })

  this._onTestFailed = async (e) => {
    const screenshot = await this.driver.takeScreenshot()
    await addAttach(Buffer.from(screenshot, 'base64'));
    throw e
  }

  this.getDriver = () => this.driver

  // replaces `it` with extended version with access to the suite object
  this.it = async (testName, testFn) => {
    // не поддерживает skip, only и так далее. Нужно избавляться от такого подхода
    debugger
    await it(testName, async () => {
      try {
        await testFn.call(this)
      } catch (e) {
        await this._onTestFailed(e)
        throw e
      }
    })
  }

  return suiteFn.bind(this)
}

module.exports = BaseSuite

/*
- проверить it.skip
*/