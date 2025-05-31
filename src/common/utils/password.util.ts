export class PasswordUtil {
  static generateRandomPassword(length: number): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  static generateAlphaNumericPassword(passwordLength: number): string {
    let password = '';
    while (password.length < passwordLength) {
      password = PasswordUtil.generateRandomPassword(passwordLength);
    }
    return password;
  }
}
