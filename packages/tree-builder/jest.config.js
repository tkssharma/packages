// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const base = require("../../jest.config.js");

module.exports = {
  ...base,
  rootDir: "./build",
  name: "rating-configuration",
  displayName: "@cdc3/rating-configuration",
  collectCoverage: true,
  verbose: true,
};
