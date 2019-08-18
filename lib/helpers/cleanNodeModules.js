"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installNodeModules = exports.deleteNodeModules = void 0;

var _execa = _interopRequireDefault(require("execa"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteNodeModules = () => {
  const cwd = process.cwd();
  return _fsExtra.default.remove(_path.default.join(cwd, 'node_modules'));
};

exports.deleteNodeModules = deleteNodeModules;

const installNodeModules = hasYarn => {
  if (hasYarn) {
    return _execa.default.shell('yarn');
  }

  return _execa.default.shell('npm i');
};

exports.installNodeModules = installNodeModules;