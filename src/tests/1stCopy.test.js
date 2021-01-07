const { By, Key, until } = require('selenium-webdriver')
const BaseSuite = require('../core/BaseSuite')

describe.skip('1st test in parallel 1', new BaseSuite(function () {
  const { getDriver } = this

  it('search name', (async () => {
    const driver = getDriver()

    await driver.get("https://www.google.ru/")
    await driver.manage().window().setRect(630, 691)
    await driver.findElement(By.name("q")).click()
    await driver.findElement(By.name("q")).sendKeys("name")
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER)
    const text = await driver.findElement(By.css(".QXzCSe")).getText()

    expect(text).toMatch('"name"')
    expect(text).toMatch('варианты перевода')
  }))
}))