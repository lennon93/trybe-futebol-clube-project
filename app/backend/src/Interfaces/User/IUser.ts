import { Identifiable } from '..';

export default interface IUser extends Identifiable {
  username: string,
  role: string,
  email: string,
  password: string,
}
