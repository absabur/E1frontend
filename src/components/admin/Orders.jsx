import React, { useContext, useEffect, useState } from "react";
import { clearErrors } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

import LoadingPage from "../layout/loading/LoadingPage";
import copy from "copy-to-clipboard";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { allOrders, deleteOrder } from "../../actions/admin/orderAction";
import { DELETE_ORDER_RESET } from "../../constance/admin/orderConstant";
import GlobalState from "../../GlobalState";
import MetaDeta from "../layout/MetaDeta";

const Orders = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { error, loading, orders, amount } = useSelector(
    (state) => state.adminOrders
  );
  const {
    isDeleted,
    error: deleteError,
    loading: isLoading,
  } = useSelector((state) => state.adminOrderUD);
  const [searchParams, setSearchParams] = useSearchParams({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [sort, setSort] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      setSearchParams({ id });
    }
    if (sort) {
      setSearchParams({ sort });
    }
  };

  useEffect(() => {
    dispatch(allOrders());
  }, []);

  useEffect(() => {
    if (searchParams.get("sort")) {
      setSort(searchParams.get("sort"));

      dispatch(allOrders("", searchParams.get("sort")));
    }
    if (searchParams.get("id")) {
      setId(searchParams.get("id"));

      dispatch(allOrders(searchParams.get("id"), ""));
    }
  }, [searchParams.get("sort"), searchParams.get("id")]);

  const handleReset = () => {
    setSort("");
    setId("");
    setSearchParams({});

    dispatch(allOrders());
  };

  useEffect(() => {
    if (error) {
      setErr(error);

      dispatch(clearErrors());
    }
    if (deleteError) {
      setErr(deleteError);
      dispatch({ type: DELETE_ORDER_RESET });
    }
    if (isDeleted) {
      setMsg("Order deleted successfully.");
      dispatch({ type: DELETE_ORDER_RESET });

      dispatch(allOrders());
    }
  }, [error, deleteError, isDeleted]);

  const handleCopyText = (text) => {
    copy(text);
    setMsg(`You have copied "${text}"`);
  };

  const [cancelDiv, setCancelDiv] = useState(false);
  const [DeleteId, setDeleteId] = useState("");

  const handleDelete = (id) => {
    setCancelDiv(true);
    setDeleteId(id);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    dispatch(deleteOrder(DeleteId));
    setCancelDiv(false);
  };

  return (
    <>
      <MetaDeta title="Orders for Admin" />
      {loading || isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {cancelDiv ? (
              <div id="cancel" className="cancelDiv">
                <p>Order Id: {DeleteId}</p>
                <form onSubmit={handleDeleteSubmit}>
                  <div className="cancelButtons">
                    <button
                      onClick={() => setCancelDiv(false)}
                      type="reset"
                      style={{
                        fontSize: "16px",
                        padding: "10px",
                        border: "1px solid var(--black)",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="v1button"
                      style={{ fontSize: "16px", padding: "10px" }}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="search">
              <div className="id">
                <label htmlFor="id">Id: </label>
                <input
                  value={searchParams.get("id")}
                  disabled={searchParams.get("sort") ? true : false}
                  onChange={(e) => setId(e.target.value)}
                  type="text"
                  placeholder="Search by id"
                />
              </div>
              <div className="sort">
                <label htmlFor="sort">Status: </label>
                <select
                  value={sort}
                  disabled={searchParams.get("id") ? true : false}
                  onChange={(e) => setSort(e.target.value)}
                  name="sort"
                  id="sort"
                >
                  <option value="">Choose</option>
                  <option value="processing">Processing</option>
                  <option value="shipping">Shipping</option>
                  <option value="receive">To Receive</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
              <div>
                <button onClick={handleReset} className="v1button find">
                  Reset
                </button>
                <button className="v2button find" type="submit">
                  Find
                </button>
              </div>
            </form>

            {amount && amount ? (
              <h1 style={{ marginTop: "1rem" }}>Total Amount: ৳{amount}</h1>
            ) : null}
            {orders && orders ? (
              <h4 style={{ marginBottom: "1rem" }}>
                Number of Orders: {orders.length}
              </h4>
            ) : null}

            <div className="table">
              <div
                className="productChinCard"
                style={{ backgroundColor: "var(--v1)", color: "var(--white)" }}
              >
                <b className="id">Id</b>
                <b className="status">Status</b>
                <b className="numberOfProduct">Items Qty</b>
                <b className="totalAmount">Total Amount</b>
                <b className="action">Action</b>
              </div>

              {orders &&
                orders.map((order) => (
                  <div key={order._id} className="productChinCard">
                    <p
                      onClick={(e) => handleCopyText(e.currentTarget.innerHTML)}
                      className="id copy"
                    >
                      {order._id}
                    </p>
                    <p
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
                    </p>
                    <p className="numberOfProduct">{order.orderItems.length}</p>
                    <p className="totalAmount">৳{order.totalPrice}</p>
                    <div className="action">
                      <button>
                        <Link to={`/admin/order/update/${order._id}`}>
                          {order.orderStatus === "delivered" ||
                          order.orderStatus === "canceled" ? (
                            <TbListDetails />
                          ) : (
                            <AiOutlineEdit />
                          )}
                        </Link>
                      </button>
                      {order.orderStatus === "canceled" ? (
                        <button onClick={() => handleDelete(order._id)}>
                          <FaRegTrashCan />
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>

            {JSON.stringify(orders) === "[]" ? (
              <div
                style={{
                  minHeight: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h1>No Order</h1>
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
