import Listr from 'listr';

import updateChangelog from '../../helpers/updateChangelog';

const changelogTasks = (commits, version) => (
  new Listr([
    {
      title: 'generate or update changelog',
      task: () => {
        const updated = updateChangelog(commits, version);

        if (!updated) {
          throw new Error('could not write CHANGELOG.md... make sure you have write and read access to it');
        }
      },
    },
  ])
);

export default changelogTasks;
