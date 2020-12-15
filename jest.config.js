module.exports = {
  // verbose: false,
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    "default",
    "jest-html-reporters",
  ],
}