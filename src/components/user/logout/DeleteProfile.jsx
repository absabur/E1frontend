import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../actions/userAction";
import "./Logout.css";
import { clearErrors } from "../../../actions/productAction";
import { UPDATE_PROFILE_RESET } from "../../../constance/userConstant";

import LoadingPage from "../../layout/loading/LoadingPage";
import GlobalState from "../../../GlobalState";
import MetaDeta from "../../layout/MetaDeta";

const DeleteProfile = () => {
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
    dispatch({
      type: UPDATE_PROFILE_RESET,
    });
  }, [error, dispatch, isAuthenticated]);
  const handleCancle = () => {
    navigate("/");
  };
  const handleDelete = () => {
    const token = localStorage.getItem("access_token_abs_ecommerce");
    dispatch(deleteAccount(token));
    localStorage.removeItem("access_token_abs_ecommerce");
  };
  return (
    <>
      {loading ? (
        <LoadingPage error={null}/>
      ) : isAuthenticated ? (
        <div className="logoutPage">
          <MetaDeta title="Delete Account" />
          <h2 className="headLogDelete">Accout will be delete permently. </h2>
          <h2 className="headLogDelete">Are You Sure?</h2>
          <div>
            <button
              className="v2button logoutDeleteButton"
              onClick={handleCancle}
            >
              Cancle
            </button>
            <button
              className="v1button logoutDeleteButton"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Navigate replace to={"/"} />
      )}
    </>
  );
};

export default DeleteProfile;
