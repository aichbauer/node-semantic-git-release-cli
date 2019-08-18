"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _execa = _interopRequireDefault(require("execa"));

var _listr = _interopRequireDefault(require("listr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cleanup = () => new _listr.default([{
  title: 'run tests',
  task: () => _execa.default.shell('npm test').catch(() => {
    throw new Error('Error: npm test exits with a exit code 1... make sure all tests pass');
  })
}]);

var _default = cleanup;
exports.default = _default;