import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import type { AuthState, RefreshTokenResponse } from '../types';
import { refreshToken as _refreshToken } from '../api';
import { setHasTokensInCookie } from 'src/utils/localStorage';

export const refreshToken = createAsyncThunk<RefreshTokenResponse, void>(
  `auth/refresh-token`,
  async () => {
    return _refreshToken();
  }
);

export const buildRefreshTokenExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(refreshToken.pending, (state) => {
      state.signin.inProgress = true;
    })
    .addCase(refreshToken.fulfilled, (state, action) => {
      // 型ガードで SigninResponseSuccess / SigninResponseError を判断
      if ('id' in action.payload) {
        state.signin = {
          error: null,
          inProgress: false,
          ...action.payload,
        };
        setHasTokensInCookie(true);
      } else {
        state.signin = {
          error: action.payload,
          inProgress: false,
          id: null,
          name: null,
          email: null,
        };
        setHasTokensInCookie(false);
      }
    })
    .addCase(refreshToken.rejected, (state, action) => {
      const { message, code } = action.error;
      state.signin = {
        error: {
          message: message ?? '例外エラー',
          statusCode: code ? parseInt(code) : 0,
        },
        inProgress: false,
        id: null,
        name: null,
        email: null,
      };
      setHasTokensInCookie(false);
    });
};
