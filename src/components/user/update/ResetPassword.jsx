import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { clearErrors, resetPassword } from "../../../actions/userAction";

import { AiOutlineUnlock } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { PiEyeDuotone } from "react-icons/pi";
import "./Update.css";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_STATE } from "../../../constance/userConstant";
import GlobalState from "../../../GlobalState";

const UPassword = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const navigate = useNavigate();
  const params = useParams();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (message) {
      setMsg(message);
      setNewPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
    dispatch({ type: RESET_STATE });
  }, [error, message, dispatch, navigate]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      newPassword,
      confirmPassword,
      token: params.token,
    };
    dispatch(resetPassword(token, myForm));
  };
  const [type, setType] = useState(false);
  const [type2, setType2] = useState(false);

  return (
    <>
      {loading ? (
        <LoadingPage error={null}/>
      ) : (
        <div className="updatePage">
          <div className="updateForm singleUpdate">
            <MetaDeta title="Reset Password" />
            <h1>Reset Password</h1>
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <div>
                <label htmlFor="newPassword">
                  <AiOutlineUnlock />
                </label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={type ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  required
                  placeholder="New Password"
                />
                <p className="typeButton" onClick={() => setType(!type)}>
                  {type ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label htmlFor="password">
                  <AiFillLock />
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={type2 ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  placeholder="Confirm New Password"
                />
                <p className="typeButton" onClick={() => setType2(!type2)}>
                  {type2 ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <p style={newPassword !== confirmPassword ? {visibility: "visible", color: "red", margin: "10px 0"} : {visibility: "hidden", color: "red", margin: "10px 0"}}>Password did not match</p>
              <input
                style={newPassword !== confirmPassword ? {visibility: "hidden"} : { marginTop: "1rem" }}
                type="submit"
                value="Confirm"
                className="v1button submitButton"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UPassword;
