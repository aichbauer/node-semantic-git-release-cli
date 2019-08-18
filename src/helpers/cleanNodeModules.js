import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

const deleteNodeModules = () => {
  const cwd = process.cwd();

  return fs.remove(path.join(cwd, 'node_modules'));
};

const installNodeModules = (hasYarn) => {
  if (hasYarn) {
    return execa.shell('yarn');
  }

  return execa.shell('npm i');
};

export {
  deleteNodeModules,
  installNodeModules,
};
