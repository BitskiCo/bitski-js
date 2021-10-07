// jshint esversion: 9
const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  name: 'bitski',
  displayName: 'Bitski SDK',
  testEnvironment: 'jsdom',
  automock: false,
  resetMocks: false,
  setupFiles: ['<rootDir>/tests/util/setup-jest.ts'],
};
