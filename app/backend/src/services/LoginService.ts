import TokenGenerator from '../utils/TokenGenerator';
import { Encrypter } from '../Interfaces/Encrypter';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/User/IUserModel';

export default class LoginService {
  constructor(
    private userModel: IUserModel,
    private encrypter: Encrypter,
  ) { }

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const isValid = await this.encrypter.compare(password, user.password);
    if (!isValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { username, id } = user;
    const token = TokenGenerator.generate({ email, username, id });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string): Promise<ServiceResponse<{ role: string }>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return {
        status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' },
      };
    }
    const { role } = user;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}
