"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.aliases = exports.command = void 0;

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const command = 'version';
exports.command = command;
const aliases = ['v'];
exports.aliases = aliases;
const desc = 'Show the current version number';
/* istanbul ignore next */

exports.desc = desc;

const handler = () => console.info(`sgr version ${_package.default.version}`);

exports.handler = handler;