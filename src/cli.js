#!/usr/bin/env node

import yargs from 'yargs';
import updateNotifier from 'update-notifier';

import options from './options';

import pkg from '../package.json';

yargs // eslint-disable-line
  .commandDir('cmds')
  .options(options)
  .demandCommand()
  .help()
  .argv;

updateNotifier({ pkg }).notify();
