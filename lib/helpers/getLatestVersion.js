import taggedCommits from 'tagged-git-commit';
import path from 'path';
import fs from 'fs-extra';

const getLatestVersion = () => {
  try {
    const cwd = process.cwd();
    const pkg = fs.readJsonSync(path.join(cwd, 'package.json'));
    const latestPkgVersion = pkg.version;
    const latestTag = taggedCommits({ path: cwd });

    let latestVersion;
    let latestTaggedVersion;

    if (latestTag[0] !== undefined) {
      latestTaggedVersion = latestTag[0].split('refs/tags/')[1];
    } else {
      latestTaggedVersion = undefined;
    }

    if (`v${latestPkgVersion}` !== `${latestTaggedVersion}` &&
      latestTaggedVersion === undefined) {
      latestVersion = `v${latestPkgVersion}`;
    } else if (`v${latestPkgVersion}` === `${latestTaggedVersion}`) {
      latestVersion = `v${latestPkgVersion}`;
    } else {
      latestVersion = 'versions differ';
    }

    return latestVersion;
  } catch (err) {
    return 'no package.json';
  }
};

export default getLatestVersion;
