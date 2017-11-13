import Listr from 'listr';

import generateCompleteChangelog from '../../helpers/generateCompleteChangelog';

const recoverTasks = (argv) => (
  new Listr([
    {
      title: 'Recover the complete CHANGELOG.md',
      task: () => {
        generateCompleteChangelog(argv.b);
      },
    },
  ])
);

export default recoverTasks;
