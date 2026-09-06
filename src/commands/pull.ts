import chalk from "chalk";
import ora from "ora";
import path from "path";
import fs from "fs";
import { api } from "../api";
import { decrypt } from "../crypto";
import { PullOptions } from "../model";

export async function pull(shareCode: string, options: PullOptions) {
  //   validate sharecode format
  if (!shareCode || !shareCode.includes(".")) {
    console.log(chalk.red("✖ Invalid share code format"));
    console.log(chalk.gray("  Expected: envshare pull <code>.<key>"));
    process.exit(1);
  }

  //   split the share code into servercode and encryption key
  const [code, encryptKey] = shareCode.split(".");

  if (!code || !encryptKey) {
    console.log(chalk.red("✖ code and key are required"));
    process.exit(1);
  }

  //   show spinner when loading
  const spinner = ora("Fetching encrypted env...").start();

  try {
    const { encrypted } = await api.pull(code);

    spinner.text = "Decrypting... please wait";

    const content = decrypt(encrypted, encryptKey);

    const outputPath = path.resolve(process.cwd(), options.output);
    // warn if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(
        chalk.yellow(`⚠  ${options.output} already exists — overwriting`),
      );
    }

    // save file
    fs.writeFileSync(outputPath, content, "utf8");

    // print success
    console.log();

    console.log(chalk.green(`✔ Saved to ${options.output}`));
    spinner.succeed("Done");
    console.log(
      chalk.gray(
        `   ${content.split("\n").filter(Boolean).length} variables loaded`,
      ),
    );
    console.log();
  } catch (error: any) {
    spinner.fail("failed to pull env");
    console.log(chalk.red(`✖ failed to perform pull operation ${error}`));
    process.exit(1);
  }
}
