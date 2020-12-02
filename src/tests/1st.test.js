const { Builder, By, Key, until } = require('selenium-webdriver')

class Test {
  constructor(fn) {
    this.fn = fn
  }

  tryFn = async () => {
    try {
      await this.fn()
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

describe('1st test', () => {
  let driver
  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })
  afterEach(async () => {
    await driver.quit();
  })
  test('search name', new Test(async () => {
    await driver.get("https://www.google.ru/")
    await driver.manage().window().setRect(630, 691)
    await driver.findElement(By.name("q")).click()
    await driver.findElement(By.name("q")).sendKeys("name")
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER)
    const text = await driver.findElement(By.css(".QXzCSe")).getText()

    expect(text).toMatch('"name"')
    expect(text).toMatch('варианты перевода')
  }).tryFn)
})