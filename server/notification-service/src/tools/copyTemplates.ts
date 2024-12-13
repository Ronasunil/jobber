import * as shell from "shelljs";

shell.cp("-r", "src/queues/emails", "build/queues");
shell.cp("-f", "src/config.env", "build/");
