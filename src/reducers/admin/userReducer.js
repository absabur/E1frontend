import {
    ADMIN_USER_REQUEST,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_FAILES,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILES,
    DELETE_USER_RESET,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILES,
    UPDATE_USER_RESET,

    ADMIN_USERDETAILS_REQUEST,
    ADMIN_USERDETAILS_SUCCESS,
    ADMIN_USERDETAILS_FAILES,
} from "../../constance/admin/userConstant"

export const allUserReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case ADMIN_USER_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case ADMIN_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                users: action.payload.data.users,
                pagination: action.payload.data.pagination,
            }
        case ADMIN_USER_FAILES:
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

export const singleUserReducer = (state = {user: {}}, action) => {
  switch (action.type) {
      case ADMIN_USERDETAILS_REQUEST:
          return{
              ...state,
              loading: true,
          }
      case ADMIN_USERDETAILS_SUCCESS:
          return{
              ...state,
              loading: false,
              user: action.payload.data.user,
          }
      case ADMIN_USERDETAILS_FAILES:
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

export const adminUserReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_USER_REQUEST:
      case UPDATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_USER_FAILES:
      case UPDATE_USER_FAILES:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_USER_RESET:
        return {
          ...state,
          isDeleted: false,
          error: null
        };
      case UPDATE_USER_RESET:
        return {
          ...state,
          isUpdated: false,
          error: null,
          message: null
        };

      default:
        return state;
    }
  };