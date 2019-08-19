import release from '../tasks/release-tasks';

const command = '*';

const desc = 'Release a new version (run tests, write changelog, tag version, push release)';

/* istanbul ignore next */
const handler = (argv) => release(argv);

export {
  command,
  desc,
  handler,
};
