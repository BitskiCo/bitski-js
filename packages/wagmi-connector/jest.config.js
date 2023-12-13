// jshint esversion: 9
module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
  testRegex: '(/tests/.*.(test|spec)).(jsx?|tsx?)$',
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  coveragePathIgnorePatterns: [],
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['json', 'text', 'html', 'cobertura'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  name: 'bitski-provider',
  displayName: 'Bitski Provider',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/tests/util/setup-jest.ts'],
};
