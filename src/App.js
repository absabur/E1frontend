import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import GlobalState from "./GlobalState";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header/Header.jsx";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer/Footer";
import ProductDetails from "./components/layout/product/ProductDetails";
import Products from "./components/layout/product/Products.jsx";
import Cart from "./components/layout/cart/Cart.jsx";
import Profile from "./components/user/profile/Profile";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/userAction";
import React, { useEffect, useState } from "react";
import Logout from "./components/user/logout/Logout";
import DeleteProfile from "./components/user/logout/DeleteProfile";
import Error from "./components/Error/Error";
import UPassword from "./components/user/update/UPassword";
import UName from "./components/user/update/UName";
import UEmail from "./components/user/update/UEmail";
import UImage from "./components/user/update/UImage";
import ForgotPassword from "./components/user/update/ForgotPassword.jsx";
import ResetPassword from "./components/user/update/ResetPassword.jsx";
import SignUp from "./components/user/update/SignUp.jsx";
import ConfirmEmail from "./components/user/update/ConfirmEmail.jsx";
import Shipping from "./components/Order/shiping/Shipping";
import MakePayment from "./components/Order/makePayment/MakePayment.jsx";
import MyOrders from "./components/Order/allOrders/MyOrders.jsx";
import MyOrdersToPay from "./components/Order/conditionalOrder/MyOrdersToPay.jsx";
import MyOrdersToProcess from "./components/Order/conditionalOrder/MyOrdersToProcess.jsx";
import MyOrdersToShip from "./components/Order/conditionalOrder/MyOrdersToShip.jsx";
import MyOrdersToReceive from "./components/Order/conditionalOrder//MyOrdersToReceive.jsx";
import MyOrdersToReview from "./components/Order/conditionalOrder/MyOrdersToReview.jsx";
import Order from "./components/Order/singleOrder/Order";
import PaymentSuccess from "./components/Order/singleOrder/PaymentSuccess.jsx";
import Review from "./components/Order/singleOrder/Review";
import LoadingPage from "./components/layout/loading/LoadingPage";
import Dashboard from "./components/admin/Dashboard";
import AdminProducts from "./components/admin/Products.jsx";
import UpdateProduct from "./components/admin/UpdateProduct";
import CreateProduct from "./components/admin/CreateProduct";
import UpdateCategory from "./components/admin/UpdateCategory";
import AllCategories from "./components/admin/AllCategories.jsx";
import Orders from "./components/admin/Orders";
import UpdateOrder from "./components/admin/UpdateOrder";
import Sidebar from "./components/admin/Sidebar";
import AllUsers from "./components/admin/AllUsers";
import UpdateUser from "./components/admin/UpdateUser";
import { BackendUrl } from "./BackendUrl";

function App() {
  const [toggle, setToggle] = useState(false);
  const { isAuthenticated, loading, user } = useSelector(state => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth());
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {

    window.addEventListener("scroll", () => {
      let heightToHideFrom = 300;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll) setToggle(false)
      if (winScroll > heightToHideFrom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (msg) {
      toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setErr("");
    setMsg("");
  }, [msg, err]);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <GlobalState.Provider value={{ err, setErr, msg, setMsg, toggle, setToggle }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="App">
          <BrowserRouter>
            <Header />
            {user && user.isAdmin && <Sidebar />}
            <div style={{ height: "80px" }}></div>
            <div onClick={() => setToggle(false)} style={{width: "100vw"}}>
              <Routes>
                <Route
                  path="*"
                  element={<Navigate replace to={"/login"} />}
                />
                {/* Navigate replace to={"/"} */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:search" element={<Products />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register/:token" element={<Register />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/profile/forgot/password"
                  element={<ForgotPassword />}
                />
                <Route
                  path="/profile/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile/delete" element={<DeleteProfile />} />
                <Route path="/mail-update/:token" element={<ConfirmEmail />} />
                <Route path="/cart" element={<Cart />} />
                {isAuthenticated && (
                  <>
                    <Route path="/myorders" element={<MyOrders />} />
                    <Route path="/myorders/to-pay" element={<MyOrdersToPay />} />
                    <Route
                      path="/myorders/to-process"
                      element={<MyOrdersToProcess />}
                    />
                    <Route
                      path="/myorders/to-ship"
                      element={<MyOrdersToShip />}
                    />
                    <Route
                      path="/myorders/to-receive"
                      element={<MyOrdersToReceive />}
                    />
                    <Route
                      path="/myorders/to-review"
                      element={<MyOrdersToReview />}
                    />
                    <Route path="/order/:id" element={<Order />} />
                    <Route path="/profile/update/name" element={<UName />} />
                    <Route path="/profile/update/email" element={<UEmail />} />
                    <Route path="/profile/update/image" element={<UImage />} />
                    <Route
                      path="/profile/update/password"
                      element={<UPassword />}
                    />
                    <Route path="/order/shiping" element={<Shipping />} />
                    <Route path="/order/payment/:id" element={<MakePayment />} />
                    <Route
                      path="/order/payment-success"
                      element={<PaymentSuccess />}
                    />
                    <Route path="/order/review/:id" element={<Review />} />
                    {user && user.isAdmin === true && (
                      <>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route
                          path="/admin/products"
                          element={<AdminProducts />}
                        />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route
                          path="/admin/order/update/:id"
                          element={<UpdateOrder />}
                        />
                        <Route
                          path="/admin/product/details/:id"
                          element={<UpdateProduct />}
                        />
                        <Route
                          path="/admin/create/product"
                          element={<CreateProduct />}
                        />
                        <Route
                          path="/admin/update/category/:id"
                          element={<UpdateCategory />}
                        />
                        <Route
                          path="/admin/categories"
                          element={<AllCategories />}
                        />
                        <Route path="/admin/users" element={<AllUsers />} />
                        <Route
                          path="/admin/user/update/:id"
                          element={<UpdateUser />}
                        />
                      </>
                    )}
                  </>
                )}
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
          <button
            className="btnScrollTop"
            style={{ display: isVisible ? "block" : "none" }}
            onClick={goTop}
          >
            <AiOutlineArrowUp />
          </button>
        </div>
      )}
    </GlobalState.Provider>
  );
}

export default App;
