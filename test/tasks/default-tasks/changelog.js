import test from 'ava';

import changelog from '../../../lib/tasks/default-tasks/changelog';

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after('reset current working directory', async () => {
  await process.chdir('../../..');
});

test('TASKS | DEFAULT TASKS | CHANGELOG | generate or update changelog', async (t) => {
  const changelogTasks = changelog();

  const taskTitles = await changelogTasks._tasks.map((task) => task.title);

  t.deepEqual(taskTitles, [
    'generate or update changelog',
  ]);
});
