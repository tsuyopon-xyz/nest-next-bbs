import type { SigninInput, SigninResponse } from '../types';

export const signin = async (input: SigninInput): Promise<SigninResponse> => {
  const res = await fetch('http://localhost:8000/auth/signin', {
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
