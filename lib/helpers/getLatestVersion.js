"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _taggedGitCommits = _interopRequireDefault(require("tagged-git-commits"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getLatestVersion = () => {
  const cwd = process.cwd();

  const exitstsPkg = _fsExtra.default.existsSync(_path.default.join(cwd, 'package.json'));

  if (!exitstsPkg) {
    return '';
  }

  const pkg = _fsExtra.default.readJsonSync(_path.default.join(cwd, 'package.json'));

  const latestPkgVersion = pkg.version;
  const latestTag = (0, _taggedGitCommits.default)({
    path: cwd
  });
  let latestVersion;
  let latestTaggedVersion;

  if (latestTag[0]) {
    latestTaggedVersion = latestTag[0].version;
  } else {
    latestTaggedVersion = undefined;
  }

  if (`v${latestPkgVersion}` !== `${latestTaggedVersion}` && latestTaggedVersion === undefined) {
    latestVersion = `v${latestPkgVersion}`;
  } else if (`v${latestPkgVersion}` === `${latestTaggedVersion}`) {
    latestVersion = `v${latestPkgVersion}`;
  } else {
    console.warn(_chalk.default.yellow('WARNING: the versions from package.json and the latest tag differ...\n'), _chalk.default.yellow('if you increase the version with `sgr`, it will write all commits since the last tag into the new version..\n'), _chalk.default.yellow('you might consider tagging your last verion before using `sgr`...\n'));
    latestVersion = `v${latestPkgVersion}`;
  }

  return latestVersion;
};

var _default = getLatestVersion;
exports.default = _default;