"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _gitCommitInfo = _interopRequireDefault(require("git-commit-info"));

var _gitCommitRange = _interopRequireDefault(require("git-commit-range"));

var _moment = _interopRequireDefault(require("moment"));

var _path = _interopRequireDefault(require("path"));

var _prependFile = _interopRequireDefault(require("prepend-file"));

var _taggedGitCommits = _interopRequireDefault(require("tagged-git-commits"));

var _changelogParts = require("./changelogParts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const writeBackup = () => {
  const cwd = process.cwd();

  _fsExtra.default.renameSync(_path.default.join(cwd, 'CHANGELOG.md'), _path.default.join(cwd, '.sgr_backup', `CHANGELOG.${(0, _moment.default)().unix()}.bak.md`));
};

const backupChangelog = () => {
  const cwd = process.cwd();

  if (_fsExtra.default.existsSync(_path.default.join(cwd, '.sgr_backup'))) {
    return writeBackup();
  }

  _fsExtra.default.mkdirSync(_path.default.join(cwd, '.sgr_backup'));

  return writeBackup();
};

const getAllTags = () => {
  const cwd = process.cwd();
  const tags = (0, _taggedGitCommits.default)({
    path: cwd,
    lookBehind: Number.POSITIVE_INFINITY
  });
  return tags;
};

const writeToFile = (tags, exists, backup) => {
  const cwd = process.cwd();
  let changelogData = '';
  let commits = [];
  let tagDate = '';

  if (exists && backup) {
    backupChangelog();
  } else if (exists) {
    _fsExtra.default.truncateSync(_path.default.join(cwd, 'CHANGELOG.md'), 0);
  }

  tags.forEach((tag, idx) => {
    if (idx === 0) {
      commits = (0, _gitCommitRange.default)({
        path: cwd
      });
      commits = (0, _gitCommitRange.default)({
        path: cwd,
        from: commits[commits.length - 1],
        to: tag.hash
      });
    } else {
      commits = (0, _gitCommitRange.default)({
        path: cwd,
        from: tags[idx - 1].hash,
        to: tag.hash
      });
    }

    tagDate = (0, _gitCommitInfo.default)({
      cwd,
      commit: tag.hash
    }).date;
    const version = tag.version.slice(1, tag.version.length);
    changelogData = `${(0, _changelogParts.header)(version, tagDate)}\n\n${(0, _changelogParts.body)(commits, version)}`;

    _prependFile.default.sync(_path.default.join(cwd, 'CHANGELOG.md'), changelogData);
  });
};

const generateCompleteChangelog = backup => {
  const cwd = process.cwd();

  try {
    const exists = _fsExtra.default.existsSync(_path.default.join(cwd, 'CHANGELOG.md'));

    if (!exists) {
      _fsExtra.default.writeFileSync(_path.default.join(cwd, 'CHANGELOG.md'), '');
    }

    writeToFile(getAllTags(), exists, backup);
    return true;
  } catch (err)
  /* istanbul ignore next */
  {
    return false;
  }
};

var _default = generateCompleteChangelog;
exports.default = _default;