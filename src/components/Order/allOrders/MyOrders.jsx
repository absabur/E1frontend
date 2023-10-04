import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancleOrder,
  clearErrors,
  myOrders,
} from "../../../actions/orderAction";
import LoadingPage from "../../layout/loading/LoadingPage";
import "./MyOrders.css";
import { Link, useNavigate } from "react-router-dom";
import OrdersHeading from "./OrdersHeading";
import GlobalState from "../../../GlobalState";
import { CANCEL_ORDER_RESET } from "../../../constance/orderContant";
import MetaDeta from "../../layout/MetaDeta";

const MyOrders = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, error, loading } = useSelector((state) => state.myOrders);

  const { success, isError, isLoading } = useSelector(
    (state) => state.cancelOrder
  );
  useEffect(() => {
    dispatch(myOrders());
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
  }, [error, isError, success]);

  const [cancleDiv, setCancleDiv] = useState(false);
  const [cancleId, setCancelId] = useState("");
  const [reason, setReason] = useState("");

  const handleCancel = (id) => {
    setCancleDiv(true);
    setCancelId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(cancleOrder(cancleId, reason));
    setCancleDiv(false);
  };

  return (
    <div className="allOrders">
      <MetaDeta title="My Orders" />
      {cancleDiv ? (
        <div id="cancel" className="cancelDiv">
          <p>Order Id: {cancleId}</p>
          <form onSubmit={handleSubmit}>
            <select required onChange={(e) => setReason(e.target.value)}>
              <option value="">Choose</option>
              <option value="Unexpected Order">Unexpected Order</option>
              <option value="Change of Mind">Change of Mind</option>
              <option value="Duplicate Order">Duplicate Order</option>
              <option value="Change Payment Method">
                Change Payment Method
              </option>
            </select>
            <div className="cancelButtons">
              <button
                onClick={() => setCancleDiv(false)}
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
      <OrdersHeading />

      <h2 className="myOrderHead">My Orders</h2>
      {orders && orders[0] ? null : (
        <div className="noOrder">
          <h1>No Order</h1>
        </div>
      )}
      {loading ? (
        <LoadingPage />
      ) : (
        orders &&
        orders.toReversed().map((order) => (
          <Link
            to={`/order/${order._id}`}
            key={order._id}
            className="orderCard"
          >
            <strong>Order: {order._id}</strong>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                  <p className="productName">{item.name}</p>
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

                  {item.review === "done" ? (
                    <div
                      className="buttons reviewButton"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Link
                        to={`/order/review/${order._id}${item.productId}`}
                        className="paynow v1button"
                      >
                        Change Review
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            <h3 className="orderFoot">
              {order.orderItems.length} item, Total price: ৳{order.totalPrice}
            </h3>
            <div className="buttons">
              {order.orderStatus === "pay" ? (
                <Link
                  className="paynow v1button"
                  to={`/order/payment/${order._id}`}
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
        ))
      )}
    </div>
  );
};

export default MyOrders;
