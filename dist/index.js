"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSecret = isSecret;
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const commander = new commander_1.Command();
function isSecret(txt) {
    if (txt === "yoo") {
        console.log(chalk_1.default.green("yes sir sirr sir"));
    }
}
