import fs from 'fs-extra';
import gitCommitInfo from 'git-commit-info';
import getCommitRange from 'git-commit-range';
import moment from 'moment';
import path from 'path';
import prependFile from 'prepend-file';
import taggedCommits from 'tagged-git-commits';
import {
  header,
  body,
} from './changelogParts';

const writeBackup = () => {
  const cwd = process.cwd();

  fs.renameSync(
    path.join(cwd, 'CHANGELOG.md'),
    path.join(cwd, '.sgr_backup', `CHANGELOG.${moment().unix()}.bak.md`),
  );
};

const backupChangelog = () => {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, '.sgr_backup'))) {
    return writeBackup();
  }

  fs.mkdirSync(path.join(cwd, '.sgr_backup'));

  return writeBackup();
};

const getAllTags = () => {
  const cwd = process.cwd();
  const tags = taggedCommits({
    path: cwd,
    lookBehind: Number.POSITIVE_INFINITY,
  });

  return tags;
};

const writeToFile = (tags, exists, backup) => {
  const cwd = process.cwd();
  let changelogData = '';
  let commits = [];
  let tagDate = '';

  if (exists && backup) {
    backupChangelog();
  } else if (exists) {
    fs.truncateSync(path.join(cwd, 'CHANGELOG.md'), 0);
  }

  tags.forEach((tag, idx) => {
    if (idx === 0) {
      commits = getCommitRange({
        path: cwd,
      });
      commits = getCommitRange({
        path: cwd,
        from: commits[commits.length - 1],
        to: tag.hash,
      });
    } else {
      commits = getCommitRange({
        path: cwd,
        from: tags[idx - 1].hash,
        to: tag.hash,
      });
    }

    tagDate = gitCommitInfo({
      cwd,
      commit: tag.hash,
    }).date;

    const version = tag.version.slice(1, tag.version.length);

    changelogData = `${header(version, tagDate)}\n\n${body(commits, version)}`;

    prependFile.sync(path.join(cwd, 'CHANGELOG.md'), changelogData);
  });
};

const generateCompleteChangelog = (backup) => {
  const cwd = process.cwd();

  try {
    const exists = fs.existsSync(path.join(cwd, 'CHANGELOG.md'));

    if (!exists) {
      fs.writeFileSync(path.join(cwd, 'CHANGELOG.md'), '');
    }

    writeToFile(getAllTags(), exists, backup);

    return true;
  } catch (err) /* istanbul ignore next */ {
    return false;
  }
};

export default generateCompleteChangelog;
