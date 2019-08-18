"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listr = _interopRequireDefault(require("listr"));

var _hasYarn = _interopRequireDefault(require("has-yarn"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _cleanNodeModules = require("../../helpers/cleanNodeModules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cleanup = () => {
  const cwd = process.cwd();
  return new _listr.default([{
    title: 'check package.json',
    task: () => _fsExtra.default.pathExists(_path.default.join(cwd, 'package.json')).then(exists => {
      if (!exists) {
        throw new Error('Error: no package.json found... make sure you are in the correct directory');
      }
    })
  }, {
    title: 'delete node_modules',
    task: () => (0, _cleanNodeModules.deleteNodeModules)()
  }, {
    title: 'install dependencies',
    task: () => (0, _cleanNodeModules.installNodeModules)(_hasYarn.default)
  }]);
};

var _default = cleanup;
exports.default = _default;