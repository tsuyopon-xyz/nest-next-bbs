export type SigninInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

// "undefined" means "Success", Because Status code 201 does not have any data in the response body.
export type SignupResponseSuccess = undefined;
export type SignupResponseError = {
  error: string;
  message: string[] | string;
  statusCode: number;
};
export type SignupResponse = SignupResponseSuccess | SignupResponseError;
