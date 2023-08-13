import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';

const saltOrRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const matchPassword = async ({ password, hash }) => {
  return await bcrypt.compare(password, hash);
};

export const generateJwtToken = async (user: User) => {
  return '';
};
