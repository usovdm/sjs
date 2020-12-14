const { By, Key, until } = require('selenium-webdriver')
const BaseTest = require('../core/BaseTest')
const { getDriver, afterEachCommon } = require('../core/utils')

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
    expect(text).toMatch('варианты2 перевода')
  }))
})
