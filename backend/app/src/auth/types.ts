export type JWTPayload = {
  sub: number; // jwtクレームの仕様に合わせて、識別子はsubで管理する。想定する値はuser.id
  name: string;
  email: string;
};

export type SigninResponse = {
  id: number;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
