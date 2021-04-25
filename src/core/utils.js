// eslint-disable-next-line no-unused-vars
import chromedriver from 'chromedriver';
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

  const getPngFromFile = async (path) => new Promise((resolve) => {
    fs.createReadStream(path).pipe(new PNG()).on('parsed', function () { return resolve(this); });
  });

  const getPngFromBuffer = async (buffer) => new Promise((resolve, reject) => {
    new PNG().parse(buffer, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });

  const resizeImage = (PNGImageResource, newWidth, newHeight) => {
    const newImg = new PNG({ newWidth, newHeight });
    PNGImageResource.bitblt(newImg, 0, 0, PNGImageResource.width, PNGImageResource.height, 0, 0);
    return newImg;
  };

  let img1 = await getPngFromFile(imagePath);
  let img2 = await getPngFromBuffer(Buffer.from(screenshot, 'base64'));

  const width = Math.max(img1.width, img2.width);
  const height = Math.max(img1.height, img2.height);

  if (img1.width < width || img1.height < height) {
    img1 = resizeImage(img1, width, height);
  }
  if (img2.width < width || img2.height < height) {
    img2 = resizeImage(img2, width, height);
  }

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
    // take screenshot if pixelmatch dropped with Exception
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
