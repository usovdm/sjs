/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/no-jasmine-globals */
import { jest } from '@jest/globals';

// eslint-disable-next-line no-undef
const jasmineGlobal = jasmine;

jest.setTimeout(30000);
jasmineGlobal.getEnv().addReporter({
  specStarted: (result) => {
    jasmineGlobal.currentTest = result;
  },
});

beforeEach(async () => {
  // console.log('start')
});
afterEach(async () => {
  // console.log('finish')
});
