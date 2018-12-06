# Contributing to Bitski

We welcome bug reports, feedback, and pull requests to our SDK. Here are a few notes to help those interested in contributing.

## Reporting Issues

Please use our issue template to give us the details we'll need to debug. You can find the template under .github/ISSUE_TEMPLATE/Bug_report.md.

## Development

This project uses lerna to manage multiple NPM packages in a single repo. In order to get started developing, clone this repo, then run `npm install` to install lerna and various dev dependencies.

When you run `npm install`, we have configured the project to also run `lerna bootstrap` which installs the dependencies of each package and creates links for shared dependencies.

## Building

To do a build, from the root project run `npm run build`. This will run a build on each package using lerna.

## Testing

To run the tests, run `npm test` from the root project. This will also generate a coverage report under the coverage folder.

## Pull Requests

Please base your changes off and submit PRs against the develop branch. Develop is our pre-release branch, while master is our released branch. Our CI will automatically run tests for each package.

## Releases

In order to keep things in sync we use lerna to release new versions to NPM. Here is the process we use:

1. Checkout develop branch
2. Pull from develop
3. `lerna publish` (select version) bumps version in packages, tags, tarballs, publishes, pushes tags and commit develop
4. Checkout new branch (release/version-number)
5. Checkout master
6. `git merge --no-ff release/version-number`
7. `git push`
8. Add release under Releases with new tag
