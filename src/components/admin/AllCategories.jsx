import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { RxCross1 } from "react-icons/rx";
import { MdOutlineCategory } from "react-icons/md";
import MetaDeta from "../layout/MetaDeta";
import { useDispatch, useSelector } from "react-redux";
import { allCategory } from "../../actions/admin/productsAction";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import "./admin.css";
import GlobalState from "../../GlobalState";
import { BackendUrl } from "../../BackendUrl";

const AllCategories = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(allCategory(token));
  }, []);
  const [name, setName] = useState("");

  const updateProfileSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const token = localStorage.getItem("access_token_abs_ecommerce");

    try {
      const { data } = await axios.post(
        `${BackendUrl}/api/category`,
        { name },
        config
      );
      if (data.success) {
        setMsg("Category created");
        setName("");

        dispatch(allCategory(token));
      }
    } catch (error) {
      setErr(error.response.data.error);
    }
  };
  const [cancelDiv, setCancelDiv] = useState(false);
  const [DeleteName, setDeleteName] = useState("");

  const handleDelete = (name) => {
    setCancelDiv(true);
    setDeleteName(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token_abs_ecommerce");

    const config = {
      headers: { access_token: `${token}` },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `${BackendUrl}/api/category/${DeleteName}`,
      config
    );
    if (data.success) {
      setMsg("Category Deleted");

      dispatch(allCategory(token));
      setCancelDiv(false);
    }
  };

  return (
    <>
      <MetaDeta title="Categories" />
      <div
        className="updatePage"
        style={{ flexDirection: "column", position: "relative" }}
      >
        {cancelDiv ? (
          <div id="cancel" className="cancelDiv">
            <h2>Category: {DeleteName}</h2>
            <form onSubmit={handleSubmit}>
              <div className="cancelButtons">
                <button
                  onClick={() => setCancelDiv(false)}
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

        <div>
          <h1 style={{ marginTop: "1rem" }}>Categories</h1>
          {categories &&
            categories.map((category) => (
              <div key={category._id} className="allCategory">
                <p>{category.name}</p>
                <div>
                  <button className="editDelete">
                    <Link
                      className="editDelete"
                      to={`/admin/update/category/${category._id}`}
                    >
                      <AiOutlineEdit />
                    </Link>
                  </button>
                  <button
                    className="editDelete"
                    onClick={() => handleDelete(category.name)}
                  >
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="updateForm singleUpdate">
          <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
            <h1>Create Category</h1>
            <div className="updateName">
              <label htmlFor="name">
                <MdOutlineCategory />
              </label>
              <input
                type="text"
                placeholder="Category Name"
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
              value="Create"
              className="v1button submitButton"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AllCategories;
