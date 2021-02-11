import { By, Key, until } from 'selenium-webdriver';
import BrowserSuite from '../src/core/BrowserSuite';
import { elementEqualToScreenshot } from '../src/core/utils';

describe('image comparison suite', new BrowserSuite(function () {
  const { getDriver } = this;

  it('check proper screenshot', async () => {
    const driver = getDriver();

    await driver.get('https://www.github.com/');
    const logo = driver.findElement(By.css('.header-search'));

    expect(await elementEqualToScreenshot(logo, 'tests/logo.jpg')).toBeTruthy();
  });

  it('check failed screenshot', async () => {
    const driver = getDriver();

    await driver.get('https://www.yandex.ru/');
    const nameQ = driver.findElement(By.name('text'));

    await nameQ.click();
    await nameQ.sendKeys('namemc');
    await nameQ.sendKeys(Key.ENTER);

    const suggestions = await driver.wait(until.elementLocated(By.css('.serp-header__search2')));
    await driver.wait(until.elementIsVisible(suggestions));

    expect(await elementEqualToScreenshot(suggestions, 'tests/image.jpg')).toBeTruthy();
  });

  it.skip('check wrong images sizes', async () => {
    const driver = getDriver();

    await driver.get('https://www.google.ru/');
    const nameQ = driver.findElement(By.name('q'));

    await nameQ.click();
    await nameQ.sendKeys('names');

    expect(await elementEqualToScreenshot(nameQ, 'tests/images1.jpg')).toBeTruthy();
  });
}));
