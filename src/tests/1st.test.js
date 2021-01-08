/* eslint-disable jest/valid-describe */
import { By, Key, until } from 'selenium-webdriver';
import BaseSuite from '../core/BaseSuite';

describe('1st test', new BaseSuite(function () {
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

  it('search name 3', async () => {
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
