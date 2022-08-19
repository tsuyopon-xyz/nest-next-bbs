import type { RefreshTokenResponse } from '../types';

// cookieに保存されているrefreshTokenを利用するため、requestBodyは無し
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const res = await fetch('http://localhost:8000/auth/refresh-token', {
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
