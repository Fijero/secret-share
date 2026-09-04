import chalk from "chalk";
import { Command } from "commander";

const commander = new Command();

export function isSecret(txt: string) {
  if (txt === "yoo") {
    console.log(chalk.green("yes sir sirr sir"));
  }
}

