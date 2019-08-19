import pkg from '../../package.json';

const command = 'version';

const aliases = ['v'];

const desc = 'Show the current version number';

/* istanbul ignore next */
const handler = () => console.info(`sgr version ${pkg.version}`);

export {
  command,
  aliases,
  desc,
  handler,
};
