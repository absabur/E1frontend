import React, { useContext, useEffect, useState } from "react";
import Login from "../login/Login"
import { MdPayment } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { MdOutlineCancelPresentation } from "react-icons/md";
import MetaDeta from "../../layout/MetaDeta";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../actions/userAction";
import LoadingPage from "../../layout/loading/LoadingPage";

import "./Profile.css";
import { myOrders } from "../../../actions/orderAction";
import GlobalState from "../../../GlobalState";

const Profile = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.user
  );
  const { orders } = useSelector((state) => state.myOrders);
  const [toPay, setToPay] = useState(0);
  const [process, setProcess] = useState(0);
  const [ship, setShip] = useState(0);
  const [receive, setReceive] = useState(0);
  const [review, setReview] = useState(0);
  const [cancel, setCancel] = useState(0);

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (orders) {
      let topay = 0;
      let process = 0;
      let ship = 0;
      let receive = 0;
      let review = 0;
      let cancel = 0;
      orders.map((order) => {
        if (order.orderStatus === "pay") topay += 1;
        if (order.orderStatus === "processing") process += 1;
        if (order.orderStatus === "shipping") ship += 1;
        if (order.orderStatus === "receive") receive += 1;
        if (order.orderStatus === "canceled") cancel += 1;
        if (order.orderStatus === "delivered") {
          order.orderItems.map((item) => {
            if (item.review === "not") review += 1;
          });
        }
      });
      setToPay(topay);
      setProcess(process);
      setShip(ship);
      setReceive(receive);
      setReview(review);
      setCancel(cancel)
    }
  }, [error, dispatch, orders]);

  useEffect(() => {
    dispatch(myOrders(token));
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="profileSection">
          <MetaDeta title={`${user.name}`} />
          <h1 className="profileHead">Profile</h1>
          <div className="userInfo">
            <div className="imageSection">
              <img src={user.avatar.url} alt="" />
              <Link to="/profile/update/image">
                <FiEdit className="editIcon" />
              </Link>
            </div>
            <div className="userDetails">
              <h3 style={{ marginTop: "1rem" }} className="editIconSection">
                <p>
                  Name: <br />
                  {user.name}
                </p>
                <Link to="/profile/update/name">
                  <FiEdit className="editIcon" />
                </Link>
              </h3>
              <h4 className="editIconSection">
                <p>
                  Email:
                  <br />
                  {user.email}
                </p>
                <Link to="/profile/update/email">
                  <FiEdit className="editIcon" />
                </Link>
              </h4>
              <p style={{ marginBottom: "20px" }}>
                <span>Joined On: </span>
                <br />
                {user.createDate? user.createDate.date+", "+user.createDate.formatedTime :user.createdAt.slice(0, 10)}
              </p>
            </div>
            <div className="access">
              {user.isAdmin && (
                <Link className="v2button" to="/admin/dashboard">
                  Dashboard
                </Link>
              )}
              <Link className="v2button" to="/profile/update/password">
                Change Password
              </Link>
              <Link className="v2button" to="/forgot/password">
                Reset Password
              </Link>
              <Link className="v2button" to="/logout">
                Logout
              </Link>
              <Link className="v2button" to="/profile/delete">
                Delete Account
              </Link>
            </div>
          </div>
          <div className="othersDetails">
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4 style={{ fontSize: "25px" }}>My Orders</h4>
              <Link
                style={{ color: "var(--v1)", fontWeight: "600" }}
                to="/myorders"
              >
                All Orders
              </Link>
            </div>
            <div className="status">
              <Link className="card" to="/myorders/to-pay">
                <p className={`numberOrder`}>{toPay}</p>
                <MdPayment />
                <p>To Pay</p>
              </Link>
              <Link className="card" to="/myorders/to-process">
                <p className={`numberOrder`}>{process}</p>
                <LuPackagePlus />
                <p>To Process</p>
              </Link>
              <Link className="card" to="/myorders/to-ship">
                <p className={`numberOrder`}>{ship}</p>
                <FaShippingFast />
                <p>To Ship</p>
              </Link>
              <Link className="card" to="/myorders/to-receive">
                <p className={`numberOrder`}>{receive}</p>
                <GiReceiveMoney />
                <p>To Receive</p>
              </Link>
              <Link className="card" to="/myorders/to-review">
                <p className={`numberOrder`}>{review}</p>
                <GoCodeReview />
                <p>To Review</p>
              </Link>
              <Link className="card" to="/myorders/canceled">
                <p className={`numberOrder`}>{cancel}</p>
                <MdOutlineCancelPresentation />
                <p>Canceled</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
