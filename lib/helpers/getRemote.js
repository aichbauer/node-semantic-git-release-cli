import execa from 'execa';
import isGit from 'is-git-repository';
import { platform } from 'os';

const getCommits = () => {
  let remotes;

  const cwd = process.cwd();
  const thisPath = cwd;

  if (!isGit()) {
    return 'not a repo';
  }

  try {
    let checkRemoteExec;
    /* istanbul ignore if */
    if (platform() === 'win32') {
      checkRemoteExec = `pushd ${thisPath} & git remote -v`;
    } else {
      checkRemoteExec = `(cd ${thisPath} ; git remote -v)`;
    }

    remotes = execa.shellSync(checkRemoteExec).stdout;

    return remotes;
  } catch (err) {
    return err;
  }
};

export default getCommits;
