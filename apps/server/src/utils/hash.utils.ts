const bcrypt = require("bcrypt");
const salt_key = 10;

export const HashPassword = async (password: string) => {
  return await bcrypt.hash(password, salt_key);
};

export const ComparePasswordWithHash = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
