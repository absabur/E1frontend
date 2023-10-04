import {
  LOGIN_SUCCESS,
  LOGIN_FAILES,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILES,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILES,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILES,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAILES,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_RESET,
  CHANGE_PASSWORD_FAILES,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILES,
  FORGETE_PASSWORD_REQUEST,
  FORGETE_PASSWORD_SUCCESS,
  FORGETE_PASSWORD_FAILES,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILES,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILES,
  REQUEST_EMAIL_REQUEST,
  REQUEST_EMAIL_SUCCESS,
  REQUEST_EMAIL_FAILES,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILES,
  RESET_STATE,
  CLEARE_ERRORS,
} from "../constance/userConstant";

export const signInUpReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case AUTH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data.user,
        loading: false,
      };
    case LOGIN_FAILES:
    case REGISTER_FAILES:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case AUTH_USER_FAILES:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        errors: action.payload,
      };
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_USER_SUCCESS:
    case DELETE_ACCOUNT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_USER_FAILES:
    case DELETE_ACCOUNT_FAILES:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEARE_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case CHANGE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATE_PROFILE_FAILES:
    case CHANGE_PASSWORD_FAILES:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEARE_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const forgetePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGETE_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case VERIFY_EMAIL_REQUEST:
    case REQUEST_EMAIL_REQUEST:
    case CONFIRM_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGETE_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case VERIFY_EMAIL_SUCCESS:
    case REQUEST_EMAIL_SUCCESS:
    case CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case FORGETE_PASSWORD_FAILES:
    case RESET_PASSWORD_FAILES:
    case VERIFY_EMAIL_FAILES:
    case REQUEST_EMAIL_FAILES:
    case CONFIRM_EMAIL_FAILES:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_STATE:
      return {
        ...state,
        message: null,
      };
    case CLEARE_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
