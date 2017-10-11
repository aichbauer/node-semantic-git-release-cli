#!/usr/bin/env node

import yargs from 'yargs';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';

yargs // eslint-disable-line
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv;

updateNotifier({ pkg }).notify();
