import * as bcrypt from 'bcryptjs';
import { Encrypter } from '../Interfaces/Encrypter';

export default class EncrypterService implements Encrypter {
  private bcrypt = bcrypt;

  async encrypt(password: string): Promise<string> {
    const hash = await this.bcrypt.hash(password, 10);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await this.bcrypt.compare(password, hash);

    return isValid;
  }
}
