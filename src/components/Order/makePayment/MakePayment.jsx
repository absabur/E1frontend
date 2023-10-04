import React, { useContext, useEffect, useState } from "react";

import MetaDeta from "../../layout/MetaDeta";
import "./MakePayment.css";
import bkashLogo from "../../../images/bkash.png";
import rocketLogo from "../../../images/rocket.png";
import nagadLogo from "../../../images/nagad.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import {
  clearErrors,
  getOrderDetails,
  makePayment,
} from "../../../actions/orderAction";
import { CLEARE_ERRORS } from "../../../constance/orderContant";
import GlobalState from "../../../GlobalState";

const MakePayment = () => {
  const { setErr } = useContext(GlobalState);
  const [orderInfo, setOrderInfo] = useState(null);
  const [bkash, setBkash] = useState("");
  const [rocket, setRocket] = useState("");
  const [nagad, setNagad] = useState("");
  const [cod, setCod] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { success, isError, isLoading } = useSelector((state) => state.payment);
  const params = useParams();

  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (order) {
      setOrderInfo(order);
    }

    if (isError) {
      setErr(isError);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: CLEARE_ERRORS });
      navigate("/order/payment-success");
    }
  }, [order, error, isError, success]);

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, []);

  const updatePaymentSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: orderInfo._id,
      way: bkash
        ? "bkash"
        : nagad
        ? "nagad"
        : rocket
        ? "rocket"
        : cod
        ? "cod"
        : null,
      status: bkash
        ? "paid"
        : nagad
        ? "paid"
        : rocket
        ? "paid"
        : cod
        ? "unpaid"
        : null,
      transition: bkash
        ? bkash
        : nagad
        ? nagad
        : rocket
        ? rocket
        : cod
        ? ""
        : null,
    };
    dispatch(makePayment(data));
  };

  const handleCod = () => {
    if (bkash !== "" || rocket !== "" || nagad !== "") {
      setCod(false);
    } else {
      setCod(!cod);
    }
  };

  return (
    <>
    <MetaDeta title="Make Payment" />
      {loading || isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {orderInfo && (
            <div className="paymentPage">
              <div className="paymentForm">
                <MetaDeta title="Make Payment" />
                <h1>Choose Payment method</h1>
                <form
                  className="mainForm"
                  encType="multipart/form-data"
                  onSubmit={updatePaymentSubmit}
                >
                  <div style={{ margin: "auto 1rem", textAlign: "center" }}>
                    <h3>Order Id: {orderInfo._id}</h3>
                    <h3>Ammount: ৳{orderInfo.totalPrice}</h3>
                  </div>
                  <div>
                    <div className="label">
                      <img className="payLogo" src={bkashLogo} alt="Bkash" />
                      <b>01521710796</b>
                    </div>
                    <input
                      value={bkash}
                      onChange={(e) => setBkash(e.target.value)}
                      type="text"
                      name="bkash"
                      id="bkash"
                      placeholder="Transition"
                      disabled={
                        cod || rocket !== "" || nagad !== "" ? true : false
                      }
                    />
                  </div>
                  <div>
                    <div className="label">
                      <img className="payLogo" src={rocketLogo} alt="Rocket" />
                      <b>01521710796</b>
                    </div>
                    <input
                      value={rocket}
                      onChange={(e) => setRocket(e.target.value)}
                      type="text"
                      name="rocket"
                      id="rocket"
                      placeholder="Transition"
                      disabled={
                        cod || bkash !== "" || nagad !== "" ? true : false
                      }
                    />
                  </div>
                  <div>
                    <div className="label">
                      <img className="payLogo" src={nagadLogo} alt="Nagad" />
                      <b>01773277050</b>
                    </div>
                    <input
                      value={nagad}
                      onChange={(e) => setNagad(e.target.value)}
                      type="text"
                      name="nagad"
                      id="nagad"
                      placeholder="Transition"
                      disabled={
                        cod || bkash !== "" || rocket !== "" ? true : false
                      }
                    />
                  </div>
                  <div className="cod">
                    <h2>Cash On Delivery</h2>
                    <p
                      style={
                        cod
                          ? {
                              backgroundColor: "var(--v2)",
                              border: "2px solid var(--v1)",
                            }
                          : {}
                      }
                      onClick={handleCod}
                      className={`codButton`}
                    ></p>
                  </div>
                  <input
                    style={{
                      marginTop: "1rem",
                      margin: "auto",
                      display: "block",
                    }}
                    type="submit"
                    value="Pay Now"
                    className="v1button submitButton"
                    disabled={
                      cod === true ||
                      bkash !== "" ||
                      rocket !== "" ||
                      nagad !== ""
                        ? false
                        : true
                    }
                  />
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MakePayment;
