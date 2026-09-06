#!/usr/bin/env node

import { Command } from "commander";
import { push } from "./commands/push";
import { pull } from "./commands/pull";
export { api } from "./api";

const program = new Command();

program
  .name("secretshare")
  .description("share .env file securely via terminal")
  .version("1.0.0");

program
  .command("push [file]")
  .description("Encrypt and share a .env file")
  .option("--ttl <hours>", "expiry in hours", "24")
  .option("--no-once", "keep after first pull")
  .option("--project <name>", "label for this env")
  .action(push);

  program
    .command("pull <code>")
    .description("Download and decrypt a shared env")
    .option("--output <file>", "output file name", ".env")
    .action(pull);

program.parse();
