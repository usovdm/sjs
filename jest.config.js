module.exports = {
  // verbose: false,
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        includeFailureMsg: true
      }
    ],
  ],
}