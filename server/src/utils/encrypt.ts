import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(12);

const encrypt = (v: string) => bcrypt.hashSync(v, salt);

export { encrypt };
