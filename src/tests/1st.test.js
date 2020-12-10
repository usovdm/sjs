const { By, Key, until } = require('selenium-webdriver')
const { getDriver, afterEachCommon } = require('../utils')

function BaseTest(fn) {
  // will be used for taking screenshots during the exceptions
  // todo: move to separate module
  const onTestStart = async () => { }

  const onTestFinish = async () => { }

  const onTestFail = async (e) => {
    console.log(e)
  }

  const baseTestRun = async () => {
    try {
      await onTestStart()
      await fn()
    } catch (e) {
      await onTestFail(e)
      throw e
    } finally {
      await onTestFinish()
    }
  }

  baseTestRun.origFn = fn

  return baseTestRun
}

describe('1st test', () => {
  let driver
  beforeEach(async () => {
    driver = await getDriver()
  })
  afterEach(async () => {
    await afterEachCommon(driver);
  })
  it('search name', new BaseTest(async () => {
    await driver.get("https://www.google.ru/")
    await driver.manage().window().setRect(630, 691)
    await driver.findElement(By.name("q")).click()
    await driver.findElement(By.name("q")).sendKeys("name")
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER)
    const text = await driver.findElement(By.css(".QXzCSe")).getText()

    expect(text).toMatch('"name"')
    expect(text).toMatch('варианты перевода')
  }))
})
