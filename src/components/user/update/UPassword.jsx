import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { changePassword, logout } from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { clearErrors } from "../../../actions/userAction";
import { Navigate } from "react-router-dom";

import { AiOutlineUnlock } from "react-icons/ai";
import { RiKeyLine } from "react-icons/ri";
import { AiFillLock } from "react-icons/ai";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { PiEyeDuotone } from "react-icons/pi";
import "./Update.css";
import { UPDATE_PROFILE_RESET } from "../../../constance/userConstant";
import GlobalState from "../../../GlobalState";

const UPassword = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [type, setType] = useState(false);
  const [type2, setType2] = useState(false);
  const [type3, setType3] = useState(false);

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      setMsg("Password has been changed successfully");
      dispatch(logout(token));
    }
    dispatch({
      type: UPDATE_PROFILE_RESET,
    });
  }, [error, isUpdated, user, dispatch]);
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(changePassword(token, myForm));
  };

  return (
    <>
      <MetaDeta title="Update Password" />
      {loading ? (
        <LoadingPage />
      ) : isUpdated ? (
        <Navigate replace to={"/"} />
      ) : (
        <div className="updatePage">
          <div className="updateForm">
            <h1>Change Password</h1>
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <div>
                <label htmlFor="oldPassword">
                  <RiKeyLine />
                </label>
                <input
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  type={type ? "text" : "password"}
                  name="oldPassword"
                  id="oldPassword"
                  required
                  placeholder="Old Password"
                />
                <p className="typeButton" onClick={() => setType(!type)}>
                  {type ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <div>
                <label htmlFor="newPassword">
                  <AiOutlineUnlock />
                </label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={type2 ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  required
                  placeholder="New Password"
                />
                <p className="typeButton" onClick={() => setType2(!type2)}>
                  {type2 ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label htmlFor="password">
                  <AiFillLock />
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={type3 ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  placeholder="Confirm New Password"
                />
                <p className="typeButton" onClick={() => setType3(!type3)}>
                  {type3 ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <p style={newPassword !== confirmPassword ? {visibility: "visible", color: "red", margin: "10px 0"} : {visibility: "hidden", color: "red", margin: "10px 0"}}>Password did not match</p>
              <input
                style={newPassword !== confirmPassword ? {visibility: "hidden"} : { marginTop: "1rem" }}
                type="submit"
                value="Change"
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
