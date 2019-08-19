import test from "ava";

import backup from "../../lib/options/backup";

test("OPTIONS | BACKUP | check alias, describe and type", t => {
  const expected = {
    alias: "b",
    describe: "backup CHANGELOG.md when recover",
    type: "boolean"
  };

  t.deepEqual(backup, expected);
});
