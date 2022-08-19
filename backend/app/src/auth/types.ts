export type JWTPayload = {
  sub: number; // jwtクレームの仕様に合わせて、識別子はsubで管理する。想定する値はuser.id
  name: string;
  email: string;
};

export type SigninServiceResult = {
  id: number;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};
export type RefreshTokenServiceResult = SigninServiceResult;

export type SigninResponse = Pick<SigninServiceResult, 'id' | 'name' | 'email'>;
export type RefreshTokenResponse = SigninResponse;

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
