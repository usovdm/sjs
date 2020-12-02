const { Builder, By, Key, until } = require('selenium-webdriver')

describe('3rd suite', function () {
  let driver
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  afterEach(async function () {
    await driver.quit();
  })
  it('search name', async function () {
    await driver.get("https://www.google.ru/")
    await driver.manage().window().setRect(630, 691)
    await driver.findElement(By.name("q")).click()
    await driver.findElement(By.name("q")).sendKeys("name")
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER)
    expect(await driver.findElement(By.css(".QXzCSe")).getText())
      .toEqual('"name": варианты перевода')
  })
})
