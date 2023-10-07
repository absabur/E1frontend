import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login } from "../../../actions/userAction";

import { Link, Navigate } from "react-router-dom";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { RiKeyLine } from "react-icons/ri";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { PiEyeDuotone } from "react-icons/pi";
import GlobalState from "../../../GlobalState";

const Login = () => {
  const { setErr } = useContext(GlobalState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  const {
    isAuthenticated,
    error,
    token: tokenBack,
  } = useSelector((state) => state.user);

  const handlelogin = (e) => {
    e.preventDefault();
    dispatch(login(token, email, password));
  };
  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (tokenBack) {
      localStorage.setItem("access_token_abs_ecommerce", tokenBack);
    }
  }, [error, dispatch, tokenBack]);
  const [type, setType] = useState(false);
  return (
    <>
      {isAuthenticated ? (
        <Navigate replace to={"/profile"} />
      ) : (
        <div className="loginPage">
          <div className="loginForm">
            <MetaDeta title="Login" />
            <h1>login</h1>
            <form onSubmit={handlelogin} encType="application/json">
              <div>
                <label htmlFor="email">
                  <MdEmail />
                </label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password">
                  <RiKeyLine />
                </label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={type ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
                <p className="typeButton" onClick={() => setType(!type)}>
                  {type ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <div className="f-pass">
                <span></span>
                <Link to="/profile/forgot/password">Forgete password?</Link>
              </div>
              <input
                className="v2button submitButton"
                type="submit"
                value="Login"
              />
            </form>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
