import test from 'ava';

import version from '../../../lib/tasks/default-tasks/version';

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after('reset current working directory', async () => {
  await process.chdir('../../..');
});

test('TASKS | DEFAULT TASKS | VERSION | update package.json version', async (t) => {
  const versionTasks = version();

  const taskTitles = await versionTasks._tasks.map((task) => task.title);

  t.deepEqual(taskTitles, [
    'update package.json version',
  ]);
});
