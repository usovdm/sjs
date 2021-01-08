export default {
  // verbose: false,
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    'default',
    'jest-html-reporters',
  ],
};
