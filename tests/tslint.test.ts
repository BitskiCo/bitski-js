import { Linter, LintResult, Configuration } from "tslint";
import fs from 'fs';
import find from 'find';

function lintFile(fileName: string): LintResult {
  const configurationFilename = 'tslint.json';
  const options = {
      fix: false,
      formatter: 'stylish',
  };

  const fileContents = fs.readFileSync(fileName, 'utf8');
  const linter = new Linter(options);
  const configuration = Configuration.findConfiguration(configurationFilename, fileName).results;
  linter.lint(fileName, fileContents, configuration);
  const result = linter.getResult();
  if (result.errorCount > 0 || result.warningCount > 0) {
    console.log(result.output);
  }
  return result;
}

describe('files should pass tslint', () => {
  const files = find.fileSync(/\.ts$/, 'src');
  files.forEach(path => {
    test(path, () => {
      const result = lintFile(path);
      expect(result.errorCount).toBe(0);
    });
  });
});
