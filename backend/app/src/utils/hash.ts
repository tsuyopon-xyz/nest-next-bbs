import { createHash } from 'crypto';
import * as bcrypt from 'bcrypt';

export const bcryptHashWithSHA256 = async (text: string) => {
  // JWTをbcryptでハッシュ化する際に、bcryptの72文字制限をクリアするために、sha256で64文字（32バイト）の長さにする
  const hash = createHash('sha256');
  const hashedText = hash.update(text).digest('hex');
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(hashedText, salt);
};

export const compareBcryptHashWithSHA256 = async (
  text: string,
  bcryptHashedText: string,
) => {
  // JWTをbcryptでハッシュ化する際に、bcryptの72文字制限をクリアするために、sha256で64文字（32バイト）の長さにする
  const hash = createHash('sha256');
  const hashedText = hash.update(text).digest('hex');

  return bcrypt.compare(hashedText, bcryptHashedText);
};
