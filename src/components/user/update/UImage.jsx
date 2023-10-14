import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { auth, updateProfile } from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { clearErrors } from "../../../actions/userAction";
import { Navigate } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import "./Update.css";
import { UPDATE_PROFILE_RESET } from "../../../constance/userConstant";
import GlobalState from "../../../GlobalState";

const UImage = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      if (error === "Could not decode base64") {
        setErr("Image is too large");
        dispatch(clearErrors());
      } else {
        setErr(error);
        dispatch(clearErrors());
      }
    }

    if (isUpdated) {
      setMsg("Profile Updated successfully");
      dispatch(auth(token));
    }
    dispatch({
      type: UPDATE_PROFILE_RESET,
    });
  }, [error, isUpdated, user, dispatch]);
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    if (avatar === "") {
      setErr("Choose an image");
    } else {
      const myForm = new FormData();

      myForm.set("avatar", avatar);
      dispatch(updateProfile(token, myForm));
    }
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MetaDeta title="Update Image" />
      {loading ? (
        <LoadingPage />
      ) : isUpdated ? (
        <Navigate replace to={"/"} />
      ) : (
        <div className="updatePage">
          <div className="updateForm singleUpdate">
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <h1>Update Image</h1>
              <span className="img-label">
                <label htmlFor="file-upload">
                  <img className="image" src={avatarPreview} alt="Avatar" />
                </label>
              </span>
              <input
                id="file-upload"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
                style={{ display: "none" }}
              />
              <p style={{ color: "rgb(153, 153, 0)", margin: "10px" }}>
                Image should be less than 700kb
              </p>
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

export default UImage;
