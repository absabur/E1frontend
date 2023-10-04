import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { RxCross1 } from "react-icons/rx";
import { MdOutlineCategory } from "react-icons/md";
import MetaDeta from "../layout/MetaDeta";
import { useDispatch, useSelector } from "react-redux";
import { allCategory } from "../../actions/admin/productsAction";
import GlobalState from "../../GlobalState";

const UpdateCategory = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(allCategory());
  }, []);
  useEffect(() => {
    if (categories) {
      categories.map((cate) => {
        if (cate._id === params.id) {
          setName(cate.name);
        }
      });
    }
  }, [params.id, categories]);

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    const id = params.id;
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const { data } = await axios.put(`/api/category/${id}`, { name }, config);
      if (data.success) {
        setMsg("Category Updated.");
        navigate("/admin/categories");
      }
    } catch (error) {
      setErr(error.response.data.error);
    }
  };

  return (
    <>
      <div className="updatePage">
        <MetaDeta title="Update Category" />
        <div className="updateForm singleUpdate">
          <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
            <h1>Update Category</h1>
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
              value="Update"
              className="v1button submitButton"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
