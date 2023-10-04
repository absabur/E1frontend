import {
    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_SUCCESS,
    ADMIN_ORDER_FAILES,

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILES,
    DELETE_ORDER_RESET,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILES,
    UPDATE_ORDER_RESET,
} from "../../constance/admin/orderConstant"

export const allOrderReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case ADMIN_ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: action.payload.data.orders,
                amount: action.payload.data.totalAmount
            }
        case ADMIN_ORDER_FAILES:
            return{
                loading: false,
                error: action.payload
            }   
        default:
            return{
                ...state
            }
                
    }
}

export const adminOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_ORDER_REQUEST:
      case UPDATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_ORDER_FAILES:
      case UPDATE_ORDER_FAILES:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_ORDER_RESET:
        return {
          ...state,
          isDeleted: false,
          error: null
        };
      case UPDATE_ORDER_RESET:
        return {
          ...state,
          isUpdated: false,
          error: null,
        };

      default:
        return state;
    }
  };