import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILES,
  RESET_CART_STATE,
  CART_DELETE,
  ADD_ADDERSS_REQUEST,
  ADD_ADDERSS_SUCCESS,
  ADD_ADDERSS_FAILES,
  DELETE_ADDRESS
} from "../constance/cartConstant"

export const cartReducer = (
    state = {},
    action
  ) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
        case ADD_ADDERSS_REQUEST:
          return {
            ...state,
            isLoading: true,
            message: null,
          }
        case ADD_TO_CART_SUCCESS:
        case ADD_ADDERSS_SUCCESS:
        case CART_DELETE:
        case DELETE_ADDRESS:
          return {
            ...state,
            isLoading: false,
            message: action.payload,
            isError: null,
          }
        case ADD_TO_CART_FAILES:
        case ADD_ADDERSS_FAILES:
          return {
            ...state,
            isError: action.payload,
            isLoading: false,
            message: null,
          }
        case RESET_CART_STATE:
          return {
            ...state,
            message: null,
            isError: null,
          };
        default:
          return{
            ...state
          }
    }
  }