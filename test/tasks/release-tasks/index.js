import test from "ava";

import tasks from "../../../lib/tasks/release-tasks";

test("TASKS | RELEASE TASKS | INDEX | check if tasks is typeof object", t => {
  t.is(typeof tasks, "function");
});
