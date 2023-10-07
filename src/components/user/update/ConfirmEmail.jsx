import React, { useContext, useEffect } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { confirmEmail, logout } from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./Update.css";
import { RESET_STATE } from "../../../constance/userConstant";
import GlobalState from "../../../GlobalState";

const ConfirmEmail = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { error, message } = useSelector((state) => state.forgotPassword);
  const params = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token")
  useEffect(() => {
    if (error) {
      setErr(error);
    }
    if (message) {
      setMsg(message);
    }
    dispatch({ type: RESET_STATE });
  }, [error, dispatch, message]);

  useEffect(() => {
    const myForm = {
      token: params.token,
    };
    dispatch(confirmEmail(token,myForm));
    dispatch(logout(token));
  }, []);

  return (
    <>
      <div className="updatePage">
          <MetaDeta title="Mail Confirmation" />
        <h1>{error ? error : "Email updated successfully."}</h1>
      </div>
    </>
  );
};

export default ConfirmEmail;
