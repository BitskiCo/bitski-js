module.exports = {
  module: "commonjs",
  target: "ES5",
  includes: './',
  exclude: [
    "**/tests/**/*",
    "**/dist/**/*",
    "**/lib/**/*",
    "**/node_modules/**/*.*",
    "**/src/utils/callback.*"
  ],
  experimentalDecorators: true,
  excludeExternals: true,
  out: "./docs/api/",
  readme: "none",
  theme: "markdown",
  name: "Bitski.js",
  mode: "modules",
  includeDeclarations: false,
  mdSourceRepo: "https://github.com/BitskiCo/bitski-js",
  mdSourceBranch: "master",
  mdSourceBasePath: "packages",
  "external-modulemap": ".*\/packages\/([\\w\\-_]+)\/",
};
