import test from 'ava';
import path from 'path';
import fs from 'fs-extra';

import cleanup from '../../../lib/tasks/release-tasks/cleanup';

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after('reset current working directory', async () => {
  await process.chdir('../../..');
});

test('TASKS | DEFAULT TASKS | CLEANUP | check package.json, delete node_modules, install dependencies', async (t) => {
  const cwd = process.cwd();

  const cleanupTasks = cleanup();

  const taskTitles = await cleanupTasks._tasks.map((task) => task.title);

  t.deepEqual(taskTitles, [
    'check package.json',
    'delete node_modules',
    'install dependencies',
  ]);

  await fs.copySync(
    path.join(cwd, '..', 'package-json', 'package-version-0.1.0.json'),
    path.join(cwd, 'package.json'),
  );

  const runTasks = await cleanup().run();

  t.deepEqual(runTasks, {});

  await fs.unlinkSync(path.join(cwd, 'package.json'));
});
