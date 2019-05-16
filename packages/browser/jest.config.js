// jshint esversion: 9
const base = require("../../jest.config.base.js");

module.exports = {
    ...base,
    name: "bitski",
    displayName: "Bitski SDK",
    setupFiles: [
      "<rootDir>/tests/util/setup-jest.ts"
    ],
};
