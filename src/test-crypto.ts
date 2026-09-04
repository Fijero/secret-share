import { decrypt, encrypt, generateKey } from "./crypto";

const key = generateKey();
const original = "API_KEY=abc123\nDB_URL=postgres://localhost/mydb";

const encryptedStr: any = encrypt(original, key);
const decrypted = decrypt(encryptedStr, key);

console.log("Key:", key);
console.log("Encrypted:", encryptedStr);
console.log("Decrypted:", decrypted);
console.log("Match:", original === decrypted);
