import Listr from "listr";
import chalk from "chalk";
import inquirer from "inquirer";
import isAdded from "is-git-added";
import isGit from "is-git-repository";
import getGitRemotes from "get-git-remotes";
import getCommitRange from "git-commit-range";
import taggedCommits from "tagged-git-commits";

import generateVersions from "../../helpers/generateVersions";
import getLatestVersion from "../../helpers/getLatestVersion";
import questions from "../../questions/release-questions";

import { handler as showVersion } from "../../cmds/version";

import cleanupTasks from "./cleanup";
import needsPullTasks from "./needsPull";
import releaseTasks from "./release";
import testsTasks from "./tests";
import changelogTasks from "./changelog";
import versionTasks from "./version";

const tasks = (commits, version) =>
  new Listr([
    {
      title: "Check if Project is up to date",
      task: () => needsPullTasks()
    },
    {
      title: "Cleanup Project",
      task: () => cleanupTasks()
    },
    {
      title: "Run Tests",
      task: () => testsTasks()
    },
    {
      title: "Update Version",
      task: () => versionTasks(version)
    },
    {
      title: "Update Changelog",
      task: () => changelogTasks(commits, version)
    },
    {
      title: `Release new version v${version}`,
      task: () => releaseTasks(version)
    }
  ]);

const release = argv => {
  console.log();
  const cwd = process.cwd();
  const latestTaggedCommits = taggedCommits({ path: cwd });
  const latestTaggedCommit =
    latestTaggedCommits.length === 0 ? "" : latestTaggedCommits[0].commit;
  const commits = getCommitRange({ path: cwd, from: latestTaggedCommit });
  const latestVersion = getLatestVersion();
  const newVersions = generateVersions(latestVersion);
  const questionsList = questions(newVersions);

  if (!isGit(cwd)) {
    return console.warn(
      chalk.red(
        "Error: this is not a git repository... make sure you are in the right directory"
      )
    );
  } else if (!isAdded(cwd) && commits.length === 0) {
    return console.warn(
      chalk.red("Error: no changes... try to git add <files>")
    );
  } else if (commits.length === 0) {
    return console.warn(
      chalk.red("Error: no commits yet... try to git commit -m <message>")
    );
  } else if (!getGitRemotes(cwd)) {
    return console.warn(
      chalk.red(
        "Error: it seems you do not have a remote repository set... try to git remote add origin <remote-url>"
      )
    );
  } else if (latestVersion === "") {
    return console.warn(
      chalk.red(
        "Error: it seems you do not have a package.json... try npm init"
      )
    );
  }

  if (argv.v) {
    return showVersion();
  }

  return inquirer
    .prompt(questionsList)
    .then(answers => {
      if (answers.ownVersion) {
        return tasks(commits, answers.ownVersion)
          .run()
          .catch(() =>
            console.warn(
              chalk.red(
                "Error: whoops, try to solve the problem mentioned above..."
              )
            )
          );
      }

      return tasks(commits, answers.version)
        .run()
        .catch(() =>
          console.warn(
            chalk.red(
              "Error: whoops, try to solve the problem mentioned above..."
            )
          )
        );
    })
    .catch(err => {
      console.log(tasks);
      console.warn(chalk.red(err));
    });
};

export default release;
