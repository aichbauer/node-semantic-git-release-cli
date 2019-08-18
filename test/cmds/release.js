import test from "ava";

import { command, desc } from "../../lib/cmds/release";

test("CMDS | DEFAULT | check command name and desc", t => {
  const value = {
    command,
    desc
  };
  const expected = {
    command: "*",
    desc:
      "Release a new version (run tests, write changelog, tag version, push release)"
  };

  t.deepEqual(value, expected);
});
