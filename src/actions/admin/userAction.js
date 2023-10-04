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

export const allUsers = (page, limit, id, sort) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USER_REQUEST });
        const data = await axios.get(
            `/api/user/all-users?id=${id}&sort=${sort}`,
        );
        dispatch({ type: ADMIN_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADMIN_USER_FAILES,
        payload: error.response.data.error,
      });
    }
  };

  export const userInfo = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USERDETAILS_REQUEST });
        const data = await axios.get(
            `/api/user/${id}`,
        );
        dispatch({ type: ADMIN_USERDETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADMIN_USERDETAILS_FAILES,
        payload: error.response.data.error,
      });
    }
  };

  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });

      const {data} = await axios.delete(`/api/user/${id}`);
      dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAILES,
        payload: error.response.data.error,
      });
    }
  };


  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/user/${id}`,
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