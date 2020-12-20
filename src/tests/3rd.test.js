const { Builder, By, Key, until } = require('selenium-webdriver')
const BaseTest = require('../core/BaseTest')

describe('3rd suite', function () {
  let driver
  beforeEach(async function () {
    console.log('beforeEach test 3')
    // driver = await new Builder().forBrowser('chrome').build()
  })
  afterEach(async function () {
    console.log('afterEach test 3')
    // await driver.quit();
  })
  it('search name', async () => {
    console.log('test 3')
    return
    await driver.get("https://www.google.ru/")
    await driver.manage().window().setRect(630, 691)
    await driver.findElement(By.name("q")).click()
    await driver.findElement(By.name("q")).sendKeys("name")
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER)
    expect(await driver.findElement(By.css(".QXzCSe")).getText())
      .toEqual('"name": варианты перевода')
  })
})
