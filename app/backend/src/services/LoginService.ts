import { TokenGenerator } from '../Interfaces/TokenGenerator';
import { Encrypter } from '../Interfaces/Encrypter';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/User/IUserModel';

export default class LoginService {
  constructor(
    private userModel: IUserModel,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator,
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

    const token = this.tokenGenerator.generate(user);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
