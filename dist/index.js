#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const commander_1 = require("commander");
const push_1 = require("./commands/push");
const pull_1 = require("./commands/pull");
var api_1 = require("./api");
Object.defineProperty(exports, "api", { enumerable: true, get: function () { return api_1.api; } });
const program = new commander_1.Command();
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
    .action(push_1.push);
program
    .command("pull <code>")
    .description("Download and decrypt a shared env")
    .option("--output <file>", "output file name", ".env")
    .action(pull_1.pull);
program.parse();
