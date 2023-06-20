import { IUserModel } from '../Interfaces/User/IUserModel';
import IUser from '../Interfaces/User/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const userByEmail = await this.model.findOne({ where: { email } });

    if (!userByEmail) return null;
    const { role, id, username, password } = userByEmail;
    return { email, username, role, id, password };
  }
}
