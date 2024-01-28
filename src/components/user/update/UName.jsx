import React, { useContext, useEffect, useState } from "react";
import MetaDeta from "../../layout/MetaDeta";
import { auth, updateProfile } from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import { clearErrors } from "../../../actions/userAction";
import { Navigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import "./Update.css";
import { UPDATE_PROFILE_RESET } from "../../../constance/userConstant";
import GlobalState from "../../../GlobalState";

const UName = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState(user.name);

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      setMsg("Name Updated successfully");
      dispatch(auth(token));
    }
    dispatch({
      type: UPDATE_PROFILE_RESET,
    });
  }, [error, isUpdated, user, dispatch]);
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setName(user.name);
    }

    const myForm = {
      name: name,
    };
    dispatch(updateProfile(token, myForm));
  };

  return (
    <>
      <MetaDeta title="Update Name" />
      {loading ? (
        <LoadingPage error={null}/>
      ) : isUpdated ? (
        <Navigate replace to={"/profile"} />
      ) : (
        <div className="updatePage">
          <div className="updateForm singleUpdate">
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <h1>Update Name</h1>
              <div className="updateName">
                <label htmlFor="name">
                  <CgProfile />
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                {name && (
                  <RxCross1 className="crossIcon" onClick={() => setName("")} />
                )}
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

export default UName;
