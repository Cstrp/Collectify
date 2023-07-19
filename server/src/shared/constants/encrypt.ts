import { genSaltSync, hashSync } from 'bcrypt';

const salt = genSaltSync(12);

export const encrypt = (v: string) => hashSync(v, salt);
