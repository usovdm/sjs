import { By, Key } from 'selenium-webdriver';
import BrowserSuite from '../src/core/BrowserSuite';

// eslint-disable-next-line func-names
describe('1st test', new BrowserSuite(function () {
  const { getDriver } = this;

  it('search name 1', async () => {
    const driver = getDriver();

    await driver.get('https://www.google.ru/');
    await driver.manage().window().setRect(630, 691);
    await driver.findElement(By.name('q')).click();
    await driver.findElement(By.name('q')).sendKeys('name');
    await driver.findElement(By.name('q')).sendKeys(Key.ENTER);
    const text = await driver.findElement(By.css('.QXzCSe')).getText();

    expect(text).toMatch('"name"');
    expect(text).toMatch('варианты2 перевода');
  });

  it('search name 2', async () => {
    const driver = getDriver();

    await driver.get('https://www.google.ru/');
    await driver.manage().window().setRect(630, 691);
    await driver.findElement(By.name('q')).click();
    await driver.findElement(By.name('q')).sendKeys('name');
    await driver.findElement(By.name('q')).sendKeys(Key.ENTER);
    const text = await driver.findElement(By.css('.QXzCSe')).getText();

    expect(text).toMatch('"name"');
    expect(text).toMatch('варианты перевода');
  });

  it.skip('search name 3', async () => {
    const driver = getDriver();

    await driver.get('https://www.google.ru/');
    await driver.manage().window().setRect(630, 691);
    await driver.findElement(By.name('q')).click();
    await driver.findElement(By.name('q')).sendKeys('name');
    await driver.findElement(By.name('q')).sendKeys(Key.ENTER);
    const text = await driver.findElement(By.css('.QXzCSe')).getText();

    expect(text).toMatch('"name"');
    expect(text).toMatch('варианты2 перевода');
  });
}));
