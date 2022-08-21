import type { SigninInput, SigninResponse } from '../types';

export const signin = async (input: SigninInput): Promise<SigninResponse> => {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + 'auth/signin';
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data: SigninResponse = await res.json();

  return data;
};
