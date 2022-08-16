import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from './types';
import { signup, buildSignupExtraReducer } from './reducers/signup';
import { signin, buildSigninExtraReducer } from './reducers/signin';
import { signout, buildSignoutExtraReducer } from './reducers/signout';

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

export { signup, signin, signout };
export default authSlice.reducer;
