"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listr = _interopRequireDefault(require("listr"));

var _generateCompleteChangelog = _interopRequireDefault(require("../../helpers/generateCompleteChangelog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recoverTasks = argv => new _listr.default([{
  title: "Recover the complete CHANGELOG.md",
  task: () => {
    (0, _generateCompleteChangelog.default)(argv.b);
  }
}]);

var _default = recoverTasks;
exports.default = _default;