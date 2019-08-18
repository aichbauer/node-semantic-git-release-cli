"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.body = exports.header = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _gitCommitInfo = _interopRequireDefault(require("git-commit-info"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const header = (version, date = '') => {
  if (date === '') {
    return `${version} - ${(0, _moment.default)().format('MMMM, DD YYYY')}`;
  }

  return `${version} - ${(0, _moment.default)(date, 'ddd MMM D HH:mm:ss YYYY Z').format('MMMM, DD YYYY')}`;
};

exports.header = header;

const oneCommit = commitInfo => `* ${commitInfo.shortHash} ${commitInfo.message.split('\n')[0]} (${commitInfo.author})`;

const body = (commits, version) => {
  const cwd = process.cwd();
  let changelogData = '';
  commits.forEach((commit, i) => {
    const commitInfo = (0, _gitCommitInfo.default)({
      commit,
      cwd
    });
    /* istanbul ignore next */

    if (!commitInfo.shortHash || !commitInfo.author || !commitInfo.message || commitInfo.message.split('\n')[0] === version) {
      return;
    }

    changelogData = `${changelogData}${oneCommit(commitInfo)}\n`;

    if (commits.length - 1 === i) {
      changelogData = `${changelogData}\n`;
    }
  });
  return changelogData;
};

exports.body = body;