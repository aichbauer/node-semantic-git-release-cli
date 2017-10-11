import test from 'ava';
import fs from 'fs-extra';
import path from 'path';

import tests from '../../../lib/tasks/default-tasks/tests';

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after('reset current working directory', async () => {
  await process.chdir('../../..');
});

test('TASKS | DEFAULT TASKS | TEST | run tests', async (t) => {
  const testTasks = tests();

  const taskTitles = await testTasks._tasks.map((task) => task.title);

  t.deepEqual(taskTitles, [
    'run tests',
  ]);

  const cwd = process.cwd();

  await fs.copySync(
    path.join(cwd, '..', 'package-json', 'package-version-0.1.0.json'),
    path.join(cwd, 'package.json'),
  );

  const runTasks = await tests().run();

  t.deepEqual(runTasks, {});

  await fs.unlinkSync(path.join(cwd, 'package.json'));
});
