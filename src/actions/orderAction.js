import axios from "axios";
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

    CLEARE_ERRORS
} from "../constance/orderContant"


export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
        `/api/order/new`,
        order,
        config
        );

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILES,
            payload: error.response.data.error,
        });
    }
}


export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/order/my-orders` );

        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAILES,
            payload: error.response.data.error,
        });
    }
}


export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_ORDER_REQUEST });

        const { data } = await axios.get(`/api/order/${id}` );
        dispatch({ type: SINGLE_ORDER_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: SINGLE_ORDER_FAILES,
            payload: error.response.data.error,
        });
    }
}

export const makePayment = ({id, way, status, transition}) => async (dispatch) => {
    try {
        dispatch({ type: PAYMENT_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };


        const { data } = await axios.put(`/api/order/update-payment/${id}`, {way, status, transition}, config );
        // console.log(data);
        dispatch({ type: PAYMENT_SUCCESS, payload: data });
    } catch (error) {
        console.log(error.response.data.error);
        dispatch({
            type: PAYMENT_FAILES,
            payload: error.response.data.error,
        });
    }
}



export const cancleOrder = (id, reason) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_ORDER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };


        const { data } = await axios.put(`/api/order/cancel/${id}`, {reason}, config );
        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
    } catch (error) {
        console.log(error.response.data.error);
        dispatch({
            type: CANCEL_ORDER_FAILES,
            payload: error.response.data.error,
        });
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEARE_ERRORS });
  };
  