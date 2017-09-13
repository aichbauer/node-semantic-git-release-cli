import Listr from 'listr';

import generateCompleteChangelog from '../helpers/generateCompleteChangelog';

const recoverTasks = (backup) => (
  new Listr([
    {
      title: 'Recover the complete CHANGELOG.md',
      task: () => {
        generateCompleteChangelog(backup);
      },
    },
  ])
);

export default recoverTasks;
