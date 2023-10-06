import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { verifyEmail } from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { clearErrors } from "../../../actions/userAction";

import { MdEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { RiKeyLine } from "react-icons/ri";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { PiEyeDuotone } from "react-icons/pi";
import "./Update.css";
import { RESET_STATE } from "../../../constance/userConstant";
import GlobalState from "../../../GlobalState";

const UEmail = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
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
      email,
      password,
    };
    dispatch(verifyEmail(myForm));
  };

  const [type, setType] = useState(false);

  return (
    <>
    <MetaDeta title="Update Email" />
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="updatePage">
          <div className="updateForm singleUpdate">
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <h1>Update Email</h1>

              <div className="updateEmail">
                <label htmlFor="email">
                  <MdEmail />
                </label>
                <input
                  type="email"
                  placeholder="New Email"
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
              <div>
                <label htmlFor="password">
                  <RiKeyLine />
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={type ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  placeholder="password"
                />
                <p className="typeButton" onClick={() => setType(!type)}>
                  {type ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <input
                type="submit"
                value="Update"
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
