import execa from 'execa';
import { platform } from 'os';

const getCommits = () => {
  let remotes;

  const cwd = process.cwd();

  try {
    let checkRemoteExec;
    /* istanbul ignore if */
    if (platform() === 'win32') {
      checkRemoteExec = `pushd ${cwd} & git remote -v`;
    } else {
      checkRemoteExec = `(cd ${cwd} ; git remote -v)`;
    }

    remotes = execa.shellSync(checkRemoteExec).stdout;

    return remotes;
  } catch (err) {
    return '';
  }
};

export default getCommits;
