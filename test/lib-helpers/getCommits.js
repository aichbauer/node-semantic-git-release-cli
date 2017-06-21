import test from 'ava';
import { homedir } from 'os';

import getCommits from '../../lib/helpers/getCommits';

process.env.NODE_ENV = 'test';

test('GET COMMITS | since last tag', async (t) => {
  await process.chdir('test/fixtures/repo-with-tags');

  const commits = await getCommits();

  t.deepEqual(commits, [
    '2490544c9e6fb155440b73bab9bf6aed48ccd762',
    '2d5ae824612279e6c7e0ad9ee7acc4fbdc073442',
    '9f23f40c7c5eef9b85a7bcf41d6dc7eff149a8e0',
  ]);

  await process.chdir('../../..');
});

test.serial('GET COMMITS | from a repo without tags', async (t) => {
  await process.chdir('test/fixtures/repo-without-tags');

  const commits = await getCommits();

  t.deepEqual(commits, [
    'f0bd5c7291ca6228953aed3cc077afd95a7ab82e',
  ]);

  await process.chdir('../../..');
});

test.serial('GET COMMITS | not a repo', async (t) => {
  const cwd = process.cwd();

  await process.chdir(homedir());

  const commits = await getCommits();

  t.deepEqual(commits, []);

  await process.chdir(cwd);
});

test.serial('GET COMMITS | no commits yet', async (t) => {
  await process.chdir('test/fixtures/repo-no-commits');

  const commits = await getCommits();

  t.deepEqual(commits, []);

  await process.chdir('../../..');
});
