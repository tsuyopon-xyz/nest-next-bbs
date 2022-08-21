import type { RefreshTokenResponse } from '../types';

// cookieに保存されているrefreshTokenを利用するため、requestBodyは無し
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + 'auth/refresh-token';
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: RefreshTokenResponse = await res.json();

  return data;
};
