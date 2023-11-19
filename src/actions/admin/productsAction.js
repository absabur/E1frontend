import axios from "axios";
import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAILES,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILES,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILES,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILES,
} from "../../constance/admin/productConstant";
import { CATEGORY_GET_SUCCESS } from "../../constance/admin/categoryConstant";
import { BackendUrl } from "../../BackendUrl";

export const getProductAdmin =
  (
    token,
    { page = 1, limit = 8, sort = "Newest Arrivals", id = "", name = "" }
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          access_token: `${token}`,
        },
        withCredentials: true
      };
      const data = await axios.get(
        `${BackendUrl}/api/product/admin?limit=${limit}&page=${page}&sort=${sort}&id=${id}&name=${name}`,
        config
      );
      const forCategory = {data: {products: []}}
      dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: {data, forCategory} });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAILES,
        payload: error.response.data.error,
      });
    }
  };

export const createProduct = (token, productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: `${token}`,
      },
      withCredentials: true
    };

    const { data } = await axios.post(
      `${BackendUrl}/api/product/new`,
      productData,
      config
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const deleteProduct = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const config = {
      headers: { access_token: `${token}` },
      withCredentials: true
    };

    const { data } = await axios.delete(
      `${BackendUrl}/api/product/${id}`,
      config
    );
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const updateProduct = (token, id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: `${token}`,
      },
      withCredentials: true
    };
    const { data } = await axios.put(
      `${BackendUrl}/api/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const allCategory = (token) => async (dispatch) => {
  const { data } = await axios.get(`${BackendUrl}/api/category`, {});
  dispatch({
    type: CATEGORY_GET_SUCCESS,
    payload: data.categories,
  });
};
