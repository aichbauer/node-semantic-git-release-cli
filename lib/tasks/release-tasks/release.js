"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _execa = _interopRequireDefault(require("execa"));

var _listr = _interopRequireDefault(require("listr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const releaseTasks = version => new _listr.default([{
  title: 'git add CHANGELOG.md and package.json',
  task: () => _execa.default.shell('git add .').catch(() => {
    throw new Error('Error: could not git add <files>');
  })
}, {
  title: 'git commit CHANGELOG.md and package.json',
  task: () => _execa.default.shell(`git commit -m "${version}"`).catch(() => {
    throw new Error('Error: could not git commit -m <message>');
  })
}, {
  title: `git tag -a v${version} -m ${version}`,
  task: () => _execa.default.shell(`git tag -a v${version} -m ${version}`).catch(() => {
    throw new Error(`Error: could not tag with v${version}... make sure this version is not tagged already`);
  })
}, {
  title: `release new version v${version}`,
  task: () => _execa.default.shell('git push --follow-tags').catch(() => {
    throw new Error('Error: could not push to remote repository... make sure you have access to it');
  })
}]);

var _default = releaseTasks;
exports.default = _default;