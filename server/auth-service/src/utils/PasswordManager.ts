import { compare, hash } from "bcrypt";

class PasswordManager {
  private SALT_ROUND = 13;
  async hashPassword(password: string) {
    const hashedpassword = await hash(password, this.SALT_ROUND);
    return hashedpassword;
  }

  async comparePassword(password: string, hash: string) {
    const isSame = await compare(password, hash);
    return isSame;
  }
}

export const passwordManager = new PasswordManager();
