import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  SignupResponseSuccess,
  SignupResponseError,
  SignupResponse,
  SignupInput,
} from './types';
import { signup as _signup } from './api/signup';

export interface AuthState {
  signup: {
    inProgress: boolean;
    isSucceeded: boolean;
    error: null | SignupResponseError;
  };
  signin: {
    accessToken: string | null;
    refreshToken: string | null;
    name: string | null;
    email: string | null;
  };
}

const initialState: AuthState = {
  signin: {
    accessToken: null,
    refreshToken: null,
    name: null,
    email: null,
  },
  signup: {
    inProgress: false,
    isSucceeded: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    buildSignupExtraReducer(builder);
  },
});

export const signup = createAsyncThunk<SignupResponse, SignupInput>(
  `${authSlice.name}/signup`,
  async (input) => {
    return _signup(input);
  }
);

export default authSlice.reducer;

// createSlice内のextraReducerが長くなるため、createAsyncThunkの機能別にextraReducer処理を分ける

const buildSignupExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signup.pending, (state) => {
      state.signup.inProgress = true;
    })
    .addCase(signup.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.signup.error = action.payload;
        state.signup.isSucceeded = false;
      } else {
        state.signup.error = null;
        state.signup.isSucceeded = true;
      }

      state.signup.inProgress = false;
    })
    .addCase(signup.rejected, (state, action) => {
      const { name, message, code } = action.error;
      state.signup.isSucceeded = true;
      state.signup.inProgress = false;
      state.signup.error = {
        error: name ?? '例外エラー',
        message: message ?? '例外エラー',
        statusCode: code ? parseInt(code) : 0,
      };
    });
};
