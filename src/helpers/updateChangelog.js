import fs from 'fs-extra';
import path from 'path';
import prependFile from 'prepend-file';
import {
  header,
  body,
} from './changelogParts';

const writeToFile = (commits = [], version) => {
  const cwd = process.cwd();
  const changelogData = `${header(version)}\n\n${body(commits, version)}`;

  prependFile.sync(path.join(cwd, 'CHANGELOG.md'), changelogData);
};

const updateChangelog = (commits = [], version) => {
  const cwd = process.cwd();

  try {
    const exists = fs.existsSync(path.join(cwd, 'CHANGELOG.md'));

    if (!exists) {
      fs.writeFileSync(path.join(cwd, 'CHANGELOG.md'), '');
    }

    writeToFile(commits, version, exists);

    return true;
  } catch (err) /* istanbul ignore next */ {
    return false;
  }
};

export default updateChangelog;
