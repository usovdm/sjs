import { By, until } from 'selenium-webdriver';
import BrowserSuite from '../core/BrowserSuite';
import { elementEqualToScreenshot } from '../core/utils';

describe('image comparison suite', new BrowserSuite(function () {
  const { getDriver } = this;

  it('check proper screenshot', async () => {
    const driver = getDriver();

    await driver.get('https://www.google.ru/');
    const nameQ = driver.findElement(By.name('q'));

    await nameQ.click();
    await nameQ.sendKeys('name');

    const suggestions = await driver.wait(until.elementLocated(By.css('.UUbT9')));
    await driver.wait(until.elementIsVisible(suggestions));

    expect(elementEqualToScreenshot(suggestions, 'src/tests/images1.jpg')).toBeTruthy();
  });

  it('check failed screenshot', async () => {
    const driver = getDriver();

    await driver.get('https://www.google.ru/');
    const nameQ = driver.findElement(By.name('q'));

    await nameQ.click();
    await nameQ.sendKeys('names');

    const suggestions = await driver.wait(until.elementLocated(By.css('.UUbT9')));
    await driver.wait(until.elementIsVisible(suggestions));

    expect(await elementEqualToScreenshot(suggestions, 'src/tests/images1.jpg')).toBeTruthy();
  });
}));
