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
import About from "./components/about/About"
import Contact from "./components/contact/Contact"
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/userAction";
import React, { useEffect, useState } from "react";
import Logout from "./components/user/logout/Logout";
import DeleteProfile from "./components/user/logout/DeleteProfile";
// import Error from "./components/Error/Error";
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

function App() {
  const [toggle, setToggle] = useState(false);
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

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

      if (winScroll) setToggle(false);
      if (winScroll > heightToHideFrom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    
    dispatch(auth(token));
  }, []);

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
      setMsg("");
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
      setErr("");
    }

  }, [msg, err, loading, setErr, setMsg]);

  return (
    <GlobalState.Provider
      value={{ err, setErr, msg, setMsg, toggle, setToggle }}
    >
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
      <div className="App">
        <BrowserRouter>
          <Header />
          {user && user.isAdmin && <Sidebar />}
          <div style={{ height: "80px" }}></div>
          <div
            onClick={() => setToggle(false)}
            style={{
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "var(--back)",
            }}
          >
            {loading ? (
              <LoadingPage />
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:search" element={<Products />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register/:token" element={<Register />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/profile/forgot/password"
                  element={<ForgotPassword />}
                />
                <Route
                  path="/profile/reset-password/:token"
                  element={<ResetPassword />}
                />
                {isAuthenticated && (
                  <>
                    <Route
                      path="/mail-update/:token"
                      element={
                        isAuthenticated ? (
                          <ConfirmEmail />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/logout"
                      element={
                        isAuthenticated ? (
                          <Logout />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/profile/delete"
                      element={
                        isAuthenticated ? (
                          <DeleteProfile />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/cart"
                      element={
                        isAuthenticated ? (
                          <Cart />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/myorders"
                      element={
                        isAuthenticated ? (
                          <MyOrders />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/myorders/to-pay"
                      element={
                        isAuthenticated ? (
                          <MyOrdersToPay />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/myorders/to-process"
                      element={
                        isAuthenticated ? (
                          <MyOrdersToProcess />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/myorders/to-ship"
                      element={
                        isAuthenticated ? (
                          <MyOrdersToShip />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/myorders/to-receive"
                      element={
                        isAuthenticated ? (
                          <MyOrdersToReceive />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/myorders/to-review"
                      element={
                        isAuthenticated ? (
                          <MyOrdersToReview />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/order/:id"
                      element={
                        isAuthenticated ? (
                          <Order />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/profile/update/name"
                      element={
                        isAuthenticated ? (
                          <UName />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/profile/update/email"
                      element={
                        isAuthenticated ? (
                          <UEmail />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/profile/update/image"
                      element={
                        isAuthenticated ? (
                          <UImage />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/profile/update/password"
                      element={
                        isAuthenticated ? (
                          <UPassword />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/order/shiping"
                      element={
                        isAuthenticated ? (
                          <Shipping />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/order/payment/:id"
                      element={
                        isAuthenticated ? (
                          <MakePayment />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/order/payment-success"
                      element={
                        isAuthenticated ? (
                          <PaymentSuccess />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    <Route
                      path="/order/review/:id"
                      element={
                        isAuthenticated ? (
                          <Review />
                        ) : (
                          <Navigate replace to={"/login"} />
                        )
                      }
                    />
                    {user && user.isAdmin === true && (
                      <>
                        <Route
                          path="/admin/dashboard"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <Dashboard />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/products"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <AdminProducts />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/orders"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <Orders />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/order/update/:id"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <UpdateOrder />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/product/details/:id"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <UpdateProduct />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/create/product"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <CreateProduct />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/update/category/:id"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <UpdateCategory />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/categories"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <AllCategories />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/users"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <AllUsers />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                        <Route
                          path="/admin/user/update/:id"
                          element={
                            isAuthenticated && user && user.isAdmin === true ? (
                              <UpdateUser />
                            ) : (
                              <Navigate replace to={"/products"} />
                            )
                          }
                        />
                      </>
                    )}
                  </>
                )}
                <Route path="*" element={<Home />} />
              </Routes>
            )}
          </div>
          <Footer />
        </BrowserRouter>
        <button
          className={`btnScrollTop ${isVisible ? "showScroll" : "hideScroll"}`}
          onClick={goTop}
        >
          <AiOutlineArrowUp />
        </button>
      </div>
    </GlobalState.Provider>
  );
}

export default App;
