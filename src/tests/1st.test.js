const { By, Key, until } = require('selenium-webdriver')
const BaseTest = require('../core/BaseTest')
const { getDriver, afterEachCommon } = require('../core/utils')
const { addAttach } = require("jest-html-reporters/helper");

describe('1st test', new BaseTest(function () {
  let driver
  let num = this.num
  beforeEach(async () => {
    console.log(this.num)
    console.log('beforeEach test 1')
    // driver = await getDriver()
  })
  afterEach(async () => {
    console.log('afterEach test 1')
    // await afterEachCommon(driver);
  })
  it('search name', (async function () {
    try {
      const res = this
      console.log(res)
      return
      await driver.get("https://www.google.ru/")
      await driver.manage().window().setRect(630, 691)
      await driver.findElement(By.name("q")).click()
      await driver.findElement(By.name("q")).sendKeys("name")
      await driver.findElement(By.name("q")).sendKeys(Key.ENTER)
      const text = await driver.findElement(By.css(".QXzCSe")).getText()

      expect(text).toMatch('"name"')
      expect(text).toMatch('варианты2 перевода')
    } catch (e) {
      const screenshot = await driver.takeScreenshot()
      await addAttach(Buffer.from(screenshot, 'base64'));
      throw e
    }
  }))
  it('num 2', () => {
    console.log(this.num)
  })
  it('num 3', () => {
  })
  it('num 4', () => {
  })
}))
