import execa from "execa";
import hasYarn from "has-yarn";
import fs from "fs-extra";
import path from "path";

const deleteNodeModules = () => {
  const cwd = process.cwd();

  return fs.remove(path.join(cwd, "node_modules"));
};

const installNodeModules = () => {
  if (hasYarn()) {
    return execa.shell("yarn");
  }

  return execa.shell("npm i");
};

export { deleteNodeModules, installNodeModules };
