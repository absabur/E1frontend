import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import LoadingPage from "../layout/loading/LoadingPage";
import { clearErrors } from "../../actions/productAction";
import { getOrderDetails } from "../../actions/orderAction";
import { updateOrder } from "../../actions/admin/orderAction";
import { UPDATE_ORDER_RESET } from "../../constance/admin/orderConstant";
import GlobalState from "../../GlobalState";
import MetaDeta from "../layout/MetaDeta";

const Order = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const params = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const {
    isUpdated,
    error: updateError,
    loading: isLoading,
  } = useSelector((state) => state.adminOrderUD);

  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(getOrderDetails(token, params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("access_token_abs_ecommerce");
    if (error) {
      setErr(error);

      dispatch(clearErrors());
    }
    if (updateError) {
      setErr(updateError);
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    if (isUpdated) {
      setMsg("Order Updated successfully.");
      dispatch({ type: UPDATE_ORDER_RESET });

      dispatch(getOrderDetails(token, params.id));
    }
  }, [error, isUpdated, updateError, order]);

  const handleChange = (e) => {
    e.preventDefault();

    dispatch(updateOrder(token, params.id, { status, reason }));
  };
  return (
    <>
      <MetaDeta title="Change Order Status" />
      {loading || isLoading ? (
        <LoadingPage />
      ) : JSON.stringify(order) !== "{}" && order ? (
        <div className="orderDetails">
          <div className="shipingInfo">
            <b style={{ textAlign: "center", fontSize: "20px" }}>
              Shiping Details
            </b>
            <br />
            <b>Name: {order.shippingInfo.name && order.shippingInfo.name}</b>
            <br />
            <b>Email: {order.shippingInfo && order.shippingInfo.email}</b>
            <br />
            <b>Number: {order.shippingInfo && order.shippingInfo.phoneNo}</b>
            <br />
            <p style={{ opacity: "0.7" }}>
              Address:{" "}
              {order.shippingInfo &&
                `${order.shippingInfo.division}, ${order.shippingInfo.district}, ${order.shippingInfo.subDistrict}, ${order.shippingInfo.address}`}
            </p>
          </div>
          <div className="paymentDetails">
            <p>Payment Status: {order.paymentInfo.status.toUpperCase()}</p>
            <p>Payment Method: {order.paymentInfo.way.toUpperCase()}</p>
            {order.paymentInfo.transition ? (
              <p>Transition: {order.paymentInfo.transition}</p>
            ) : null}
          </div>

          <h4>
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
              {order.orderStatus === "pay" ||
              order.orderStatus === "receive" ? (
                <>TO {order.orderStatus.toUpperCase()}</>
              ) : (
                <>{order.orderStatus.toUpperCase()}</>
              )}
            </span>
          </h4>
          {order.reason ? (
            <p style={{ margin: "10px" }}>
              Cancellation Reason: {order.reason}
            </p>
          ) : null}

          {order.orderStatus === "delivered" ||
          order.orderStatus === "canceled" ? null : (
            <form onSubmit={handleChange} className="updateForm">
              <h2>Change Status</h2>
              <div
                style={{
                  width: "100%",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="reason">Cancelation Reason: </label>
                <select
                  style={{ width: "100%", margin: "10px 0" }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Choose Status</option>
                  {order.orderStatus === "receive" ||
                  order.orderStatus === "shipping" ? null : (
                    <option value="shipping">Shipping</option>
                  )}
                  {order.orderStatus === "receive" ? null : (
                    <option value="receive">To Receive</option>
                  )}
                  <option value="delivered">Delevered</option>
                  <option value="canceled">Cancel</option>
                </select>
              </div>
              <div
                style={{
                  width: "100%",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="reason">Cancelation Reason: </label>
                <input
                  style={{
                    width: "100%",
                    margin: "10px 0",
                    padding: "10px",
                    fontSize: "17px",
                  }}
                  placeholder="Reason"
                  id="reason"
                  name="reason"
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={status === "canceled" ? false : true}
                  required={status === "canceled" ? true : false}
                />
              </div>
              <button
                type="submit"
                className="v1button"
                style={{ padding: "10px", fontSize: "17px", fontWeight: "500" }}
              >
                Change
              </button>
            </form>
          )}

          <div className="orderCard">
            <strong>Order: {order._id}</strong>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ opacity: "0.7" }}>
                Placed on:{" "}
                {order.paidAt ? order.paidAt.date+", "+order.paidAt.formatedTime : "Not placed yet"}
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Order;
