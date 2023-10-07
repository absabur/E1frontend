import axios from "axios";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILES,
  CART_DELETE,
  ADD_ADDERSS_REQUEST,
  ADD_ADDERSS_SUCCESS,
  ADD_ADDERSS_FAILES,
  DELETE_ADDRESS,
} from "../constance/cartConstant";
import { BackendUrl } from "../BackendUrl";

export const addToCart = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json", access_token: `${token}`, },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/user/add-cart`,
      userData,
      config
    );

    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const deleteCart =
  (token, { productId }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json", access_token: `${token}`, },
      withCredentials: true
    };
    const { data } = await axios.put(
      `${BackendUrl}/api/user/delete-cart`,
      { productId },
      config
    );

    dispatch({ type: CART_DELETE, payload: data.message });
  };

export const addressAdd = (token, userData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ADDERSS_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json", access_token: `${token}`, },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/user/add-address`,
      userData,
      config
    );

    dispatch({ type: ADD_ADDERSS_SUCCESS, payload: data.message });
    console.log(data.message);
  } catch (error) {
    dispatch({
      type: ADD_ADDERSS_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const deleteAddress = (token) => async (dispatch) => {
  const config = {
    headers: { access_token: `${token}`, },
    withCredentials: true
  };
  const { data } = await axios.put(
    `${BackendUrl}/api/user/delete-address`,config);

  dispatch({ type: DELETE_ADDRESS, payload: data.message });
};
