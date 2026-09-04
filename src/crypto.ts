import crypto from "crypto";

const ALGO = "aes-256-gcm";

// generate random encryption key
export function generateKey(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function encrypt(content: string, key: string) {
  const keyBuffer = Buffer.from(key, "hex");

  const iv = crypto.randomBytes(12);
  console.log(`this is IV ${iv.toString()}`)
  const cipher = crypto.createCipheriv(ALGO, keyBuffer, iv);

  const encrypted = Buffer.concat([
    cipher.update(content, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  //   combine iv, authtag, encrypte to single base 64 string
  return Buffer.concat([iv, authTag, encrypted]);
}

export function decrypt(encoded: string, key: string): string {
  const keyBuffer = Buffer.from(key, "hex");
  const buf = Buffer.from(encoded, "base64");

  const iv = buf.subarray(0, 12);
  const authTag = buf.subarray(12, 28);
  const encrypted = buf.subarray(28);

  const decipher = crypto.createDecipheriv(ALGO, keyBuffer, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
