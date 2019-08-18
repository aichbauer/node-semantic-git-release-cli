"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listr = _interopRequireDefault(require("listr"));

var _execa = _interopRequireDefault(require("execa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versionTasks = version => new _listr.default([{
  title: 'update package.json version',
  task: () => _execa.default.shell(`npm version ${version} --no-git-tag-version`).catch(() => {
    throw new Error(`Error: could not run npm version ${version}... make sure this --> ${version} <-- was not used before`);
  })
}]);

var _default = versionTasks;
exports.default = _default;