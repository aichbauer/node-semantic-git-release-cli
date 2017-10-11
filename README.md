# semantic-git-release-cli

[![Build Status](https://travis-ci.org/aichbauer/node-semantic-git-release-cli.svg?branch=master)](https://travis-ci.org/aichbauer/node-semantic-git-release-cli)
[![Build status](https://ci.appveyor.com/api/projects/status/7kedayu8diw41day?svg=true)](https://ci.appveyor.com/project/rudolfsonjunior/node-semantic-git-release-cli)
[![Coverage Status](https://coveralls.io/repos/github/aichbauer/node-semantic-git-release-cli/badge.svg?branch=master)](https://coveralls.io/github/aichbauer/node-semantic-git-release-cli?branch=master)

> A CLI for semantic releases. Writes a changelog and tags the new version.

<img src="https://raw.githubusercontent.com/aichbauer/node-semantic-git-release-cli/master/media/screenshot.gif">

## Why?

Many projects need versioning. It is always the same: testing, writing the changelog, updating the version, tagging the commit, and finally releasing the new version.

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

## Commands

`semantic-git-release-cli` was build to be as simple as possible, so there are just a few commands you need to know.

* [sgr](#sgr)
* [sgr recover](#sgr-recover)
* [sgr version](#sgr-version)
* [sgr --help](#sgr---help)

### sgr

With `sgr` you can release a new version of your project.

#### Tasks

So there are a few tasks `semantic-git-release-cli` will do for you:

- removes and reinstalls `node_modules` (prefers `yarn` by default)
- runs tests by calling `npm test`
- updates the `version` in `package.json`
- creates or updates the `CHANGELOG.md`
- commits and tags the new `version`

```sh
# release a new version
$ sgr
```

### sgr recover

With `sgr recover [backup] [b]` you can recover your complete CHANGELOG.md if you just started to use `semantic-git-release-cli` but already released (and tagged) versions.

```sh
# generates the complete CHANGELOG.md
$ sgr recover
# generates the complete CHANGELOG.md and creates a backup of the current CHANGELOG.md in .sgr_backup
$ sgr recover backup
```

### sgr version 

With `sgr version` you can display the current version of `semantic-git-release-cli`.

```sh
# current version
$ sgr version
```

### sgr --help

With `sgr --help` you can display usage of `semantic-git-release-cli`.

```sh
# usage of cli
$ sgr --help
```
