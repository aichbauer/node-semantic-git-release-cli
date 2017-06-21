import execa from 'execa';
import { platform } from 'os';
import taggedCommits from 'tagged-git-commit';

const getCommits = () => {
  let commits;

  const cwd = process.cwd();
  const latestTag = taggedCommits({ path: cwd });
  const latestCommits = [];

  try {
    let latestCommitsExec;
    /* istanbul ignore if */
    if (platform() === 'win32') {
      if (latestTag.length === 0) {
        latestCommitsExec = `pushd ${cwd} & git --no-pager log --format=format:%H`;
      } else {
        latestCommitsExec = `pushd ${cwd} & git --no-pager log ${latestTag}... --format=format:%H`;
      }
    } else {
      if (latestTag.length === 0) { // eslint-disable-line
        latestCommitsExec = `(cd ${cwd} ; git --no-pager log --format=format:%H )`;
      } else {
        latestCommitsExec = `(cd ${cwd} ; git --no-pager log ${latestTag}... --format=format:%H )`;
      }
    }

    commits = execa.shellSync(latestCommitsExec).stdout;
    commits = commits.split('\n');
    commits.forEach(commithash => latestCommits.push(commithash));

    return latestCommits;
  } catch (err) {
    return [];
  }
};

export default getCommits;
