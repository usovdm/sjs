import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { addAttach } from 'jest-html-reporters/helper';
import { Builder, By } from 'selenium-webdriver';
import { PNG } from 'pngjs';

// todo: set root path to prevent imports like '../utils'

const buildDriver = async (browser = 'chrome') => new Builder().forBrowser(browser).build();

// todo: separate to DriverWrapper class, utils functions
const ByTestId = (testId) => By.css(`[test-id="${testId}"`);

const elementEqualToScreenshot = async (element, imagePath) => {
  const screenshot = await element.takeScreenshot(true);

  const img1 = PNG.sync.read(fs.readFileSync(imagePath));
  const img2 = PNG.sync.read(Buffer.from(screenshot, 'base64'));

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  let diffPixels;

  const addAttachExpected = async () => { await addAttach(PNG.sync.write(img1), 'expected'); };
  const addAttachActual = async () => { await addAttach(PNG.sync.write(img2), 'actual'); };
  const addAttachDiff = async () => { await addAttach(PNG.sync.write(diff), 'difference'); };

  try {
    diffPixels = pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      width,
      height,
    );

    if (diffPixels === 0) {
      return true;
    }
  } catch (e) {
    await addAttachExpected();
    await addAttachActual();
    throw e;
  }

  await addAttachExpected();
  await addAttachActual();
  await addAttachDiff();

  return false;
};

export {
  buildDriver,
  ByTestId,
  elementEqualToScreenshot,
};
