import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../loading/LoadingPage";

import { auth } from "../../../actions/userAction";
import { Link } from "react-router-dom";
import { addToCart, deleteCart } from "../../../actions/cartAction";
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
  const token = localStorage.getItem("access_token_abs_ecommerce");

  useEffect(() => {
    if (user.cart) {
      let total = 0;
      user.cart.map((item) => {
        total += Number(item.quantity) * Number(item.price);
      });
      setSubTotal(total);
    }
    if (isError) {
      setErr(isError);
      dispatch({type: RESET_CART_STATE});
    }
  }, [user, isError]);


  const handleChange = async (productId, quantity, name, price, image) => {
    if (quantity === 0){
      setErr("Quantity can't be 0")
      return;
    }
    const data = {
      productId,
      quantity,
      name,
      price,
      image,
    };

    await dispatch(addToCart(token, data));
    await dispatch(auth(token));
  };

  const handleDelete = async (productId) => {
    await dispatch(deleteCart(token, { productId }));
    await dispatch(auth(token));
  };

  const handleCheckOut = async () => {
    sessionStorage.setItem("order-from", "cart");
    sessionStorage.removeItem("order-details");
    await dispatch(auth(token))
    dispatch({
      type: RESET_CART_STATE,
    });
  };

  useEffect(() => {
    dispatch({
      type: RESET_CART_STATE,
    });
  }, []);
  

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="allCart">
            <MetaDeta title="Cart" />
            <h1 className="cartHead">Your Cart</h1>
            {user && user.cart && user.cart.length > 0 ? (
              <>
                {user.cart.map((item) => (
                  <div key={item.productId} className="cartCard" style={item.quantity === 0 ? {backgroundColor: "rgba(128, 128, 128, 0.4)"}: {}}>
                    <Link
                      to={`/product/${item.productId}`}
                      className="cartImage"
                    >
                      <img src={item.image} alt="img" style={item.quantity === 0 ? {opacity: "0.5"}: {}}/>
                    </Link>
                    <div className="cartDetails">
                      <Link
                        to={`/product/${item.productId}`}
                        className="itemName"
                      >
                        {item.name.slice(0, 45)}
                        {item.name.slice(44, -1) ? "..." : ""}
                      </Link>
                      <div className="itemQuantity">
                        <h1>Quantity: {item.quantity}</h1>
                        <div className="quantityChange">
                          <button
                            disabled={item.quantity === 0 ? true : false}
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
                            disabled={item.quantity === 0 ? true : false}
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
                          style={{ padding: "5px", width: "auto" }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <h3>See latest stock Before CheckOut</h3>
                  <button onClick={()=> dispatch(auth(token))}>Latest stock</button>
                </div> */}

                <div className="totalCheck">
                  <h1>Total Price: ৳{subTotal}</h1>
                  <Link
                    onClick={handleCheckOut}
                    to="/order/shiping"
                    style={{ width: "250px" }}
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
                  style={{ padding: "10px", width: "250px" }}
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
