import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILES,
    
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAILES,

    SINGLE_ORDER_REQUEST,
    SINGLE_ORDER_SUCCESS,
    SINGLE_ORDER_FAILES,

    PAYMENT_REQUEST,
    PAYMENT_SUCCESS,
    PAYMENT_FAILES,

    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILES,
    CANCEL_ORDER_RESET,

    CLEARE_ERRORS
} from "../constance/orderContant"


export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case CREATE_ORDER_SUCCESS:
            return{
                loading: false,
                newOrder: action.payload.order,
                status: action.payload.message,
            }
        case CREATE_ORDER_FAILES:
            return{
                loading: false,
                error: action.payload
            }   
        case CLEARE_ERRORS:
            return{
                ...state,
                error: null,
                status: null,
                newOrder: null,
            }    
        default:
            return{
                ...state
            }
                
    }
}



export const myOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return{
                loading: true,
            }
        case     MY_ORDERS_SUCCESS:
            return{
                loading: false,
                orders: action.payload,
            }
        case MY_ORDERS_FAILES:
            return{
                loading: false,
                error: action.payload
            }   
        case CLEARE_ERRORS:
            return{
                ...state,
                error: null,
            }    
        default:
            return{
                ...state
            }
                
    }
}



export const orderDetailsReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case SINGLE_ORDER_REQUEST:
            return{
                loading: true,
            }
        case SINGLE_ORDER_SUCCESS:
            return{
                loading: false,
                order: action.payload,
            }
        case SINGLE_ORDER_FAILES:
            return{
                loading: false,
                error: action.payload
            }   
        case CLEARE_ERRORS:
            return{
                ...state,
                error: null,
            }    
        default:
            return{
                ...state
            }
                
    }
}



export const paymentReducer = (state = {}, action) => {
    switch (action.type) {
        case PAYMENT_REQUEST:
            return{
                isLoading: true,
            }
        case PAYMENT_SUCCESS:
            return{
                isLoading: false,
                success: true
            }
        case PAYMENT_FAILES:
            return{
                isLoading: false,
                isError: action.payload,
            }   
        case CLEARE_ERRORS:
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



export const cancelReducer = (state = {}, action) => {
    switch (action.type) {
        case CANCEL_ORDER_REQUEST:
            return{
                isLoading: true,
            }
        case CANCEL_ORDER_SUCCESS:
            return{
                isLoading: false,
                success: true
            }
        case CANCEL_ORDER_FAILES:
            return{
                isLoading: false,
                isError: action.payload,
            }   
        case CANCEL_ORDER_RESET:
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