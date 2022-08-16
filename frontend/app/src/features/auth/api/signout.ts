import type {
  SignoutInput,
  SignoutResponse,
  SignoutResponseError,
  SignoutResponseSuccess,
} from '../types';
import { StatusCodes } from 'http-status-codes';

export const signout = async (
  input: SignoutInput
): Promise<SignoutResponse> => {
  const res = await fetch('http://localhost:8000/auth/signout', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${input.refreshToken}`,
    },
    body: JSON.stringify(input),
  });

  if (res.status === StatusCodes.CREATED) {
    return undefined as SignoutResponseSuccess;
  }

  const data: SignoutResponseError = await res.json();

  return data;
};
