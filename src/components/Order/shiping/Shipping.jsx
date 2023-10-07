import React, { useContext, useEffect, useState } from "react";

import MetaDeta from "../../layout/MetaDeta";
import { addressAdd, deleteAddress } from "../../../actions/cartAction";
import { clearErrors, createOrder } from "../../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { auth } from "../../../actions/userAction";
import { RESET_CART_STATE } from "../../../constance/cartConstant";
import { TbTrash } from "react-icons/tb";
import "./Shiping.css";
import { Link, useNavigate } from "react-router-dom";
import GlobalState from "../../../GlobalState";
const address = require("@bangladeshi/bangladesh-address");

const Shipping = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { user } = useSelector((state) => state.user);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpozila, setSelectedUpozila] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(user.email);

  const [subTotal, setSubTotal] = useState(0);

  const [orderDetails, setOrderDetails] = useState([]);

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token")
  const navigate = useNavigate();

  const { isError, message, isLoading } = useSelector((state) => state.cartAdd);
  const { loading, error, status, newOrder } = useSelector(
    (state) => state.newOrder
  );

  useEffect(() => {
    if (isError) {
      setErr(isError);
    }
    if (message) {
      setMsg(message);
    }
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (status) {
      sessionStorage.setItem("order-from", "done");
      dispatch(clearErrors());
    }
    // if (sessionStorage.getItem("order-from") === "done") {
    //   navigate("/order/payment");
    // }
    if (sessionStorage.getItem("order-from") === "done") {
      navigate(`/order/payment/${newOrder._id}`);
    }
  }, [
    isError,
    message,
    user,
    error,
    status,
    sessionStorage.getItem("order-form"),
  ]);

  useEffect(() => {
    dispatch({
      type: RESET_CART_STATE,
    });
    const buyNow = sessionStorage.getItem("order-from");

    if (buyNow === "buy") {
      setOrderDetails([JSON.parse(sessionStorage.getItem("order-details"))]);
    }
    if (buyNow === "cart") {
      setOrderDetails(user.cart);
    }
    if (buyNow === "done") {
      navigate("/profile");
    }
  }, []);

  const submitAddress = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 11) {
      setErr("Phone number must be 11 charecter.");
      return;
    }
    if (phoneNumber.slice(0, 2) !== "01") {
      setErr("Phone enter a valid number.");
      return;
    }
    if (addressDetails.trim() === "") {
      setErr("Address can not be empty.");
      return;
    }

    const myForm = {
      division: selectedDivision,
      district: selectedDistrict,
      upozila: selectedUpozila,
      address: addressDetails.trim(),
      number: phoneNumber,
      email,
    };
    await dispatch(addressAdd(token, myForm));
    dispatch(auth(token));
  };

  const handleDelete = async () => {
    await dispatch(deleteAddress(token));
    dispatch(auth(token));
  };

  useEffect(() => {
    let total = 0;
    if (orderDetails) {
      orderDetails.map((item) => {
        total += Number(item.quantity) * Number(item.price);
      });
    }
    setSubTotal(total);
  }, [dispatch, orderDetails]);

  const division = [
    "Barisal",
    "Chattogram",
    "Dhaka",
    "Mymensingh",
    "Khulna",
    "Rajshahi",
    "Rangpur",
    "Sylhet",
  ];
  const district = address.districtsOf(selectedDivision);
  const upozila = address.upazilasOf(selectedDistrict);

  const handleConfirm = async () => {
    const orderData = {
      shippingInfo: {
        address: user.address.address,
        division: user.address.division,
        district: user.address.district,
        subDistrict: user.address.upozila,
        phoneNo: user.address.number,
        email: user.address.email,
      },
      orderItems: orderDetails,
      paymentInfo: {
        way: "unknown",
        status: "unpaid",
      },
      itemsPrice: subTotal,
      shippingFee: 100,
      totalPrice: subTotal + 100,
      orderStatus: "pay",
    };
    await dispatch(createOrder(orderData));
  };

  return (
    <>
    <MetaDeta title="Confirm Order" />
      {isLoading || loading ? (
        <LoadingPage />
      ) : user.address && user.address.division ? (
        <div className="allInfo">
          <div className="addressShow">
            <h3 className="addressHead">Shiping Address</h3>
            <div className="addressCard">
              <div>
                <h3>Division: </h3>
                {user.address.division}
              </div>
              <div>
                <h3>District: </h3>
                {user.address.district}
              </div>
              <div>
                <h3>Upozila: </h3>
                {user.address.upozila}
              </div>
              <div>
                <h3 style={{ marginRight: "1rem" }}>Address: </h3>
                {user.address.address}
              </div>
              <div>
                <h3>Mobile Number: </h3>
                {user.address.number}
              </div>
              <div>
                <h3>Email: </h3>
                {user.address.email}
              </div>
              <section>
                Delete Address To Change:{" "}
                <button onClick={handleDelete} className="trash">
                  <TbTrash />
                </button>
              </section>
            </div>
          </div>
          <div className="orderItems">
            <h2
              style={{
                padding: "1rem",
                borderBottom: "2px solid var(--black)",
              }}
            >
              {orderDetails && orderDetails.length < 2
                ? "Shiping Item"
                : "Shiping Items"}
            </h2>
            <div className="cartItems">
              {orderDetails &&
                orderDetails.length > 0 &&
                orderDetails.map((item) => (
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
                        {item.name.slice(0, 45)}{item.name.slice(44, -1)? "...": ""}
                      </Link>
                      <div className="itemQuantity">
                        <h1>Quantity: {item.quantity}</h1>
                      </div>
                      <h3 className="price">
                        Price: ৳{item.price * item.quantity}
                      </h3>
                    </div>
                  </div>
                ))}

              <div className="totalCheck">
                <h1 className="priceShow">Total Price: ৳{subTotal}</h1>
                <h1 className="priceShow">Shiping fee: ৳{100}</h1>
                <h1 className="priceShow">Sub Total: ৳{subTotal + 100}</h1>
                <button
                  onClick={handleConfirm}
                  className="v1button toPayButton"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="addressForm">
          <MetaDeta title="Shiping" />
          <form
            className="form"
            encType="multipart/form-data"
            onSubmit={submitAddress}
          >
            <h1 className="formHead">Address Form</h1>
            <div>
              <label className="label" htmlFor="division">
                Division:{" "}
              </label>
              <select
                required
                onChange={(e) => setSelectedDivision(e.target.value)}
                name="division"
                id="division"
              >
                <option value="">Division</option>
                {division.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="district">
                District:{" "}
              </label>
              <select
                required
                onChange={(e) => setSelectedDistrict(e.target.value)}
                name="district"
                id="district"
              >
                <option value="">District</option>
                {district.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="upozila">
                Upozila:{" "}
              </label>
              <select
                required
                onChange={(e) => setSelectedUpozila(e.target.value)}
                name="upozila"
                id="upoziala"
              >
                <option value="">Upozila</option>
                {upozila.map((item) => (
                  <option key={item} value={item.upazila}>
                    {item.upazila}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="phoneNumber">
                Mobile Number:
              </label>
              <input
                className="input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
                name="phoneNumber"
                required
                placeholder="Mobile Number"
              />
            </div>
            <div>
              <label className="label" htmlFor="location">
                Address:
              </label>
              <textarea
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                name="address"
                required
                placeholder="Address"
                rows="10"
                maxLength={200}
              ></textarea>
            </div>
            <div>
              <label className="label" htmlFor="email">
                Email:
              </label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                required
                placeholder="Email"
              />
            </div>
            <input
              style={{ marginTop: "1rem" }}
              type="submit"
              value="Continue"
              className="v1button toPayButton"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Shipping;
