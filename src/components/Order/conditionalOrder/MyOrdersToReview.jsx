import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../../actions/orderAction";

import LoadingPage from "../../layout/loading/LoadingPage";
import "../allOrders/MyOrders.css";
import { Link } from "react-router-dom";
import GlobalState from "../../../GlobalState";
import MetaDeta from "../../layout/MetaDeta";

const MyOrdersToReview = () => {
  const { setErr } = useContext(GlobalState);
  const [emptyOrder, setEmptyOrder] = useState(false);

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token")
  const { orders, error, loading } = useSelector((state) => state.myOrders);
  useEffect(() => {
    dispatch(myOrders(token));
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    setEmptyOrder(false);
    let isEmpty = 0;
    if (orders) {
      orders.map((order) => {
        if (order.orderStatus === "delivered") {
          order.orderItems.map((item) => {
            if (item.review === "not") {
              isEmpty += 1;
            }
          });
        }
      });
    }
    if (isEmpty === 0) {
      setEmptyOrder(true);
    }
  }, [orders]);
  return (
    <div className="allOrders" style={{ minHeight: "500px" }}>
    <MetaDeta title="Review" />
      <h2 className="myOrderHead">My Orders To Review</h2>
      {emptyOrder === true ? (
        <div className="noOrder">
          <h1>No Product</h1>
        </div>
      ) : null}
      {loading ? (
        <LoadingPage />
      ) : (
        orders &&
        orders.toReversed().map((order) =>
          order.orderStatus === "delivered" ? (
            <>
              {order.orderItems.map((item) => (
                <>
                  {item.review === "done" ? null : (
                    <div key={item._id} className="SingleProductCard">
                      <div className="img">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="productDetails">
                        <p className="productName">{item.name.slice(0, 32)}{item.name.slice(31, -1)? "...": ""}</p>
                        <b>
                          ৳{item.price} x{item.quantity}
                        </b>
                        <p style={{ margin: "10px" }}>
                          Order Status:{" "}
                          <span style={{ color: "green", fontWeight: "700" }}>
                            Deliverd
                          </span>
                        </p>
                        <div
                          className="buttons reviewButton"
                          style={{ marginBottom: "1rem" }}
                        >
                          <Link
                            to={`/order/review/${order._id}${item.productId}`}
                            className="paynow v1button"
                          >
                            Review
                          </Link>
                        </div>
                        {/* {
                      item.review === "done" ? 
                      <div className="buttons" style={{marginBottom: "1rem"}}>
                          <Link to={`/order/review/${order._id}${item.productId}`} className="paynow v1button">Change Review</Link>
                      </div>
                      :
                      <div className="buttons" style={{marginBottom: "1rem"}}>
                          <Link to={`/order/review/${order._id}${item.productId}`} className="paynow v1button">Review</Link>
                      </div>
                    } */}
                      </div>
                    </div>
                  )}
                </>
              ))}
            </>
          ) : null
        )
      )}
    </div>
  );
};

export default MyOrdersToReview;
