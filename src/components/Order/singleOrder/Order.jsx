import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../../actions/orderAction";
import LoadingPage from "../../layout/loading/LoadingPage";

import "./Order.css";
import GlobalState from "../../../GlobalState";
import MetaDeta from "../../layout/MetaDeta";

const Order = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const params = useParams();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
  }, [error]);

  return (
    <>
    <MetaDeta title="Confirm Order" />
      {loading ? (
        <LoadingPage />
      ) : JSON.stringify(order) !== "{}" && order ? (
        <div className="orderDetails">
          <div className="shipingInfo">
            <b>Shiping Details</b>
            <br />
            <b>Name: {user.name}</b>
            <br />
            <b>Number: {order.shippingInfo.phoneNo}</b>
            <br />
            <p style={{ opacity: "0.7" }}>
              Address:{" "}
              {`${order.shippingInfo.division}, ${order.shippingInfo.district}, ${order.shippingInfo.subDistrict}, ${order.shippingInfo.address}`}
            </p>
          </div>
          <h4 style={{ margin: "10px" }}>
            Status:{" "}
            <span
              style={
                order.orderStatus === "delivered"
                  ? { color: "green", fontStyle: "italic" }
                  : order.orderStatus === "canceled"
                  ? { color: "red", fontStyle: "italic" }
                  : { color: "var(--v1)" }
              }
              className="status"
            >
              {order.orderStatus === "delivered" ||
              order.orderStatus === "canceled" ? (
                <>{order.orderStatus.toUpperCase()}</>
              ) : (
                <>TO {order.orderStatus.toUpperCase()}</>
              )}
            </span>
          </h4>
          {order.reason ? (
            <p style={{ margin: "10px" }}>
              Cancellation Reason: {order.reason}
            </p>
          ) : null}
          <div className="orderCard">
            <strong>Order: {order._id}</strong>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ opacity: "0.7" }}>
                Placed on: {order.createdAt.slice(0, 10)}{" "}
                {order.createdAt.slice(11, 19)}
              </span>
              <span>. {order.paymentInfo.status}</span>
            </div>
            {order.orderItems.map((item) => (
              <div key={item._id} className="SingleProductCard">
                <Link to={`/product/${item.productId}`} className="img">
                  <img src={item.image} alt="" />
                </Link>
                <div className="productDetails">
                  <Link
                    to={`/product/${item.productId}`}
                    className="productName link"
                  >
                    {item.name}
                  </Link>
                  <b>
                    ৳{item.price} x{item.quantity}
                  </b>
                </div>
              </div>
            ))}
            {order.orderStatus === "topay" ? (
              <div className="buttons">
                <Link
                  to={`/order/payment/${order._id}`}
                  className="paynow v1button"
                >
                  Pay Now
                </Link>
              </div>
            ) : null}
          </div>
          <div className="calculation">
            <div className="subTotal">
              <span>Product total</span>
              <b>৳{order.itemsPrice}</b>
            </div>
            <div className="fee">
              <span>Deliery Fee</span>
              <b>৳{order.shippingFee}</b>
            </div>
            <hr />
            <div className="total">
              <span>Total</span>
              <b>৳{order.totalPrice}</b>
            </div>
            <div className="paidBy">
              <span></span>Payment method: {order.paymentInfo.way.toUpperCase()}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Order;
