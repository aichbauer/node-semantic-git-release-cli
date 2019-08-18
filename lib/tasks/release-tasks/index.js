"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listr = _interopRequireDefault(require("listr"));

var _chalk = _interopRequireDefault(require("chalk"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _isGitAdded = _interopRequireDefault(require("is-git-added"));

var _isGitRepository = _interopRequireDefault(require("is-git-repository"));

var _getGitRemotes = _interopRequireDefault(require("get-git-remotes"));

var _gitCommitRange = _interopRequireDefault(require("git-commit-range"));

var _taggedGitCommits = _interopRequireDefault(require("tagged-git-commits"));

var _generateVersions = _interopRequireDefault(require("../../helpers/generateVersions"));

var _getLatestVersion = _interopRequireDefault(require("../../helpers/getLatestVersion"));

var _releaseQuestions = _interopRequireDefault(require("../../questions/release-questions"));

var _version = require("../../cmds/version");

var _cleanup = _interopRequireDefault(require("./cleanup"));

var _release = _interopRequireDefault(require("./release"));

var _tests = _interopRequireDefault(require("./tests"));

var _changelog = _interopRequireDefault(require("./changelog"));

var _version2 = _interopRequireDefault(require("./version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tasks = (commits, version) => new _listr.default([{
  title: 'Cleanup Project',
  task: () => (0, _cleanup.default)()
}, {
  title: 'Run Tests',
  task: () => (0, _tests.default)()
}, {
  title: 'Update Version',
  task: () => (0, _version2.default)(version)
}, {
  title: 'Update Changelog',
  task: () => (0, _changelog.default)(commits, version)
}, {
  title: `Release new version v${version}`,
  task: () => (0, _release.default)(version)
}]);

const release = argv => {
  const cwd = process.cwd();
  const latestTaggedCommits = (0, _taggedGitCommits.default)({
    path: cwd
  });
  const latestTaggedCommit = latestTaggedCommits.length === 0 ? '' : latestTaggedCommits[0].commit;
  const commits = (0, _gitCommitRange.default)({
    path: cwd,
    from: latestTaggedCommit
  });
  const latestVersion = (0, _getLatestVersion.default)();
  const newVersions = (0, _generateVersions.default)(latestVersion);
  const questionsList = (0, _releaseQuestions.default)(newVersions);

  if (!(0, _isGitRepository.default)(cwd)) {
    return console.warn(_chalk.default.red('Error: this is not a git repository... make sure you are in the right directory'));
  } else if (!(0, _isGitAdded.default)(cwd) && commits.length === 0) {
    return console.warn(_chalk.default.red('Error: no changes... try to git add <files>'));
  } else if (commits.length === 0) {
    return console.warn(_chalk.default.red('Error: no commits yet... try to git commit -m <message>'));
  } else if (!(0, _getGitRemotes.default)(cwd)) {
    return console.warn(_chalk.default.red('Error: it seems you do not have a remote repository set... try to git remote add origin <remote-url>'));
  } else if (latestVersion === '') {
    return console.warn(_chalk.default.red('Error: it seems you do not have a package.json... try npm init'));
  }

  if (argv.v) {
    return (0, _version.handler)();
  }

  return _inquirer.default.prompt(questionsList).then(answers => {
    if (answers.ownVersion) {
      return tasks(commits, answers.ownVersion).run().catch(() => console.warn(_chalk.default.red('Error: whoops, try to solve the problem mentioned above...')));
    }

    return tasks(commits, answers.version).run().catch(() => console.warn(_chalk.default.red('Error: whoops, try to solve the problem mentioned above...')));
  }).catch(err => console.warn(_chalk.default.red(err)));
};

var _default = release;
exports.default = _default;