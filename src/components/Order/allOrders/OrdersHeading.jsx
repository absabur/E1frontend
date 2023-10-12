import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../../actions/orderAction";

const Header = () => {
  const [home, sethome] = useState({ width: "0" });
  const [prod, setprod] = useState({ width: "0" });
  const [con, setcon] = useState({ width: "0" });
  const [about, setabout] = useState({ width: "0" });
  const [log, setlog] = useState({ width: "0" });

  const { orders } = useSelector((state) => state.myOrders);
  const [toPay, setToPay] = useState(0);
  const [process, setProcess] = useState(0);
  const [ship, setShip] = useState(0);
  const [receive, setReceive] = useState(0);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  useEffect(() => {
    if (orders) {
      let topay = 0;
      let process = 0;
      let ship = 0;
      let receive = 0;
      let total = 0;
      orders.map((order) => {
        total += 1;
        if (order.orderStatus === "pay") topay += 1;
        if (order.orderStatus === "processing") process += 1;
        if (order.orderStatus === "shipping") ship += 1;
        if (order.orderStatus === "receive") receive += 1;
      });
      setToPay(topay);
      setProcess(process);
      setShip(ship);
      setReceive(receive);
      setTotal(total);
    }
  }, [dispatch, orders]);

  useEffect(() => {
    dispatch(myOrders(token));
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/myorders") {
      sethome({ width: "100%" });
    } else {
      sethome({ width: "0" });
    }

    if (location.pathname === "/myorders/to-process") {
      setlog({ width: "100%" });
    } else {
      setlog({ width: "0" });
    }

    if (location.pathname === "/myorders/to-pay") {
      setprod({ width: "100%" });
    } else {
      setprod({ width: "0" });
    }

    if (location.pathname === "/myorders/to-ship") {
      setcon({ width: "100%" });
    } else {
      setcon({ width: "0" });
    }

    if (location.pathname === "/myorders/to-receive") {
      setabout({ width: "100%" });
    } else {
      setabout({ width: "0" });
    }
  }, [location.pathname]);

  return (
    <>
      <div className="orderNav">
        <div>
          <Link to="/myorders">
            <span className="countOrders">{total}</span>
            <br />
            All Orders
          </Link>
          <div style={home} className="homeLine ULine"></div>
        </div>
        <div className="prodNav">
          <Link to="/myorders/to-pay">
            <span className="countOrders">{toPay}</span>
            <br />
            To Pay
          </Link>
          <div style={prod} className="prodLine ULine"></div>
        </div>
        <div className="loginNav">
          <Link to="/myorders/to-process">
            <span className="countOrders">{process}</span>
            <br />
            Processing
          </Link>
          <div style={log} className="loginLine ULine"></div>
        </div>
        <div className="contNav">
          <Link to="/myorders/to-ship">
            <span className="countOrders">{ship}</span>
            <br />
            Shipping
          </Link>
          <div style={con} className="contLine ULine"></div>
        </div>
        <div className="aboutNav">
          <Link to="/myorders/to-receive">
            <span className="countOrders">{receive}</span>
            <br />
            Receive
          </Link>
          <div style={about} className="aboutLine ULine"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
