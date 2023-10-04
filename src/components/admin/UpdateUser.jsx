import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingPage from "../layout/loading/LoadingPage";
import { updateUser, userInfo } from "../../actions/admin/userAction";
import { UPDATE_USER_RESET } from "../../constance/admin/userConstant";
import "./admin.css";
import GlobalState from "../../GlobalState";
import MetaDeta from "../layout/MetaDeta";

const UserUpdate = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const [role, setRole] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.userInfo);
  const {
    isUpdated,
    error,
    loading: isLoading,
  } = useSelector((state) => state.adminUserUD);

  useEffect(() => {
    dispatch(userInfo(params.id));
  }, []);

  useEffect(() => {
    if (error) {
      setErr(error);
      dispatch({ type: UPDATE_USER_RESET });
    }
    if (isUpdated) {
      setMsg("User Updated successfully.");
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(userInfo(params.id));
      setRole("");
    }
  }, [error, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    if (role === "admin") {
      data = { isAdmin: true, isBan: false };
    }
    if (role === "ban") {
      data = { isBan: true, isAdmin: false };
    }
    if (role === "user") {
      data = { isAdmin: false, isBan: false };
    }
    dispatch(updateUser(params.id, data));
  };

  return (
    <>
    <MetaDeta title="User Update by Admin" />
      {loading || isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {user && JSON.stringify(user) !== "{}" ? (
            <>
              <div className="profileSection">
                <h1 className="profileHead">User Info</h1>
                <div className="userInfo">
                  <div className="imageSection">
                    <img src={user.avatar.url} alt="" />
                  </div>
                  <div className="userDetails">
                    <h3
                      style={{ marginTop: "1rem" }}
                      className="editIconSection"
                    >
                      Name: <br />
                      {user.name}
                    </h3>
                    <h4 className="editIconSection">
                      Email:
                      <br />
                      {user.email}
                    </h4>
                    <p style={{ marginBottom: "20px" }}>
                      <span>Joined On: </span>
                      <br />
                      {user.createdAt.slice(0, 10)}
                    </p>
                    <h3 style={{ marginBottom: "20px" }}>
                      Role:{" "}
                      {user.isAdmin ? (
                        <span style={{ color: "green" }}>Admin</span>
                      ) : user.isBan ? (
                        <span style={{ color: "red" }}>Banned</span>
                      ) : (
                        "User"
                      )}
                    </h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="edit">
                <h1>Change Role</h1>
                <div className="radioButton">
                  <input
                    onChange={(e) => setRole(e.target.value)}
                    type="radio"
                    id="admin"
                    name="fav_language"
                    value="admin"
                  />
                  <label htmlFor="admin">Admin</label>
                  <br />
                  <input
                    onChange={(e) => setRole(e.target.value)}
                    type="radio"
                    id="ban"
                    name="fav_language"
                    value="ban"
                  />
                  <label htmlFor="ban">Ban</label>
                  <br />
                  <input
                    onChange={(e) => setRole(e.target.value)}
                    type="radio"
                    id="user"
                    name="fav_language"
                    value="user"
                  />
                  <label htmlFor="user">User</label>
                </div>
                <button
                  disabled={role ? false : true}
                  type="submit"
                  className="v1button"
                  style={{ padding: "10px", fontSize: "18px" }}
                >
                  Update
                </button>
              </form>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default UserUpdate;
