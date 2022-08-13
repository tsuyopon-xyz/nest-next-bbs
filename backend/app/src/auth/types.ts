export type JWTPayload = {
  sub: number; // jwtクレームの仕様に合わせて、識別子はsubで管理する。想定する値はuser.id
  name: string;
  email: string;
};

export type SigninResponse = {
  name: string;
  email: string;
  accessToken: string;
};
