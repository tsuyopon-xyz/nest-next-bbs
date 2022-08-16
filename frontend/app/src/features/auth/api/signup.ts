import type {
  SignupInput,
  SignupResponse,
  SignupResponseError,
  SignupResponseSuccess,
} from '../types';
import { StatusCodes } from 'http-status-codes';

export const signup = async (input: SignupInput): Promise<SignupResponse> => {
  try {
    const res = await fetch('http://localhost:8000/auth/signup', {
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
  } catch (error) {
    console.error('error : ', error);
  }
};
