import execa from 'execa';
import Listr from 'listr';

const releaseTasks = (version) => (
  new Listr([
    {
      title: 'git add CHANGELOG.md and package.json',
      task: /* istanbul ignore next */ () => (
        execa
          .shell('git add .')
          .catch(() => {
            throw new Error('Error: could not git add <files>');
          })
      ),
    },
    {
      title: 'git commit CHANGELOG.md and package.json',
      task: /* istanbul ignore next */ () => (
        execa
          .shell(`git commit -m "${version}"`)
          .catch(() => {
            throw new Error('Error: could not git commit -m <message>');
          })
      ),
    },
    {
      title: `git tag -a v${version} -m ${version}`,
      task: /* istanbul ignore next */ () => (
        execa
          .shell(`git tag -a v${version} -m ${version}`)
          .catch(() => {
            throw new Error(`Error: could not tag with v${version}... make sure this version is not tagged already`);
          })
      ),
    },
    {
      title: `release new version v${version}`,
      task: /* istanbul ignore next */ () => (
        execa
          .shell('git push --follow-tags')
          .catch(() => {
            throw new Error('Error: could not push to remote repository... make sure you have access to it');
          })
      ),
    },
  ])
);

export default releaseTasks;
