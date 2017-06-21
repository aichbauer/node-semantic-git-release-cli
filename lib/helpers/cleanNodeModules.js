import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

const deleteNodeModules = () => {
  const cwd = process.cwd();

  return fs.removeSync(path.join(cwd, 'node_modules'));
};

const installNodeModules = (hasYarn) => {
  if (hasYarn) {
    return execa.shellSync('yarn');
  }

  return execa.shellSync('npm i');
};

export {
  deleteNodeModules,
  installNodeModules,
};
