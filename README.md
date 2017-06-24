# semantic-git-release-cli

[![Build Status](https://travis-ci.org/aichbauer/node-semantic-git-release-cli.svg?branch=master)](https://travis-ci.org/aichbauer/node-semantic-git-release-cli)
[![Build status](https://ci.appveyor.com/api/projects/status/7kedayu8diw41day?svg=true)](https://ci.appveyor.com/project/rudolfsonjunior/node-semantic-git-release-cli)
[![Coverage Status](https://coveralls.io/repos/github/aichbauer/node-semantic-git-release-cli/badge.svg?branch=master)](https://coveralls.io/github/aichbauer/node-semantic-git-release-cli?branch=master)

> A CLI for semantic releases. Writes a changelog and tags the new version.

<img src="https://raw.githubusercontent.com/aichbauer/node-semantic-git-release-cli/master/media/screenshot.gif">

## Why?

Many projects need versioning. It is always the same: testing, writing the changelog, updating the version, tagging the commit, and finally relaesing the new version.

`sgr` will take care of all of them, so you can focus on the more important stuff: **code**

## Installation

```sh
$ npm i -g semantic-git-release-cli
```

or

```sh
$ yarn add global semantic-git-release-cli
```

## Usage

Forget the times when you had to manually write changelogs, update versions, tag commits. Now just type:

```sh
$ sgr
```

or if you already have an alias for sgr, use following instead:

```sh
$ semantic-git-release
```

## Tasks

So There are few tasks `semantic-git-release-cli` will make for you.

- it removes the node_modules folder and reinstalls all of you dependencies
- it runs your tests for your project, using `npm test`
- it updates your version in your package.json
- it creates or updates your CHANGELOG.md
- it adds the CHANGELOG.md and package.json to git
- it commits the changes with the new version
- it tags the commit with the new version
- it pushes the changes to your remote repo with the new tag
