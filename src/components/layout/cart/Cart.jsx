import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../loading/LoadingPage";

import { auth } from "../../../actions/userAction";
import { Link } from "react-router-dom";
import { addToCart, deleteCart } from "../../../actions/cartAction";
import { clearErrors } from "../../../actions/productAction";
import { RESET_CART_STATE } from "../../../constance/cartConstant";
import { MdRemoveShoppingCart } from "react-icons/md";
import GlobalState from "../../../GlobalState";
import MetaDeta from "../MetaDeta";

const CartItem = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const [subTotal, setSubTotal] = useState(0);

  const { loading, user } = useSelector((state) => state.user);

  const { isError } = useSelector((state) => state.cartAdd);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: RESET_CART_STATE,
    });
  }, []);

  useEffect(() => {
    let total = 0;
    if (user.cart) {
      user.cart.map((item) => {
        total += Number(item.quantity) * Number(item.price);
      });
    }
    setSubTotal(total);
  }, [dispatch, user]);

  useEffect(() => {
    if (isError) {
      setErr(isError);

      dispatch(clearErrors());
    }
  }, [dispatch, user, isError]);

  const handleChange = async (productId, quantity, name, price, image) => {
    const data = {
      productId,
      quantity,
      name,
      price,
      image,
    };

    await dispatch(addToCart(data));

    await dispatch(auth());
  };

  const handleDelete = async (productId) => {
    await dispatch(deleteCart({ productId }));

    await dispatch(auth());
  };

  const handleCheckOut = () => {
    sessionStorage.setItem("order-from", "cart");
    sessionStorage.removeItem("order-details");
    dispatch({
      type: RESET_CART_STATE,
    });
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="allCart">
            <MetaDeta title="Cart" />
            <h1 className="cartHead">Your Cart</h1>
            {user.cart && user.cart.length != 0 ? (
              <>
                {user.cart.map((item) => (
                  <div key={item.productId} className="cartCard">
                    <Link
                      to={`/product/${item.productId}`}
                      className="cartImage"
                    >
                      <img src={item.image} alt="img" />
                    </Link>
                    <div className="cartDetails">
                      <Link
                        to={`/product/${item.productId}`}
                        className="itemName"
                      >
                        {item.name.slice(0, 50)}
                      </Link>
                      <div className="itemQuantity">
                        <h1>Quantity: {item.quantity}</h1>
                        <div className="quantityChange">
                          <button
                            onClick={() =>
                              handleChange(
                                item.productId,
                                item.quantity - 1,
                                item.name,
                                item.price,
                                item.image
                              )
                            }
                          >
                            −
                          </button>
                          <input
                            readOnly
                            value={item.quantity}
                            type="number"
                            name=""
                            id=""
                          />
                          <button
                            onClick={() =>
                              handleChange(
                                item.productId,
                                item.quantity + 1,
                                item.name,
                                item.price,
                                item.image
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {item.stock === 0 ? (
                        <p className="outStock">OutOfStock</p>
                      ) : null}

                      <div className="priceAndDelete">
                        <h3 className="price">
                          Price: ৳{item.price * item.quantity}
                        </h3>
                        <button
                          onClick={() => handleDelete(item.productId)}
                          className="v1button removeButton"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="totalCheck">
                  <h1>Total Price: ৳{subTotal}</h1>
                  <Link
                    onClick={handleCheckOut}
                    to="/order/shiping"
                    style={{ width: "60%" }}
                    className="v2button checkButton"
                  >
                    Check Out
                  </Link>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "60vh",
                  minHeight: "500px",
                }}
              >
                <MdRemoveShoppingCart
                  style={{ color: "var(--v1)", fontSize: "45px" }}
                />
                <h1 style={{ textAlign: "center", margin: "2rem" }}>
                  No Cart Item
                </h1>
                <Link
                  to="/products"
                  className="v2button"
                  style={{ padding: "10px" }}
                >
                  All Products
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      ;
    </>
  );
};

export default CartItem;
