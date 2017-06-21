import test from 'ava';
import fs from 'fs';
import path from 'path';

import updateChangelog from '../../lib/helpers/updateChangelog';
import changelog from '../fixtures/changelogs/changelog';

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

test.serial('UPDATE CHANGELOG | create a new changelog, write 3 commits', async (t) => {
  let data;

  await updateChangelog(commits, '0.0.1');

  const readstream = fs.createReadStream(path.join(process.cwd(), 'CHANGELOG.md'), 'utf-8');
  readstream.on('data', (chunk) => {
    data += chunk;
  });

  await readstream.on('end', () => (t.is(data, changelog.overwritten)));

  await readstream.close();
});

test.serial('UPDATE CHANGELOG | update the existing changelog, write 3 commits', async (t) => {
  let data;

  await updateChangelog(commits, '0.0.2');

  const readstream = fs.createReadStream(path.join(process.cwd(), 'CHANGELOG.md'), 'utf-8');
  readstream.on('data', (chunk) => {
    data += chunk;
  });

  await readstream.on('end', () => (t.is(data, changelog.overwritten)));

  await readstream.close();
});
