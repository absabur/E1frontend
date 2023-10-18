import React, { useEffect } from "react";
import "./admin.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductAdmin } from "../../actions/admin/productsAction.js";
import { allOrders } from "../../actions/admin/orderAction.js";
import MetaDeta from "../layout/MetaDeta.jsx";
import { allUsers } from "../../actions/admin/userAction.js";
import LoadingPage from "../layout/loading/LoadingPage";

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  const {loading: productLoad,  pagination } = useSelector((state) => state.products);
  const {loading: userLoad, pagination: userCount } = useSelector((state) => state.adminUsers);

  const {loading: orderLoad, orders, amount } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getProductAdmin(token, { limit: 100000000 }));

    dispatch(allOrders(token));

    dispatch(allUsers(token, 1, 100000000));
  }, []);

  return (
    <div className="dashBoard">
      <MetaDeta title="Admin Dashboard" />
      <div className="preview">
        <h1>DashBoard</h1>
        <div className="overView">
          <Link to="/admin/products" className="products dashview">
            <span>Products</span>
            { productLoad? 
              <div style={{height: "20px", width: "20px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative"}}>
                <div className="dot1 dot11"></div>
                <div className="dot2 dot22"></div>
              </div>
               : <span>{pagination && pagination.number_of_Products}</span>}
            {/* {products && products.length} */}
          </Link>
          <Link to="/admin/orders" className="orders dashview">
            <span>Orders</span>
            {orderLoad ? 
              <div style={{height: "20px", width: "20px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative"}}>
                <div className="dot1 dot11"></div>
                <div className="dot2 dot22"></div>
              </div>
               : <span>{orders && orders.length}</span>}
          </Link>
          <Link to="/admin/users" className="users dashview">
            <span>Users</span>
            {userLoad ? 
              <div style={{height: "20px", width: "20px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative"}}>
                <div className="dot1 dot11"></div>
                <div className="dot2 dot22"></div>
              </div>
               : <span>{userCount && userCount.number_of_Users}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
