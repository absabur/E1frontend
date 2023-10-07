import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { clearErrors, signUpVerify } from "../../../actions/userAction";

import { MdEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import "./Update.css";
import { Link, Navigate } from "react-router-dom";
import { RESET_STATE } from "../../../constance/userConstant";
import GlobalState from "../../../GlobalState";

const UEmail = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (message) {
      setMsg(message);
      setEmail("");
    }
    dispatch({ type: RESET_STATE });
  }, [error, dispatch, message]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      email: email,
    };
    dispatch(signUpVerify(token, myForm));
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : isAuthenticated ? (
        <Navigate replace to={"/profile"} />
      ) : (
        <div className="updatePage">
          <div className="updateForm singleUpdate">
            <MetaDeta title="Sign Up" />
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <h1 style={{ fontSize: "20px" }}>Enter Email To Verify.</h1>

              <div className="updateEmail">
                <label htmlFor="email">
                  <MdEmail />
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email && (
                  <RxCross1
                    className="crossIcon"
                    onClick={() => setEmail("")}
                  />
                )}
              </div>
              <input
                type="submit"
                value="Verify"
                className="v1button submitButton"
              />
            </form>
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UEmail;
