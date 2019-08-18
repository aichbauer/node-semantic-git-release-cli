"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _semver = _interopRequireDefault(require("semver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versions = latestVersion => {
  const patch = _semver.default.inc(latestVersion, 'patch');

  const minor = _semver.default.inc(latestVersion, 'minor');

  const major = _semver.default.inc(latestVersion, 'major');

  const prereleaseAlpha = _semver.default.inc(latestVersion, 'prerelease', 'alpha');

  const prereleaseBeta = _semver.default.inc(latestVersion, 'prerelease', 'beta');

  const prereleaseRC = _semver.default.inc(latestVersion, 'prerelease', 'rc');

  return [patch, minor, major, prereleaseAlpha, prereleaseBeta, prereleaseRC, 'Other (specify)'];
};

var _default = versions;
exports.default = _default;