import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

const deleteNodeModules = () => {
  const cwd = process.cwd();

  return fs
    .remove(path.join(cwd, 'node_modules'))
    .then(() => true);
};

const installNodeModules = (hasYarn) => {
  if (hasYarn) {
    return execa
      .shell('yarn')
      .then(() => true);
  }

  return execa
    .shell('npm i')
    .then(() => true);
};

export {
  deleteNodeModules,
  installNodeModules,
};
