const { Builder, By, Key, until } = require('selenium-webdriver')
const BaseTest = require('../core/BaseTest')

describe.skip('1st test in parallel 1', () => {
  let driver
  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })
  afterEach(async () => {
    await driver.quit();
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