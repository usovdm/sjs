import { By, Key } from 'selenium-webdriver';
import BrowserSuite from '../src/core/BrowserSuite';

// eslint-disable-next-line func-names
describe('simple test', new BrowserSuite(function () {
  const { getDriver } = this;

  it('translate name', async () => {
    const driver = getDriver();

    await driver.get('https://www.yandex.ru/');
    await driver.manage().window().setRect(630, 691);
    await driver.findElement(By.name('text')).click();
    await driver.findElement(By.name('text')).sendKeys('name');
    await driver.findElement(By.name('text')).sendKeys(Key.ENTER);
    const text = await driver.findElement(By.css('.Translate-InputWrapper')).getText();

    expect(text).toMatch('name');
    expect(text).toMatch('[neɪm]');
  });

  it('translate name (failed)', async () => {
    const driver = getDriver();

    await driver.get('https://www.yandex.ru/');
    await driver.manage().window().setRect(630, 691);
    await driver.findElement(By.name('text')).click();
    await driver.findElement(By.name('text')).sendKeys('name');
    await driver.findElement(By.name('text')).sendKeys(Key.ENTER);
    const text = await driver.findElement(By.css('.Translate-InputWrapper')).getText();

    expect(text).toMatch('name2');
  });
}));
