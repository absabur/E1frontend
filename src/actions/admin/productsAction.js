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
import {CATEGORY_GET_SUCCESS} from "../../constance/admin/categoryConstant"


export const getProductAdmin =
  ({
    page = 1,
    limit = 8,
    sort = "Newest Arrivals",
    id = "",
    name = ""
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
      const data = await axios.get(
        `/api/product/admin?limit=${limit}&page=${page}&sort=${sort}&id=${id}&name=${name}`
      );
      dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAILES,
        payload: error.response.data.error,
      });
    }
  };


  export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const {data} = await axios.post(`/api/product/new`, productData , config);
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAILES,
        payload: error.response.data.error,
      });
    }
  };

  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });

      const {data} = await axios.delete(`/api/product/${id}`);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAILES,
        payload: error.response.data.error,
      });
    }
  };


  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/product/${id}`,
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

  export const allCategory = () => async (dispatch) => {
    const { data } = await axios.get(`/api/category`);
    dispatch({
      type: CATEGORY_GET_SUCCESS,
      payload: data.categories,
    });
  }
 