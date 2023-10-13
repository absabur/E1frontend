import axios from "axios";
import {
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCCESS,
  ADMIN_USER_FAILES,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILES,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILES,
  ADMIN_USERDETAILS_REQUEST,
  ADMIN_USERDETAILS_SUCCESS,
  ADMIN_USERDETAILS_FAILES,
} from "../../constance/admin/userConstant";
import { BackendUrl } from "../../BackendUrl";

export const allUsers = (token, page, limit, id, sort, name) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_REQUEST });
    const config = {
      headers: { access_token: `${token}` },
      withCredentials: true
    };
    const data = await axios.get(
      `${BackendUrl}/api/user/all-users?id=${id}&sort=${sort}&name=${name}`,
      config
    );
    dispatch({ type: ADMIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const userInfo = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USERDETAILS_REQUEST });
    const config = {
      headers: { access_token: `${token}` },
      withCredentials: true
    };
    const data = await axios.get(`${BackendUrl}/api/user/${id}`, config);
    dispatch({ type: ADMIN_USERDETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_USERDETAILS_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const deleteUser = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const config = {
      headers: { access_token: `${token}` },
      withCredentials: true
    };

    const { data } = await axios.delete(`${BackendUrl}/api/user/${id}`, config);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const updateUser = (token, id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        access_token: `${token}`,
      },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/user/${id}`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILES,
      payload: error.response.data.error,
    });
  }
};
