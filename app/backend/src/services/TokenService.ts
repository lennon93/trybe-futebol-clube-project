import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/User/IUser';
import { TokenGenerator } from '../Interfaces/TokenGenerator';

export default class TokenService implements TokenGenerator {
  private jwt = jwt;

  generate(user: IUser): string {
    const token = this.jwt.sign({ id: user.id }, 'jwt_secret');
    return token;
  }
}
