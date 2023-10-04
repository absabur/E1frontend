import React, { useEffect } from "react";
import "./admin.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductAdmin } from "../../actions/admin/productsAction.js";
import { allOrders } from "../../actions/admin/orderAction.js";
import MetaDeta from "../layout/MetaDeta.jsx";
import { allUsers } from "../../actions/admin/userAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.products);
  const { pagination: userCount } = useSelector((state) => state.adminUsers);

  const { orders, amount } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getProductAdmin({ limit: 100000000 }));

    dispatch(allOrders());

    dispatch(allUsers(1, 100000000));
  }, []);

  console.log(userCount);

  return (
    <div className="dashBoard">
      <MetaDeta title="Admin Dashboard" />
      <div className="preview">
        <h1>DashBoard</h1>
        <div className="overView">
          <Link to="/admin/products" className="products">
            Products <br />
            {pagination && pagination.number_of_Products}
            {/* {products && products.length} */}
          </Link>
          <Link to="/admin/orders" className="orders">
            Orders <br />
            {orders && orders.length}
          </Link>
          <Link to="/admin/users" className="users">
            Users <br />
            {userCount && userCount.number_of_Users}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
