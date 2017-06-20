const fs = require('fs-extra');
const path = require('path');

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

fs.renameSync(path.join(fixtures, 'repo-with-tags', 'git'), path.join(fixtures, 'repo-with-tags', '.git'));
fs.renameSync(path.join(fixtures, 'repo-without-tags', 'git'), path.join(fixtures, 'repo-without-tags', '.git'));
fs.renameSync(path.join(fixtures, 'repo-no-commits', 'git'), path.join(fixtures, 'repo-no-commits', '.git'));
