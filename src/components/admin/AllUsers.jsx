import React, { useContext, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { clearErrors } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../layout/loading/LoadingPage";
import copy from "copy-to-clipboard";
import { Link, useSearchParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { allUsers, deleteUser } from "../../actions/admin/userAction";
import { DELETE_USER_RESET } from "../../constance/admin/userConstant";
import GlobalState from "../../GlobalState";
import MetaDeta from "../layout/MetaDeta";

const Users = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { error, loading, users, pagination } = useSelector(
    (state) => state.adminUsers
  );
  const {
    isDeleted,
    error: deleteError,
    loading: isLoading,
  } = useSelector((state) => state.adminUserUD);
  const [searchParams, setSearchParams] = useSearchParams({});

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");

  const [sort, setSort] = useState("");
  const [id, setId] = useState("");
  const [page, setpage] = useState(1);
  let limit = 20;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      setSearchParams({ id });
    }
    if (sort) {
      setSearchParams({ sort });
    }
  };

  const handlePageChange = (e, p) => {
    setpage(p);
  };

  useEffect(() => {
    dispatch(allUsers(token, page, limit));
  }, []);

  useEffect(() => {
    if (searchParams.get("sort")) {
      setSort(searchParams.get("sort"));

      dispatch(allUsers(token, page, limit, "", searchParams.get("sort")));
    }
    if (searchParams.get("id")) {
      setId(searchParams.get("id"));

      dispatch(allUsers(token, page, limit, searchParams.get("id"), ""));
    }
  }, [searchParams.get("sort"), searchParams.get("id")]);

  const handleReset = () => {
    setSort("");
    setId("");
    setSearchParams({});

    dispatch(allUsers(token, page, limit));
  };

  useEffect(() => {
    if (error) {
      setErr(error);

      dispatch(clearErrors());
    }
    if (deleteError) {
      setErr(deleteError);
      dispatch({ type: DELETE_USER_RESET });
    }
    if (isDeleted) {
      setMsg("User deleted successfully");
      dispatch({ type: DELETE_USER_RESET });

      dispatch(allUsers(token, page, limit));
    }
  }, [error, deleteError, isDeleted]);

  const handleCopyText = (text) => {
    copy(text);
    setMsg(`You have copied "${text}"`);
  };

  const [cancelDiv, setCancelDiv] = useState("");
  const [DeleteId, setDeleteId] = useState("");

  const handleDelete = (id) => {
    setCancelDiv(id);
    setDeleteId(id);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    dispatch(deleteUser(token, DeleteId));
    setCancelDiv("");
  };

  return (
    <div style={{width: "100%", position: "relative",minHeight: "70vh" }}>
      {
        cancelDiv ? <div onClick={()=> setCancelDiv("")} style={{position: "absolute", width: "100%", height: "100%",backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: "11"}}></div> : null
      }
      <>
        <MetaDeta title="Users for Admin" />
        {loading || isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <form onSubmit={handleSubmit} className="search">
                <div className="id">
                  <label htmlFor="id">Id: </label>
                  <input
                    value={searchParams.get("id")}
                    disabled={searchParams.get("sort") ? true : false}
                    onChange={(e) => setId(e.target.value)}
                    type="text"
                    placeholder="Search by id"
                  />
                </div>
                <div className="sort">
                  <label htmlFor="sort">Status: </label>
                  <select
                    value={sort}
                    disabled={searchParams.get("id") ? true : false}
                    onChange={(e) => setSort(e.target.value)}
                    name="sort"
                    id="sort"
                  >
                    <option value="">Choose</option>
                    <option value="users">All Users</option>
                    <option value="admin">Admins</option>
                    <option value="ban">Banned User</option>
                  </select>
                </div>
                <div>
                  <button onClick={handleReset} className="v1button find">
                    Reset
                  </button>
                  <button
                    disabled={id && id.length !== 24 ? true : false}
                    className="v2button find"
                    type="submit"
                  >
                    Find
                  </button>
                </div>
              </form>

              {users && users ? (
                <h4 style={{ marginBottom: "1rem" }}>
                  Number of users: {users.length}
                </h4>
              ) : null}

              <div className="table">
                <div
                  className="productChinCard"
                  style={{ backgroundColor: "var(--v1)", color: "var(--white)" }}
                >
                  <b className="id">Id</b>
                  <b className="email">Email</b>
                  <b className="userName">Name</b>
                  <b className="status">Role</b>
                  <b className="action">Action</b>
                </div>

                {users &&
                  users.map((user) => (
                    <div key={user._id} className="productChinCard">
                      <p
                        onClick={(e) => handleCopyText(e.currentTarget.innerHTML)}
                        className="id copy"
                      >
                        {user._id}
                      </p>
                      <p className="email">{user.email}</p>
                      <p className="userName">{user.name}</p>
                      <p className="status">
                        {user.isAdmin ? (
                          <span style={{ color: "green" }}>Admin</span>
                        ) : user.isBan ? (
                          <span style={{ color: "red" }}>Banned</span>
                        ) : (
                          "User"
                        )}
                      </p>
                      <div className="action">
                        {cancelDiv === user._id ? (
                            <div id="cancel" className="cancelDiv">
                              <p>User Id: {DeleteId}</p>
                              <form onSubmit={handleDeleteSubmit}>
                                <div className="cancelButtons">
                                  <button
                                    onClick={() => setCancelDiv("")}
                                    type="reset"
                                    style={{
                                      fontSize: "16px",
                                      padding: "10px",
                                      border: "1px solid var(--black)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="v1button"
                                    style={{ fontSize: "16px", padding: "10px" }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </form>
                            </div>
                          ) : null}
                        <button>
                          <Link to={`/admin/user/update/${user._id}`}>
                            <AiOutlineEdit />
                          </Link>
                        </button>
                        {user.isAdmin ? null : (
                          <button onClick={() => handleDelete(user._id)}>
                            <FaRegTrashCan />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {pagination && pagination.number_of_Users <= limit ? (
                <div style={{ height: "1rem" }}></div>
              ) : (
                <div className="pagination">
                  <button onClick={() => setpage(1)} className="f-l-arrow">
                    {"<<"}
                  </button>
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={pagination && pagination.number_of_Pages}
                    page={pagination && pagination.currentPage}
                    color="secondary"
                    onChange={handlePageChange}
                  />
                  <button
                    onClick={() =>
                      setpage(pagination && pagination.number_of_Pages)
                    }
                    className="f-l-arrow"
                  >
                    {">>"}
                  </button>
                </div>
              )}

              {JSON.stringify(users) === "[]" ? (
                <div
                  style={{
                    minHeight: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1>No user</h1>
                </div>
              ) : null}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Users;
