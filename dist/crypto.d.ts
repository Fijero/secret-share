export declare function generateKey(): string;
export declare function encrypt(content: string, key: string): Buffer<ArrayBuffer>;
export declare function decrypt(encoded: string, key: string): string;
