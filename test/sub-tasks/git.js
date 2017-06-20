import test from 'ava';

import git from '../../lib/sub-tasks/git';

test.before('change current working directory to fixture', async () => {
  await process.chdir('test/fixtures/repo-with-tags');
});

test.after('reset current working directory', async () => {
  await process.chdir('../../..');
});

test('tag repo, add files, commit changelog and package.json, publish tags', async (t) => {
  const gitTasks = await git();

  const taskTitles = await gitTasks._tasks.map((task) => task.title);

  t.deepEqual(taskTitles, [
    'check if this directory is a git repository',
    'check if changes are git added',
    'check if added changes are git commited',
  ]);

  const realGit = await git().run();

  t.deepEqual(realGit, {});
});
