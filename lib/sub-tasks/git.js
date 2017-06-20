import isAdded from 'is-git-added';
import isGit from 'is-git-repository';
import Listr from 'listr';

import getCommits from '../helpers/getCommits';

const cleanup = () => {
  const cwd = process.cwd();
  const commits = getCommits();

  return new Listr([
    {
      title: 'check if this directory is a git repository',
      task: () => {
        if (!isGit(cwd)) {
          throw new Error('Error: this is not a git repository... make sure you are in the correct directory');
        }
      },
    },
    {
      title: 'check if changes are git added',
      task: () => {
        if (commits[0] === '' && !isAdded(cwd)) {
          throw new Error('Error: no changes... try to git add <files>');
        }
      },
    },
    {
      title: 'check if added changes are git commited',
      task: () => {
        if (commits[0] === '') {
          throw new Error('Error: no new commits... try to git commit -m <messages>');
        }
      },
    },
  ]);
};

export default cleanup;
