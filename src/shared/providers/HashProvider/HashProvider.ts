import { hash, compare } from 'bcryptjs';
import { HashProviderProps } from './HashProviderProps';

export class HashProvider implements HashProviderProps {
  async hash(password: string): Promise<string> {
    return await hash(password, 8);
  }

  async compare(password: string, comparePassword: string): Promise<boolean> {
    return await compare(password, comparePassword);
  }
}
