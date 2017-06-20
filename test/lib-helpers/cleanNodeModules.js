import test from 'ava';
import fs from 'fs-extra';
import path from 'path';

import {
  deleteNodeModules,
  installNodeModules,
} from '../../lib/helpers/cleanNodeModules';

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after('reset current working directory', async () => {
  await process.chdir('../../..');
});

test('delete node_modules, install node_modules with npm', async (t) => {
  const cwd = process.cwd();

  await fs.copySync(
    path.join(cwd, '..', 'package-json', 'package-version-0.0.1.json'),
    path.join(cwd, 'package.json'),
  );

  const cleanedNodeModules = await deleteNodeModules();

  t.is(cleanedNodeModules, true);

  const installedNodeModules = await installNodeModules(false);

  t.is(installedNodeModules, true);

  await fs.unlinkSync(path.join(cwd, 'package.json'));
});
