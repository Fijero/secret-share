"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKey = generateKey;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const ALGO = "aes-256-gcm";
// generate random encryption key
function generateKey() {
    return crypto_1.default.randomBytes(32).toString("hex");
}
function encrypt(content, key) {
    const keyBuffer = Buffer.from(key, "hex");
    const iv = crypto_1.default.randomBytes(12);
    const cipher = crypto_1.default.createCipheriv(ALGO, keyBuffer, iv);
    const encrypted = Buffer.concat([
        cipher.update(content, "utf8"),
        cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    //   combine iv, authtag, encrypte to single base 64 string
    return Buffer.concat([iv, authTag, encrypted]);
}
function decrypt(encoded, key) {
    const keyBuffer = Buffer.from(key, "hex");
    const buf = Buffer.from(encoded, "base64");
    const iv = buf.subarray(0, 12);
    const authTag = buf.subarray(12, 28);
    const encrypted = buf.subarray(28);
    const decipher = crypto_1.default.createDecipheriv(ALGO, keyBuffer, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
    ]);
    return decrypted.toString("utf8");
}
