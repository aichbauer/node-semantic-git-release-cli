"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listr = _interopRequireDefault(require("listr"));

var _updateChangelog = _interopRequireDefault(require("../../helpers/updateChangelog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const changelogTasks = (commits, version) => new _listr.default([{
  title: 'generate or update changelog',
  task: () => {
    const updated = (0, _updateChangelog.default)(commits, version);

    if (!updated) {
      throw new Error('could not write CHANGELOG.md... make sure you have write and read access to it');
    }
  }
}]);

var _default = changelogTasks;
exports.default = _default;