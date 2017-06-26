#!/usr/bin/env node

import inquirer from 'inquirer';
import isAdded from 'is-git-added';
import isGit from 'is-git-repository';
import getGitRemotes from 'get-git-remotes';
import getCommitRange from 'git-commit-range';
import taggedCommit from 'tagged-git-commit';
import updateNotifier from 'update-notifier';
import yargs from 'yargs';

import generateVersions from './helpers/generateVersions';
import getLatestVersion from './helpers/getLatestVersion';
import pkg from '../package.json';
import questions from './questions';
import tasks from './tasks';

const argv = yargs
  .usage('Usage: $0')
  .alias('v', 'version')
  .describe('v', 'Version number')
  .help('h')
  .alias('h', 'help')
  .argv;

updateNotifier({ pkg }).notify();

const cli = () => {
  const cwd = process.cwd();
  const latestTaggedCommit = taggedCommit({ path: cwd });
  const commits = getCommitRange({ path: cwd, from: latestTaggedCommit });
  const latestVersion = getLatestVersion();
  const newVersions = generateVersions(latestVersion);
  const questionsList = questions(newVersions);

  if (!isGit(cwd)) {
    return console.warn('Error: this is not a git repository... make sure you are in the right directory');
  } else if (!isAdded(cwd) && commits.length === 0) {
    return console.warn('Error: no changes... try to git add <files>');
  } else if (commits.length === 0) {
    return console.warn('Error:  no commits yet... try to git commit -m <message>');
  } else if (!getGitRemotes(cwd)) {
    return console.warn('Error: it seems you do not have a remote repository set... try to git remote add origin <remote-url>');
  }

  return inquirer
    .prompt(questionsList)
    .then((answers) => {
      if (answers.ownVersion) {
        return tasks(commits, answers.ownVersion)
          .run()
          .catch(() => console.warn('Error: whoops, try to solve the problem mentioned above...'));
      }

      return tasks(commits, answers.version)
        .run()
        .catch(() => console.warn('Error: whoops, try to solve the problem mentioned above...'));
    })
    .catch((err) => console.warn(err));
};

if (argv.v) {
  console.info(`v${pkg.version}`);
} else {
  cli();
}
