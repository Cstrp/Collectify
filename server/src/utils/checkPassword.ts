import bcrypt from "bcrypt";

const checkPassword = (v: string, h: string) => bcrypt.compareSync(v, h);

export { checkPassword };
