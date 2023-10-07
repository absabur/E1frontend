import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { clearErrors, forgotPassword } from "../../../actions/userAction";

import { MdEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import "./Update.css";
import { RESET_STATE } from "../../../constance/userConstant";
import GlobalState from "../../../GlobalState";

const UEmail = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token")
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
    dispatch(forgotPassword(token, myForm));
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="updatePage">
          <div className="updateForm singleUpdate">
            <MetaDeta title="Forgot Password" />
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <h1 style={{ fontSize: "20px" }}>
                Enter Email To Send 'Reset Password' Request.
              </h1>

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
                value="Send"
                className="v1button submitButton"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UEmail;
