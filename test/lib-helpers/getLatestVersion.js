import test from 'ava';
import fs from 'fs-extra';
import path from 'path';

import getLatestVersion from '../../lib/helpers/getLatestVersion';

process.env.NODE_ENV = 'test';

test.serial('LATEST VERSION | tagged version === package.json version', async (t) => {
  await process.chdir('test/fixtures/repo-with-tags');

  const cwd = process.cwd();

  await fs.copySync(
    path.join(cwd, '..', 'package-json', 'package-version-0.1.0.json'),
    path.join(cwd, 'package.json'),
  );

  const latestVersion = await getLatestVersion();

  t.deepEqual(latestVersion, 'v0.1.0');

  await fs.unlinkSync(path.join(cwd, 'package.json'));

  await process.chdir('../../..');
});

test.serial('LATEST VERSION | tagged version !== package.json version', async (t) => {
  await process.chdir('test/fixtures/repo-with-tags');

  const cwd = process.cwd();

  await fs.copySync(
    path.join(cwd, '..', 'package-json', 'package-version-0.0.1.json'),
    path.join(cwd, 'package.json'),
  );

  const latestVersion = await getLatestVersion();

  t.is(latestVersion, 'v0.0.1');

  await fs.unlinkSync(path.join(cwd, 'package.json'));

  await process.chdir('../../..');
});

test.serial('LATEST VERSION | no tagged version', async (t) => {
  await process.chdir('test/fixtures/repo-without-tags');

  const cwd = process.cwd();

  await fs.copySync(
    path.join(cwd, '..', 'package-json', 'package-version-0.0.1.json'),
    path.join(cwd, 'package.json'),
  );

  const latestVersion = await getLatestVersion();

  t.is(latestVersion, 'v0.0.1');

  await fs.unlinkSync(path.join(cwd, 'package.json'));

  await process.chdir('../../..');
});


test.serial('LATEST VERSION | no package.json', async (t) => {
  await process.chdir('test/fixtures/repo-no-commits');

  const latestVersion = await getLatestVersion();

  console.log(latestVersion);

  t.deepEqual(latestVersion, '');

  await process.chdir('../../..');
});
