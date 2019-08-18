#!/usr/bin/env node
"use strict";

var _yargs = _interopRequireDefault(require("yargs"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _options = _interopRequireDefault(require("./options"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_yargs.default // eslint-disable-line
.commandDir('cmds').options(_options.default).demandCommand().help().argv;
(0, _updateNotifier.default)({
  pkg: _package.default
}).notify();