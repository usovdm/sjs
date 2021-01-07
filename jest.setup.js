jest.setTimeout(30000)
jasmine.getEnv().addReporter({
  specStarted: result => jasmine.currentTest = result
});

beforeEach(async () => {
  // console.log('start')
})
afterEach(async () => {
  // console.log('finish')
})