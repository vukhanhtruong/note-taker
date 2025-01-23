export class CryptoService {
  static generateSalt(length: number = 16): string {
    const randomBytes = new Uint8Array(length);
    crypto.getRandomValues(randomBytes);

    return Array.from(randomBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password + salt);

    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  }
  static async comparePasswords(
    inputPassword: string,
    hashedPassword: string,
    salt: string,
  ): Promise<boolean> {
    const inputHash = await CryptoService.hashPassword(inputPassword, salt);
    return inputHash === hashedPassword;
  }
}
