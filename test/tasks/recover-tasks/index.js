import test from "ava";

import tasks from "../../../lib/tasks/recover-tasks";

test("TASKS | RECOVER TASKS | INDEX | check if tasks is typeof object", t => {
  t.is(typeof tasks, "function");
});
