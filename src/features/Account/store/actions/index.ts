import { userLogin, userRegister, googleLogin, userLogout, getMe, userUpdate } from '../../hooks';
import { types } from "../constants";
import { Dispatch } from 'redux';

// --- Define interfaces ---

interface Tokens {
  token: any;
  access: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

interface AuthResponse {
  tokens: Tokens;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// --- Action creators ---

const authRequest = (type: string) => ({
  type,
});

const authSuccess = (type: string, data?: any) => ({
  type,
  payload: data,
});

const authFailure = (type: string, error: any) => ({
  type,
  payload: error,
});

// --- Thunks ---

export const registerUser = (newUser: RegisterData) => {
  return async (dispatch: Dispatch) => {
    dispatch(authRequest(types.REGISTER_USER_REQUEST));
    try {
      const response = await userRegister(newUser) as { data: AuthResponse };
      const { tokens, user } = response.data;

      dispatch(authSuccess(types.REGISTER_USER_SUCCESS, { token: tokens.access, user }));
    } catch (err: any) {
      const match = err?.response?.data?.match(/Error: (.*?)<br>/);
      const errorMessage = match ? match[1] : "Registration failed";
      dispatch(authFailure(types.REGISTER_USER_FAILURE, errorMessage));
    }
  };
};

export const loginUser = (existingUser: LoginCredentials) => {
  return async (dispatch: Dispatch) => {
    dispatch(authRequest(types.LOGIN_USER_REQUEST));
    try {
      const response = await userLogin(existingUser) as { data: AuthResponse };
      const { tokens, user } = response.data;

      dispatch(authSuccess(types.LOGIN_USER_SUCCESS, { token: tokens.access, user }));
    } catch (err: any) {
      const match = err?.response?.data?.match(/Error: (.*?)<br>/);
      const errorMessage = match ? match[1] : "Login failed";
      dispatch(authFailure(types.LOGIN_USER_FAILURE, errorMessage));
    }
  };
};

export const updateUser = (userId: any, updatedUser: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(authRequest(types.UPDATE_USER_REQUEST));
    try {
      const response = await userUpdate(userId, updatedUser) as { data: any };
      const { user } = response.data;

      dispatch(authSuccess(types.UPDATE_USER_SUCCESS, { user }));
    } catch (err: any) {
      const match = err?.response?.data?.match(/Error: (.*?)<br>/);
      const errorMessage = match ? match[1] : "Update failed";
      dispatch(authFailure(types.UPDATE_USER_FAILURE, errorMessage));
    }
  };
};

export const googleAuth = (credential: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(authRequest(types.LOGIN_USER_REQUEST));
    try {
      const response = await googleLogin(credential) as { data: AuthResponse };
      const { tokens, user } = response.data;

      dispatch(authSuccess(types.LOGIN_USER_SUCCESS, { token: tokens.access, user }));
    } catch (err: any) {
      const match = err?.response?.data?.match(/Error: (.*?)<br>/);
      const errorMessage = match ? match[1] : "Google login failed";
      dispatch(authFailure(types.LOGIN_USER_FAILURE, errorMessage));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      await userLogout();
      dispatch(authSuccess(types.LOGOUT_USER_SUCCESS));
    } catch (err: any) {
      dispatch(authFailure(types.LOGOUT_USER_FAILURE, err));
    }
  };
};

export const getLoggedUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(authRequest(types.LOGIN_USER_REQUEST));
    try {
     
      const response = await getMe() as { data: { access: Tokens; user: User } };
      console.log(response)
      const { access, user } = response.data;

      dispatch(authSuccess(types.LOGIN_USER_SUCCESS, { token: access.token, user }));
    } catch (err: any) {
      const match = err?.response?.data?.match(/Error: (.*?)<br>/);
      const errorMessage = match ? match[1] : "Failed to fetch user";
      dispatch(authFailure(types.LOGIN_USER_FAILURE, errorMessage));
    }
  };
};
