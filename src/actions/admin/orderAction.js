import axios from "axios";
import {
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  ADMIN_ORDER_FAILES,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILES,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILES,
} from "../../constance/admin/orderConstant";
import { BackendUrl } from "../../BackendUrl";

export const allOrders = (token, id, sort) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ORDER_REQUEST });
    const config = {
      withCredentials: true,
      headers: { Cookie: `access_token=${token};` },
    };
    const data = await axios.get(
      `${BackendUrl}/api/order/all-orders?id=${id}&sort=${sort}`,
      config
    );
    dispatch({ type: ADMIN_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const deleteOrder = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const config = {
      withCredentials: true,
      headers: { Cookie: `access_token=${token};` },
    };

    const { data } = await axios.delete(
      `${BackendUrl}/api/order/${id}`,
      config
    );
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const updateOrder = (token, id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token};`,
      },
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/order/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAILES,
      payload: error.response.data.error,
    });
  }
};
