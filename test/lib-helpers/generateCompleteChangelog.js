import fs from 'fs';
import test from 'ava';
import path from 'path';

import generateCompleteChangelog from '../../lib/helpers/generateCompleteChangelog';
import updateChangelog from '../../lib/helpers/updateChangelog';

process.env.NODE_ENV = 'test';

const commits = [
  '2490544c9e6fb155440b73bab9bf6aed48ccd762',
  '2d5ae824612279e6c7e0ad9ee7acc4fbdc073442',
  '9f23f40c7c5eef9b85a7bcf41d6dc7eff149a8e0',
];

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after('reset current working directory', async () => {
  await process.chdir('../../..');
});

test.serial('COMPLETE CHANGELOG | generate without backup', async (t) => {
  const cwd = process.cwd();

  await generateCompleteChangelog(false);

  const backupExists = fs.existsSync(path.join(cwd, '.sgr_backup'));

  t.is(backupExists, false);
});

test.serial('COMPLETE CHANGELOG | generate with backup', async (t) => {
  const cwd = process.cwd();

  await updateChangelog(commits, '0.0.1');

  await generateCompleteChangelog(true);

  const backupFiles = fs.readdirSync(path.join(cwd, '.sgr_backup'));

  t.is(Object.keys(backupFiles).length, 1);
});
