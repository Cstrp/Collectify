import { compareSync } from 'bcrypt';

export const compare = (d: string, e: string) => compareSync(d, e);
