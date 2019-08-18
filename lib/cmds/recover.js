"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.aliases = exports.command = void 0;

var _recoverTasks = _interopRequireDefault(require("../tasks/recover-tasks"));

var _version = require("../cmds/version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const command = 'recover';
exports.command = command;
const aliases = ['r'];
exports.aliases = aliases;
const desc = 'Recover the complete CHANGELOG.md';
/* istanbul ignore next */

exports.desc = desc;

const handler = argv => {
  if (argv.v) {
    return (0, _version.handler)();
  }

  return (0, _recoverTasks.default)(argv).run();
};

exports.handler = handler;