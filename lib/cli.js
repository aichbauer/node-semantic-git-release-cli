#!/usr/bin/env node

import inquirer from 'inquirer';
import updateNotifier from 'update-notifier';
import yargs from 'yargs';

import generateVersions from './helpers/generateVersions';
import getLatestVersion from './helpers/getLatestVersion';
import getCommits from './helpers/getCommits';
import getRemote from './helpers/getRemote';
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
  const commits = getCommits();
  const remote = getRemote();
  const latestVersion = getLatestVersion();
  const newVersions = generateVersions(latestVersion);
  const questionsList = questions(newVersions);

  if (commits[0] === 'not a repo') {
    return console.warn('Error: this is not a git repository... make sure you are in the right directory');
  } else if (commits[0] === 'no commits yet') {
    return console.warn('Error: your branch does not have any commits yet... try to git add <files> and/or git commit -m "<message>"');
  } else if (latestVersion === 'versions differ') {
    return console.warn('Error: your versions from the package.json and the latest tag do not match...');
  } else if (latestVersion === 'no package.json') {
    return console.warn('Error: it seems you do not have a package.json');
  } else if (remote === '') {
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
