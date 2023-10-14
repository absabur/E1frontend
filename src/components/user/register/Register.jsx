import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { register } from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { clearErrors } from "../../../actions/userAction";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import "./Register.css";
import { AiOutlineUnlock } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { PiEyeDuotone } from "react-icons/pi";
import image from "../../../images/Profile.png";
import GlobalState from "../../../GlobalState";

const Register = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const params = useParams();
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(image);
  const [user, setUser] = useState({
    name: "",
    password: "",
    cPassword: "",
  });
  const {
    loading,
    isAuthenticated,
    error,
    token: tokenBack,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  useEffect(() => {
    if (error) {
      if (error === "Could not decode base64") {
        setErr("Image is too large");
        dispatch(clearErrors());
      } else if (error === "jwt expired"){
        navigate("/signup")
        setTimeout(() => {
          setMsg("TimeOut ! Verify your email again.")
        }, 400);
      } else {
        setErr(error);
        dispatch(clearErrors());
      }
    }
    if (tokenBack) {
      localStorage.setItem("access_token_abs_ecommerce", tokenBack);
    }
  }, [error, dispatch, tokenBack]);
  const registerSubmit = (e) => {
    e.preventDefault();
    if (avatar === "") {
      setErr("Choose an image");
    } else {
      const myForm = new FormData();

      myForm.set("rtoken", params.token);
      myForm.set("name", user.name);
      myForm.set("password", user.password);
      myForm.set("confirmPassword", user.cPassword);
      myForm.set("avatar", avatar);
      dispatch(register(token, myForm));
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const [type, setType] = useState(false);
  const [type2, setType2] = useState(false);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : isAuthenticated ? (
        <Navigate replace to={"/profile"} />
      ) : (
        <div className="signUpPage">
          <div className="signUpForm">
            <MetaDeta title="Register" />
            <h1>Sign Up</h1>
            <form encType="multipart/form-data" onSubmit={registerSubmit}>
              <div className="signUpName">
                <label htmlFor="name">
                  <CgProfile />
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={user.name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <label htmlFor="password">
                  <AiOutlineUnlock />
                </label>
                <input
                  type={type ? "text" : "password"}
                  placeholder="Password"
                  required
                  name="password"
                  value={user.password}
                  onChange={registerDataChange}
                />
                <p className="typeButton" onClick={() => setType(!type)}>
                  {type ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <div className="signUpPassword">
                <label htmlFor="cPassword">
                  <AiFillLock />
                </label>
                <input
                  type={type2 ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  name="cPassword"
                  value={user.cPassword}
                  onChange={registerDataChange}
                />
                <p className="typeButton" onClick={() => setType2(!type2)}>
                  {type2 ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </p>
              </div>
              <span className="img-label">
                <label style={{ margin: "20px " }} htmlFor="file-upload">
                  <img
                    style={{ marginTop: "0" }}
                    className="image"
                    src={avatarPreview}
                    alt="Avatar"
                  />
                </label>
              </span>
              <input
                id="file-upload"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
                style={{ display: "none" }}
              />
              <p style={{ color: "rgb(153, 153, 0)", margin: "10px" }}>
                Image should be less than 700kb
              </p>
              <input
                type="submit"
                value="Register"
                className="v2button submitButton"
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

export default Register;
