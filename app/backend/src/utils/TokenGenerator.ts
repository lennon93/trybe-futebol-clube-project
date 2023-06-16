import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/User/IUser';

export default class TokenGenerator {
  private static secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';

  static generate(user: Partial<IUser>): string {
    const { email, username, id } = user;
    const token = jwt.sign({ email, username, id }, this.secret);
    return token;
  }

  static verify(token: string): Partial<IUser> | string {
    try {
      const data = jwt.verify(token, this.secret) as Partial<IUser>;
      return data;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
