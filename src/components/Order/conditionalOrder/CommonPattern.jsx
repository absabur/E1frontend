import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancleOrder,
  clearErrors,
  myOrders,
} from "../../../actions/orderAction";

import LoadingPage from "../../layout/loading/LoadingPage";
import "../allOrders/MyOrders.css";
import { Link, useNavigate } from "react-router-dom";
import OrdersHeading from "../allOrders/OrdersHeading";
import GlobalState from "../../../GlobalState";
import { CANCEL_ORDER_RESET } from "../../../constance/orderContant";
import MetaDeta from "../../layout/MetaDeta";

const CommonPattern = ({ orderStatus, head }) => {
  const { setErr, setMsg } = useContext(GlobalState);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  const navigate = useNavigate();
  const { orders, error, loading } = useSelector((state) => state.myOrders);
  const { success, isError, isLoading } = useSelector(
    (state) => state.cancelOrder
  );
  const [emptyOrder, setEmptyOrder] = useState(false);
  useEffect(() => {
    dispatch(myOrders(token));
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (isError) {
      setErr(isError);
      dispatch({ type: CANCEL_ORDER_RESET });
    }
    if (success) {
      setMsg("Order Canceled");
      dispatch({ type: CANCEL_ORDER_RESET });
      navigate("/profile");
    }
  }, [error, dispatch, isError, success]);

  useEffect(() => {
    setEmptyOrder(false);
    let isEmpty = 0;
    if (orders) {
      orders.map((order) => {
        if (order.orderStatus === orderStatus) {
          isEmpty += 1;
        }
      });
    }
    if (isEmpty === 0) {
      setEmptyOrder(true);
    }
  }, [orders]);
  const [cancleDiv, setCancleDiv] = useState("");
  const [reason, setReason] = useState("");

  const handleCancel = (id) => {
    setCancleDiv(id);
  };

  const handleSubmit = () => {
    if (reason) {
      dispatch(cancleOrder(token, cancleDiv, reason));
      setCancleDiv("");
      setReason("")
    }
    else{
      setErr("Select Reason")
    }
  };

  return (
    <div style={{width: "100%", position: "relative", }}>
      {
        cancleDiv ? <div onClick={()=> setCancleDiv("")} style={{position: "absolute", width: "100%", height: "100%",backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "11"}}></div> : null
      }
      <div className="allOrders">
        <MetaDeta title="Pending Orders" />
        {head === "Canceled" ? null: <OrdersHeading />}
  
        <h2 className="myOrderHead">My Orders {head === "Pay" || head === "Receive" ? "To "+head: head}</h2>
  
        {loading || isLoading ? (
          <LoadingPage />
        ) : (
          <>
            {emptyOrder === true ? (
              <div className="noOrder">
                <h1>No Order</h1>
              </div>
            ) : null}
            {orders &&
              orders.toReversed().map((order) =>
                order.orderStatus === orderStatus ? (
                  <Link to={cancleDiv? `` :`/order/${order._id}`} className="orderCard">
                    {cancleDiv == order._id ? (
                      <div id="cancel" className="cancelDiv">
                        <p>Order Id: {cancleDiv}</p>
                        <form onSubmit={handleSubmit}>
                          <select
                            required
                            onChange={(e) => setReason(e.target.value)}
                          >
                            <option value="">Select Reason</option>
                            <option value="Unexpected Order">
                              Unexpected Order
                            </option>
                            <option value="Change of Mind">Change of Mind</option>
                            <option value="Duplicate Order">
                              Duplicate Order
                            </option>
                            <option value="Change Payment Method">
                              Change Payment Method
                            </option>
                          </select>
                          <div className="cancelButtons">
                            <button
                              onClick={() => setCancleDiv("")}
                              type="reset"
                              style={{
                                fontSize: "16px",
                                padding: "10px",
                                border: "1px solid var(--black)",
                                cursor: "pointer",
                              }}
                            >
                              Undo
                            </button>
                            <button
                              onClick={handleSubmit}
                              type="submit"
                              className="v1button"
                              style={{ fontSize: "16px", padding: "10px" }}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}
                    <strong
                    >
                      Order: {order._id}
                    </strong>
                    <br />
                    <div
                      style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <span>
                        Placed on: {order.createdAt.slice(0, 10)}{" "}
                        {order.createdAt.slice(11, 19)}
                      </span>
                      <span>. {order.paymentInfo.status}</span>
                    </div>
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="SingleProductCard">
                        <div className="img">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="productDetails">
                          <p className="productName">
                            {item.name.slice(0, 32)}
                            {item.name.slice(31, -1) ? "..." : ""}
                          </p>
                          <b>
                            ৳{item.price} x{item.quantity}
                          </b>
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
                          {order.orderStatus === "delivered" ? (
                            <div
                              className="buttons"
                              style={{ marginBottom: "1rem" }}
                            >
                              <Link
                                to={`/order/review/${order._id}${item.productId}`}
                                className="paynow v1button"
                              >
                                Review
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                    <h3 className="orderFoot">
                      {order.orderItems.length} item, Total price: ৳
                      {order.totalPrice}
                    </h3>
                    <div className="buttons">
                      {order.orderStatus === "pay" ? (
                        <Link
                          to={`/order/payment/${order._id}`}
                          className="paynow v1button"
                        >
                          Pay Now
                        </Link>
                      ) : null}
                      {order.orderStatus === "pay" ||
                      order.orderStatus === "processing" ? (
                        <Link
                          to="#cancel"
                          onClick={() => handleCancel(order._id)}
                          style={{
                            padding: "10px",
                            fontSize: "16px",
                            boxShadow: "0 0 5px var(--black)",
                            color: "var(--black)",
                            textDecoration: "none",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          Cancle
                        </Link>
                      ) : null}
                    </div>
                  </Link>
                ) : null
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommonPattern;
