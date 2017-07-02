import chalk from 'chalk';
import taggedCommits from 'tagged-git-commits';
import path from 'path';
import fs from 'fs-extra';

const getLatestVersion = () => {
  const cwd = process.cwd();
  const exitstsPkg = fs.existsSync(path.join(cwd, 'package.json'));

  if (!exitstsPkg) {
    return '';
  }

  const pkg = fs.readJsonSync(path.join(cwd, 'package.json'));
  const latestPkgVersion = pkg.version;
  const latestTag = taggedCommits({ path: cwd });

  let latestVersion;
  let latestTaggedVersion;

  if (latestTag[0]) {
    latestTaggedVersion = latestTag[0].commit;
  } else {
    latestTaggedVersion = undefined;
  }

  if (`v${latestPkgVersion}` !== `${latestTaggedVersion}`
    && latestTaggedVersion === undefined) {
    latestVersion = `v${latestPkgVersion}`;
  } else if (`v${latestPkgVersion}` === `${latestTaggedVersion}`) {
    latestVersion = `v${latestPkgVersion}`;
  } else {
    console.warn(chalk.red('WARNING: it seems you do not have a package.json or the versions from package.json and the latest tag differ...'));
    console.warn(chalk.yellow('if you increase the version with `sgr`, it will write all commits since the last tag into the new version...'));
    console.warn(chalk.yellow('you might consider tagging your last verion before using `sgr`...'));
    latestVersion = `v${latestPkgVersion}`;
  }

  return latestVersion;
};

export default getLatestVersion;
