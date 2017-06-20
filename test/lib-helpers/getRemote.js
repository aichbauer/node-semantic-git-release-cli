import test from 'ava';
import { homedir } from 'os';

import getRemote from '../../lib/helpers/getRemote';

test('GET REMOTE | not empty', async (t) => {
  const remote = await getRemote();

  t.not(remote, '');
});

test.serial('GET REMOTE | is empty', async (t) => {
  await process.chdir('test/fixtures/repo-no-commits');

  const remote = await getRemote();

  t.is(remote, '');

  await process.chdir('../../..');
});

test.serial('GET REMOTE | error', async (t) => {
  const cwd = process.cwd();

  await process.chdir(homedir());

  const remote = await getRemote();

  t.is(remote, 'not a repo');

  await process.chdir(cwd);
});
