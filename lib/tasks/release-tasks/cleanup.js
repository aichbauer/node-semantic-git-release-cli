import Listr from 'listr';
import hasYarn from 'has-yarn';
import fs from 'fs-extra';
import path from 'path';
import {
  deleteNodeModules,
  installNodeModules,
} from '../../helpers/cleanNodeModules';

const cleanup = () => {
  const cwd = process.cwd();
  return new Listr([
    {
      title: 'check package.json',
      task: () => (
        fs
          .pathExists(path.join(cwd, 'package.json'))
          .then((exists) => {
            if (!exists) {
              throw new Error('Error: no package.json found... make sure you are in the correct directory');
            }
          })
      ),
    },
    {
      title: 'delete node_modules',
      task: () => deleteNodeModules(),
    },
    {
      title: 'install dependencies',
      task: () => installNodeModules(hasYarn),
    },
  ]);
};

export default cleanup;
