import Listr from "listr";
import needsPull from "git-needs-pull";

const needsPullTasks = () =>
  new Listr([
    {
      title: "check if current branch needs to pull",
      task: () => {
        const repoNeedsPull = needsPull();

        if (repoNeedsPull) {
          throw new Error(
            "Error: this repository is out of date with the upstream... you probably need to use `git pull`"
          );
        }
      }
    }
  ]);

export default needsPullTasks;
