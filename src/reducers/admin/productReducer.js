import {
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILES,
    CREATE_PRODUCT_RESET,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILES,
    DELETE_PRODUCT_RESET,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILES,
    UPDATE_PRODUCT_RESET,
} from "../../constance/admin/productConstant"

import {CATEGORY_GET_SUCCESS} from "../../constance/admin/categoryConstant"

export const createProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return{
                loading: true,
                ...state,
            }
        case CREATE_PRODUCT_SUCCESS:
            return{
                loading: false,
                product: action.payload.product,
                success: action.payload.success,
            }
        case CREATE_PRODUCT_FAILES:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }  
        case CREATE_PRODUCT_RESET:
            return{
                loading: false,
                error: null,
                success: null,
                product: null
            }   
        default:
            return{
                ...state
            }
                
    }
  }


  export const adminProductReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_PRODUCT_FAILES:
      case UPDATE_PRODUCT_FAILES:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_PRODUCT_RESET:
        return {
          ...state,
          isDeleted: false,
          error: null
        };
      case UPDATE_PRODUCT_RESET:
        return {
          ...state,
          isUpdated: false,
          error: null,
        };

      default:
        return state;
    }
  };


  export const categoryReducer = (state = { category: [] }, action) => {
    switch (action.type) {
      case CATEGORY_GET_SUCCESS:
        return{
          categories: action.payload
        }
      default:
          return{
              ...state
          }
              
    }
  }