"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _prependFile = _interopRequireDefault(require("prepend-file"));

var _changelogParts = require("./changelogParts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const writeToFile = (commits = [], version) => {
  const cwd = process.cwd();
  const changelogData = `${(0, _changelogParts.header)(version)}\n\n${(0, _changelogParts.body)(commits, version)}`;

  _prependFile.default.sync(_path.default.join(cwd, 'CHANGELOG.md'), changelogData);
};

const updateChangelog = (commits = [], version) => {
  const cwd = process.cwd();

  try {
    const exists = _fsExtra.default.existsSync(_path.default.join(cwd, 'CHANGELOG.md'));

    if (!exists) {
      _fsExtra.default.writeFileSync(_path.default.join(cwd, 'CHANGELOG.md'), '');
    }

    writeToFile(commits, version, exists);
    return true;
  } catch (err)
  /* istanbul ignore next */
  {
    return false;
  }
};

var _default = updateChangelog;
exports.default = _default;