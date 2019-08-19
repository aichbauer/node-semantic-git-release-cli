import semver from 'semver';

const versions = (latestVersion) => {
  const patch = semver.inc(latestVersion, 'patch');
  const minor = semver.inc(latestVersion, 'minor');
  const major = semver.inc(latestVersion, 'major');
  const prereleaseAlpha = semver.inc(latestVersion, 'prerelease', 'alpha');
  const prereleaseBeta = semver.inc(latestVersion, 'prerelease', 'beta');
  const prereleaseRC = semver.inc(latestVersion, 'prerelease', 'rc');

  return [
    patch,
    minor,
    major,
    prereleaseAlpha,
    prereleaseBeta,
    prereleaseRC,
    'Other (specify)',
  ];
};

export default versions;
