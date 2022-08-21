import type {
  SignoutResponse,
  SignoutResponseError,
  SignoutResponseSuccess,
} from '../types';
import { StatusCodes } from 'http-status-codes';

// cookieに保持しているrefresh_tokenを利用するためにrequestBodyは無し
export const signout = async (): Promise<SignoutResponse> => {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + 'auth/signout';
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  });

  if (res.status === StatusCodes.OK) {
    return undefined as SignoutResponseSuccess;
  }

  const data: SignoutResponseError = await res.json();

  return data;
};
