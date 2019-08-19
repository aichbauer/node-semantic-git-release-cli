import test from "ava";

import needsPullTasks from "../../../lib/tasks/release-tasks/needsPull";

test("TASKS | RELEASE TASKS | NEEDS PULL | check if needsPullTasks is typeof object", t => {
  t.is(typeof needsPullTasks, "function");
});
