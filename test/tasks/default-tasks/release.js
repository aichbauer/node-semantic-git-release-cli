import test from 'ava';

import release from '../../../lib/tasks/default-tasks/release';

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after('reset current working directory', async () => {
  await process.chdir('../../..');
});

test('TASKS | DEFAULT TASKS | RELEASE | tag repo, add files, commit changelog and package.json, publish tags', async (t) => {
  const releaseTasks = await release('0.0.1');

  const taskTitles = await releaseTasks._tasks.map((task) => task.title);

  t.deepEqual(taskTitles, [
    'git add CHANGELOG.md and package.json',
    'git commit CHANGELOG.md and package.json',
    'git tag -a v0.0.1 -m 0.0.1',
    'release new version v0.0.1',
  ]);
});
