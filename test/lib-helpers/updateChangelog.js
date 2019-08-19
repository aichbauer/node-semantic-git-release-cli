import test from "ava";
import fs from "fs-extra";
import path from "path";

import updateChangelog from "../../lib/helpers/updateChangelog";
import changelog from "../fixtures/changelogs/_changelog";

process.env.NODE_ENV = "test";

const commits = [
  "2490544c9e6fb155440b73bab9bf6aed48ccd762",
  "2d5ae824612279e6c7e0ad9ee7acc4fbdc073442",
  "9f23f40c7c5eef9b85a7bcf41d6dc7eff149a8e4"
];

test.before("change current working directory to fixture", async () => {
  await process.chdir("test/fixtures/repo-with-tags");
});

test.after("reset current working directory", async () => {
  await process.chdir("../../..");
});

test.serial(
  "UPDATE CHANGELOG | create a new changelog, write 3 commits",
  async t => {
    try {
      fs.unlinkSync(path.join(process.cwd(), "CHANGELOG.md"));
    } catch (err) {
      console.error(err);
    }

    await updateChangelog(commits, "0.0.1");

    const value = fs.readFileSync(
      path.join(process.cwd(), "CHANGELOG.md"),
      "utf-8"
    );
    const expected = changelog.new;

    t.deepEqual(value, expected);
  }
);

test.serial(
  "UPDATE CHANGELOG | update the existing changelog, write 3 commits",
  async t => {
    await updateChangelog(commits, "0.0.2");

    const value = fs.readFileSync(
      path.join(process.cwd(), "CHANGELOG.md"),
      "utf-8"
    );
    const expected = changelog.overwritten;

    t.deepEqual(value, expected);
  }
);

test.serial("UPDATE CHANGELOG | no changelog exists before", async t => {
  try {
    fs.unlinkSync(path.join(process.cwd(), "CHANGELOG.md"));
  } catch (err) {
    console.error(err);
  }

  await updateChangelog(commits, "0.0.1");

  const value = fs.readFileSync(
    path.join(process.cwd(), "CHANGELOG.md"),
    "utf-8"
  );
  const expected = changelog.new;

  t.deepEqual(value, expected);
});

test.serial(
  "UPDATE CHANGELOG | no changelog exists before | no commits no version",
  async t => {
    try {
      fs.unlinkSync(path.join(process.cwd(), "CHANGELOG.md"));
    } catch (err) {
      console.error(err);
    }

    await updateChangelog();

    const value = fs.readFileSync(
      path.join(process.cwd(), "CHANGELOG.md"),
      "utf-8"
    );
    const expected = changelog.noCommitsAndVersion;

    t.deepEqual(value, expected);
  }
);
