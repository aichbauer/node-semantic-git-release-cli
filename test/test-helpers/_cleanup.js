const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

process.env.NODE_ENV = 'development';

fs.renameSync(path.join(fixtures, 'repo-with-tags', '.git'), path.join(fixtures, 'repo-with-tags', 'git'));
fs.renameSync(path.join(fixtures, 'repo-without-tags', '.git'), path.join(fixtures, 'repo-without-tags', 'git'));
fs.renameSync(path.join(fixtures, 'repo-no-commits', '.git'), path.join(fixtures, 'repo-no-commits', 'git'));

fs.unlinkSync(path.join(fixtures, 'repo-with-tags', 'CHANGELOG.md'));
if (fs.existsSync(path.join(fixtures, 'repo-with-tags', '.sgr_backup'))) {
  fse.removeSync(path.join(fixtures, 'repo-with-tags', '.sgr_backup'));
}
