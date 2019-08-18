"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.desc = exports.command = void 0;

var _releaseTasks = _interopRequireDefault(require("../tasks/release-tasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const command = '*';
exports.command = command;
const desc = 'Release a new version (run tests, write changelog, tag version, push release)';
/* istanbul ignore next */

exports.desc = desc;

const handler = argv => (0, _releaseTasks.default)(argv);

exports.handler = handler;