import { By, until } from 'selenium-webdriver';
import { addAttach } from 'jest-html-reporters/helper';
import { PNG } from 'pngjs';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import BrowserSuite from '../core/BrowserSuite';

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

    const screenshot = await suggestions.takeScreenshot(true);

    // compare screenshots by pixelmatch
    const img1 = PNG.sync.read(fs.readFileSync('src/tests/images1.jpg'));
    const img2 = PNG.sync.read(Buffer.from(screenshot, 'base64'));
    const diff = new PNG({ width: 484, height: 387 });
    const resultPixels = pixelmatch(img1.data, img2.data, diff.data, 484, 387);

    if (resultPixels !== 0) {
      await addAttach(PNG.sync.write(img1), 'expected');
      await addAttach(PNG.sync.write(img2), 'actual');
      await addAttach(PNG.sync.write(diff), 'diff');
    }

    expect(resultPixels).toBe(0);
  });

  it('check failed screenshot', async () => {
    const driver = getDriver();

    await driver.get('https://www.google.ru/');
    const nameQ = driver.findElement(By.name('q'));

    await nameQ.click();
    await nameQ.sendKeys('names');

    const suggestions = await driver.wait(until.elementLocated(By.css('.UUbT9')));
    await driver.wait(until.elementIsVisible(suggestions));

    const screenshot = await suggestions.takeScreenshot(true);

    // compare screenshots by pixelmatch
    const img1 = PNG.sync.read(fs.readFileSync('src/tests/images1.jpg'));
    const img2 = PNG.sync.read(Buffer.from(screenshot, 'base64'));
    const diff = new PNG({ width: 484, height: 387 });
    const resultPixels = pixelmatch(img1.data, img2.data, diff.data, 484, 387);

    if (resultPixels !== 0) {
      await addAttach(PNG.sync.write(img1));
      await addAttach(PNG.sync.write(img2));
      await addAttach(PNG.sync.write(diff));
    }

    expect(resultPixels).toBe(0);
  });
}));
