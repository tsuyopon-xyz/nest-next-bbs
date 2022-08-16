import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import type {
  SignupResponseError,
  SignupResponse,
  SignupInput,
  SigninResponseError,
  SigninResponse,
  SigninInput,
  SignoutResponse,
  SignoutResponseError,
} from './types';
import {
  signup as _signup,
  signin as _signin,
  signout as _signout,
} from './api';

export interface AuthState {
  signup: {
    inProgress: boolean;
    isSucceeded: boolean;
    error: SignupResponseError | null;
  };
  signin: {
    inProgress: boolean;
    error: SigninResponseError | null;
    accessToken: string | null;
    refreshToken: string | null;
    name: string | null;
    email: string | null;
  };
  signout: {
    inProgress: boolean;
    error: SignoutResponseError | null;
  };
}

const initialState: AuthState = {
  signin: {
    inProgress: false,
    error: null,
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
  signout: {
    inProgress: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    buildSignupExtraReducer(builder);
    buildSigninExtraReducer(builder);
    buildSignoutExtraReducer(builder);
  },
});

export const signup = createAsyncThunk<SignupResponse, SignupInput>(
  `${authSlice.name}/signup`,
  async (input) => {
    return _signup(input);
  }
);

export const signin = createAsyncThunk<SigninResponse, SigninInput>(
  `${authSlice.name}/signin`,
  async (input) => {
    return _signin(input);
  }
);

export const signout = createAsyncThunk<
  SignoutResponse,
  undefined,
  {
    state: {
      auth: AuthState;
    };
  }
>(`${authSlice.name}/signout`, async (_, thunkAPI) => {
  const refreshToken = thunkAPI.getState().auth.signin.refreshToken;

  if (!refreshToken) {
    throw new Error('ログインしていません');
  }

  return _signout({ refreshToken });
});

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

const buildSigninExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signin.pending, (state) => {
      state.signin.inProgress = true;
    })
    .addCase(signin.fulfilled, (state, action) => {
      // 型ガードで SigninResponseSuccess / SigninResponseError を判断
      if ('accessToken' in action.payload) {
        state.signin = {
          error: null,
          inProgress: false,
          ...action.payload,
        };
      } else {
        state.signin = {
          error: action.payload,
          inProgress: false,
          accessToken: null,
          refreshToken: null,
          name: null,
          email: null,
        };
      }
    })
    .addCase(signin.rejected, (state, action) => {
      const { message, code } = action.error;
      state.signin = {
        error: {
          message: message ?? '例外エラー',
          statusCode: code ? parseInt(code) : 0,
        },
        inProgress: false,
        accessToken: null,
        refreshToken: null,
        name: null,
        email: null,
      };
    });
};

const buildSignoutExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signout.pending, (state) => {
      state.signout.inProgress = true;
    })
    .addCase(signout.fulfilled, (state, action) => {
      if (action.payload?.message) {
        state.signout.error = action.payload;
      } else {
        state.signin = {
          ...state.signin,
          accessToken: null,
          refreshToken: null,
          email: null,
          name: null,
        };
      }
      state.signout.inProgress = false;
    })
    .addCase(signout.rejected, (state, action) => {
      const { message, code } = action.error;
      state.signout = {
        inProgress: false,
        error: {
          message: message ?? '例外エラー',
          statusCode: code ? parseInt(code) : 0,
        },
      };
    });
};
