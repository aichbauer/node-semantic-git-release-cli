import test from "ava";

import generateVersions from "../../lib/helpers/generateVersions";

process.env.NODE_ENV = "test";

test("GENERATE VERSIONS | all possible semver versions", async t => {
  const versions = await generateVersions("0.0.1");

  t.deepEqual(versions, [
    "0.0.2",
    "0.1.0",
    "1.0.0",
    "0.0.2-alpha.0",
    "0.0.2-beta.0",
    "0.0.2-rc.0",
    "Other (specify)"
  ]);
});
