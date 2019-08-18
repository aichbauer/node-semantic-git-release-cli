import execa from 'execa';
import Listr from 'listr';

const cleanup = () => (
  new Listr([
    {
      title: 'run tests',
      task: () => (
        execa
          .shell('npm test')
          .catch(() => {
            throw new Error('Error: npm test exits with a exit code 1... make sure all tests pass');
          })
      ),
    },
  ])
);

export default cleanup;
