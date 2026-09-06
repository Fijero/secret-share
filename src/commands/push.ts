import path from "path";
import fs from "fs";
import chalk from "chalk";
import ora from "ora";
import { PushOptions } from "../model";
import { encrypt, generateKey } from "../crypto";
import { api } from "../api";

export async function push(file: string = ".env", options: PushOptions) {
  // resolve the full path
  const filePath = path.resolve(process.cwd(), file);

  //   checl if fila path exist
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`The file path does not exist ${filePath}`));
    process.exit(1);
  }

  //read the file content
  const fileContent = fs.readFileSync(filePath, "utf8");

  if (!fileContent.trim()) {
    console.log(
      chalk.red("✖ File is empty, include variables in your .env file"),
    );
    process.exit(1);
  }

  //   generate encryption key and encrypt the content
  const encryptKey = generateKey();
  const encrypted = encrypt(fileContent, encryptKey);

  //   show spinner while uploading the key
  const spinner = ora("uploading encrypted .env file").start();

  try {
    // push to server
    const { code } = await api.push({
      encrypted,
      ttl: Number(options.ttl) * 3600,
      once: options.once,
      project: options.project,
    });

    spinner.succeed("emv file uploaded successfuly");

    const shareCode = `${code}.${encryptKey}`;

    // 8. print results
    console.log();
    console.log(chalk.green("✔ Your env is ready to share"));
    console.log();
    console.log(chalk.gray("Share code:  ") + chalk.bold.cyan(shareCode));
    console.log(
      chalk.gray("Expires in:  ") + chalk.yellow(`${options.ttl} hour(s)`),
    );
    console.log(
      chalk.gray("One-time:    ") + chalk.yellow(options.once ? "Yes" : "No"),
    );
    if (options.project) {
      console.log(chalk.gray("Project:     ") + chalk.yellow(options.project));
    }
    console.log();
    console.log(chalk.gray("Run this on the other machine:"));
    console.log(chalk.bold(`  envshare pull ${shareCode}`));
    console.log();
    console.log(
      chalk.red.bold("⚠  Keep this code safe — it contains the decryption key"),
    );
  } catch (error: any) {
    spinner.fail("Upload failed");
    console.log(chalk.red(`✖ ${error?.message}`));
    process.exit(1);
  }
}
