import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAILES,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILES,
  REVIEW_REQUEST,
  REVIEW_SUCCESS,
  REVIEW_FAILES,
  CLEARE_ERRORS,
} from "../constance/productConstant";
import { BackendUrl } from "../BackendUrl";

export const getProduct =
  (
    token,
    search = "",
    page = 1,
    limit = 30,
    minPrice = 0,
    maxPrice = 1000000,
    cate = "",
    sort = "Top Sales"
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      const data = await axios.get(
        `${BackendUrl}/api/product?search=${search}&limit=${limit}&page=${page}&lte=${maxPrice}&gte=${minPrice}&category=${cate}&sort=${sort}`
      );
      const forCategory = await axios.get(
        `${BackendUrl}/api/product?search=${search}&limit=${Infinity}&page=${page}&lte=${maxPrice}&gte=${minPrice}&category=${cate}&sort=${sort}`
        );
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: {data, forCategory} });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAILES,
        payload: error.response.data.error,
      });
    }
  };

export const getProductDetails = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const data = await axios.get(`${BackendUrl}/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const reviewProduct = (token, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        access_token: `${token}`,
      },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${BackendUrl}/api/product/create-review`,
      reviewData,
      config
    );
    dispatch({ type: REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: REVIEW_FAILES,
      payload: error.response.data.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEARE_ERRORS });
};
