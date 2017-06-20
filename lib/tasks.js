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
      task: /* istanbul ignore next */ () => gitTasks(),
    },
    {
      title: 'Cleanup Project',
      task: /* istanbul ignore next */ () => cleanupTasks(),
    },
    {
      title: 'Run Tests',
      task: /* istanbul ignore next */ () => testsTasks(),
    },
    {
      title: 'Update Version',
      task: /* istanbul ignore next */ () => versionTasks(version),
    },
    {
      title: 'Update Changelog',
      task: /* istanbul ignore next */ () => changelogTasks(commits, version),
    },
    {
      title: `Release new version v${version}`,
      task: /* istanbul ignore next */ () => releaseTasks(version),
    },
  ])
);

export default tasks;
