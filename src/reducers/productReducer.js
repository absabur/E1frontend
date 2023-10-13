import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAILES,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILES,
  PRODUCT_DETAILS_RESET,
  CLEARE_ERRORS,
  REVIEW_REQUEST,
  REVIEW_SUCCESS,
  REVIEW_FAILES,
  REVIEW_RESET,
  ALL_PRODUCT_RESET,
} from "../constance/productConstant";

import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAILES,
} from "../constance/admin/productConstant"

export const productReducer = (
  state = { products: [], pagination: {} },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
        pagination: {},
      };
    case ALL_PRODUCT_SUCCESS:
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        pagination: action.payload.data.data.pagination,
        products: action.payload.data.data.products,
        productsForCategory: action.payload.forCategory.data.products
      };
    case ALL_PRODUCT_FAILES:
    case ADMIN_PRODUCT_FAILES:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_PRODUCT_RESET:
      return {
        loading: false,
        error: null, 
        products: [], 
        pagination: {}
      }
    case CLEARE_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };
    case PRODUCT_DETAILS_FAILES:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DETAILS_RESET:
      return {
        loading: null,
        error: null,
        product: null,
      }
    case CLEARE_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
      case REVIEW_REQUEST:
          return{
              isLoading: true,
              ...state,
          }
      case REVIEW_SUCCESS:
          return{
              isLoading: false,
              success: action.payload,
          }
      case REVIEW_FAILES:
          return{
              ...state,
              isLoading: false,
              isError: action.payload,
          }   
      case REVIEW_RESET:
          return{
              ...state,
              isError: null,
              success: null,
          }    
      default:
          return{
              ...state
          }
              
  }
}