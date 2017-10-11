import release from '../tasks/default-tasks';

const command = '*';

const desc = 'Release a new version (run tests, write changelog, tag version, push release)';

/* istanbul ignore next */
const handler = () => release();

export {
  command,
  desc,
  handler,
};
