import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILES,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILES,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILES,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILES,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILES,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILES,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILES,
  FORGETE_PASSWORD_REQUEST,
  FORGETE_PASSWORD_SUCCESS,
  FORGETE_PASSWORD_FAILES,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILES,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILES,
  REQUEST_EMAIL_REQUEST,
  REQUEST_EMAIL_SUCCESS,
  REQUEST_EMAIL_FAILES,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILES,
  CLEARE_ERRORS,
} from "../constance/userConstant";
import { BackendUrl } from "../BackendUrl";

export const login = (token, email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const data = await axios.post(
      `${BackendUrl}/api/user/login`,
      { email, password },
      config
    );
    console.log(`${BackendUrl}/api/user/login`);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const register = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    };

    const data = await axios.post(
      `${BackendUrl}/api/user/new`,
      userData,
      config
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const auth = (token) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_USER_REQUEST });
    const config = {
      headers: { access_token: `${token}` },
      withCredentials: true
    };
    const data = await axios.get(`${BackendUrl}/api/user/user-info`, config);
    dispatch({ type: AUTH_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AUTH_USER_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const logout = (token) => async (dispatch) => {
  try {console.log(token);
    const config = {
      headers: { access_token: `${token}` },
      withCredentials: true
    };
    await axios.post(`${BackendUrl}/api/user/logout`,{} , config);
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const updateProfile = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: `${token}`,
      },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/user/update-profile`,
      userData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const changePassword = (token, passwordData) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        access_token: `${token}`,
      },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/user/update-password`,
      passwordData,
      config
    );

    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const deleteAccount = (token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ACCOUNT_REQUEST });

    const config = {
      headers: { access_token: `${token}` },
      withCredentials: true
    };
    const { data } = await axios.delete(
      `${BackendUrl}/api/user/delete-profile`,
      config
    );

    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const forgotPassword = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: FORGETE_PASSWORD_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const { data } = await axios.post(
      `${BackendUrl}/api/user/forgot-password`,
      userData,
      config
    );

    dispatch({ type: FORGETE_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGETE_PASSWORD_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const resetPassword = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/user/reset-password`,
      userData,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const signUpVerify = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_EMAIL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const { data } = await axios.post(
      `${BackendUrl}/api/user/signup`,
      userData,
      config
    );

    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const verifyEmail = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_EMAIL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        access_token: `${token}`,
      },
      withCredentials: true
    };

    const { data } = await axios.post(
      `${BackendUrl}/api/user/update-email-requset`,
      userData,
      config
    );

    dispatch({ type: REQUEST_EMAIL_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: REQUEST_EMAIL_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const confirmEmail = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_EMAIL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/user/update-email`,
      userData,
      config
    );

    dispatch({ type: CONFIRM_EMAIL_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CONFIRM_EMAIL_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEARE_ERRORS });
};
