/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/no-jasmine-globals */
import { jest } from '@jest/globals';

jest.setTimeout(30000);
jasmine.getEnv().addReporter({
  specStarted: (result) => { jasmine.currentTest = result; },
});

beforeEach(async () => {
  // console.log('start')
});
afterEach(async () => {
  // console.log('finish')
});
