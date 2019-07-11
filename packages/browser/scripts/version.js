#!/usr/bin/env node

// This script assumes it is being run against an already updated version.
// It takes the current version from package.json (which should have just been bumped)
// and replaces the necessary locations with it.

// Ideally this script should be called during the `version` npm script
// so that it can be called AFTER version bump, but BEFORE commit, keeping
// documentation and version numbers always in sync with their tag.

const fs = require('fs');

// Read package.json to get current version number
function parseVersion() {
  // __dirname will be in the scripts directory
  const path = __dirname + '/../package.json';

  // Read file into string
  const data = fs.readFileSync(path, 'utf-8');

  // Read as json
  const json = JSON.parse(data);

  // extract current version
  if (json && json.version) {
    return json.version;
  } else {
    throw new Error('Failed to extract version number');
  }
}

function replaceVersion(filePath, match, replacement) {
  const path = fs.realpathSync(filePath);
  process.stdout.write(`Updating ${path}...`);
  // read file
  let file;

  try {
    file = fs.readFileSync(path, 'utf-8');
  } catch (error) {
    process.stderr.write('\nError reading file.');
    console.error(error);
    process.exit(8);
  }

  // update line(s)
  const updated = file.replace(match, replacement);

  // save file
  try {
    fs.writeFileSync(path, updated, 'utf-8');
  } catch (error) {
    process.stderr.write('\nError writing file.');
    console.error(error);
    process.exit(8);
  }

  process.stdout.write(`...done\n`);
}

function updateReadme(version) {
  // packages/browser/scripts/ -> docs/README.md
  const readmePath = __dirname + '/../../../docs/README.md';
  const regex = /(https:\/\/cdn\.jsdelivr\.net\/npm\/bitski@).+(\/dist\/bitski\.min\.js)/;
  replaceVersion(readmePath, regex, `$1${version}$2`);
}

function updateCallbackHTML(version) {
  // packages/browser/scripts -> packages/browser/callback.html
  const callbackHTMLPath = __dirname + '/../callback.html';
  const regex = /(https:\/\/cdn\.jsdelivr\.net\/npm\/bitski@).+(\/dist\/callback\.js)/;
  replaceVersion(callbackHTMLPath, regex, `$1${version}$2`);
}

function updateConstants(version) {
  // packages/browser/scripts -> packages/browser/src/constants.ts
  const constantsPath = __dirname + '/../src/constants.ts';
  const regex = /(SDK_VERSION = ).+(;)/g;
  replaceVersion(constantsPath, regex, `$1'${version}'$2`);
}

// Make the changes:

const version = parseVersion();

process.stdout.write(`New version number ${version}\n`);

updateReadme(version);
updateCallbackHTML(version);
updateConstants(version);
