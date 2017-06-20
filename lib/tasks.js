import Listr from 'listr';

import gitTasks from './sub-tasks/git';
import cleanupTasks from './sub-tasks/cleanup';
import releaseTasks from './sub-tasks/release';
import testsTasks from './sub-tasks/tests';
import changelogTasks from './sub-tasks/changelog';
import versionTasks from './sub-tasks/version';

const tasks = (commits, version) => (
  new Listr([
    {
      title: 'Git Checks',
      task: () => gitTasks(),
    },
    {
      title: 'Cleanup Project',
      task: () => cleanupTasks(),
    },
    {
      title: 'Run Tests',
      task: () => testsTasks(),
    },
    {
      title: 'Update Version',
      task: () => versionTasks(version),
    },
    {
      title: 'Update Changelog',
      task: () => changelogTasks(commits, version),
    },
    {
      title: `Release new version v${version}`,
      task: () => releaseTasks(version),
    },
  ])
);

export default tasks;
