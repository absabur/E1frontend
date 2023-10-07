import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { clearErrors, logout } from "../../../actions/userAction";
import "./Logout.css";
import LoadingPage from "../../layout/loading/LoadingPage";
import GlobalState from "../../../GlobalState";
import MetaDeta from "../../layout/MetaDeta";

const Logout = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, isAuthenticated]);

  const handleCancle = () => {
    navigate("/profile");
  };
  const handleLogout = async () => {
    const token = localStorage.getItem("access_token_abs_ecommerce");
    await dispatch(logout(token));
    localStorage.removeItem("access_token_abs_ecommerce");
  };
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : isAuthenticated ? (
        <div className="logoutPage">
          <MetaDeta title="Log Out" />
          <h2 className="headLogDelete">Are you sure to logout?</h2>
          <div>
            <button
              className="v2button logoutDeleteButton"
              onClick={handleCancle}
            >
              Cancle
            </button>
            <button
              className="v1button logoutDeleteButton"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Navigate replace to={"/"} />
      )}
    </>
  );
};

export default Logout;
