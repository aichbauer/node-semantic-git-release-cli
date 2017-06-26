const fs = require('fs');
const path = require('path');

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

process.env.NODE_ENV = 'development';

fs.renameSync(path.join(fixtures, 'repo-with-tags', '.git'), path.join(fixtures, 'repo-with-tags', 'git'));
fs.renameSync(path.join(fixtures, 'repo-without-tags', '.git'), path.join(fixtures, 'repo-without-tags', 'git'));
fs.renameSync(path.join(fixtures, 'repo-no-commits', '.git'), path.join(fixtures, 'repo-no-commits', 'git'));

fs.unlinkSync(path.join(fixtures, 'repo-with-tags', 'CHANGELOG.md'));
// fs.unlinkSync(path.join(fixtures, 'repo-without-tags', 'CHANGELOG.md'));
