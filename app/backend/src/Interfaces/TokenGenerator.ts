import IUser from './User/IUser';

export interface TokenGenerator {
  generate(user: IUser): string
}
