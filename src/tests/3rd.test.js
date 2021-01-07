const { Builder, By, Key, until } = require('selenium-webdriver')
const BaseSuite = require('../core/BaseSuite')

describe.skip('3rd suite', new BaseSuite(function () {
  const { it, getDriver } = this

  it('search name', async () => {
    const driver = getDriver()

    await driver.get("https://www.google.ru/")
    await driver.manage().window().setRect(630, 691)
    await driver.findElement(By.name("q")).click()
    await driver.findElement(By.name("q")).sendKeys("name")
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER)
    expect(await driver.findElement(By.css(".QXzCSe")).getText())
      .toEqual('"name": варианты перевода')
  })
}))
