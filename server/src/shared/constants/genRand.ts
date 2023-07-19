import { randomBytes } from 'crypto';
import { encrypt } from './encrypt';

export const genRand = (type: 'email' | 'password'): string => {
  switch (type) {
    case 'email':
      const domain = 'example.com';
      const randPrefix = randomBytes(3).toString('hex');
      return `${randPrefix}@${domain}`;

    case 'password':
      const len = Math.floor(Math.random() * 42);
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let pass = '';
      for (let i = 0; i < len; i++) {
        const randIdx = Math.floor(Math.random() * chars.length);
        pass += chars[randIdx];
      }
      return encrypt(pass);

    default:
      throw new Error(`Invalid type: ${type}`);
  }
};
