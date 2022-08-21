import type {
  SignupInput,
  SignupResponse,
  SignupResponseError,
  SignupResponseSuccess,
} from '../types';
import { StatusCodes } from 'http-status-codes';

export const signup = async (input: SignupInput): Promise<SignupResponse> => {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + 'auth/signup';
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (res.status === StatusCodes.CREATED) {
    return undefined as SignupResponseSuccess;
  }

  const errorData: SignupResponseError = await res.json();

  return errorData;
};
