import Listr from "listr";
import execa from "execa";

const versionTasks = version =>
  new Listr([
    {
      title: "update package.json version",
      task: () =>
        execa.shell(`npm version ${version} --no-git-tag-version`).catch(() => {
          throw new Error(
            `Error: could not run npm version ${version}... make sure this --> ${version} <-- was not used before`
          );
        })
    }
  ]);

export default versionTasks;
