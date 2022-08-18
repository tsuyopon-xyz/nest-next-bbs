export interface AuthState {
  signup: {
    inProgress: boolean;
    isSucceeded: boolean;
    error: SignupResponseError | null;
  };
  signin: {
    inProgress: boolean;
    error: SigninResponseError | null;
    id: number | null;
    accessToken: string | null;
    refreshToken: string | null;
    name: string | null;
    email: string | null;
  };
  signout: {
    inProgress: boolean;
    error: SignoutResponseError | null;
  };
}

export type SigninInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export type SignoutInput = {
  refreshToken: string;
};

// "undefined" means "Success", Because Status code 201 does not have any data in the response body.
export type SignupResponseSuccess = undefined;
export type SignupResponseError = {
  error: string;
  message: string[] | string;
  statusCode: number;
};
export type SignupResponse = SignupResponseSuccess | SignupResponseError;

export type SigninResponseSuccess = {
  accessToken: string;
  refreshToken: string;
  id: number;
  name: string;
  email: string;
};
export type SigninResponseError = {
  message: string;
  statusCode: number;
};
export type SigninResponse = SigninResponseSuccess | SigninResponseError;

export type SignoutResponseSuccess = undefined;
export type SignoutResponseError = {
  message: string;
  statusCode: number;
};
export type SignoutResponse = SignoutResponseSuccess | SignoutResponseError;
