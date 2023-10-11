import React, { useContext, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { clearErrors } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

import LoadingPage from "../layout/loading/LoadingPage";
import copy from "copy-to-clipboard";
import {
  deleteProduct,
  getProductAdmin,
} from "../../actions/admin/productsAction";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { DELETE_PRODUCT_RESET } from "../../constance/admin/productConstant";
import GlobalState from "../../GlobalState";
import MetaDeta from "../layout/MetaDeta";

const Products = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const { loading, error, products, pagination } = useSelector(
    (state) => state.products
  );
  const {
    isDeleted,
    error: deleteError,
    loading: isLoading,
  } = useSelector((state) => state.adminProduct);
  const [searchParams, setSearchParams] = useSearchParams({});

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");

  let limit = 20;
  const [page, setpage] = useState(1);
  const [name, setName] = useState("");
  const [sort, setSort] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      setSearchParams({ id });
    }
    if (name || sort) {
      setSearchParams({ sort, name });
    }
  };

  useEffect(() => {
    dispatch(getProductAdmin(token, { page, limit, name: "", sort: "" }));
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      setId(searchParams.get("id"));

      dispatch(
        getProductAdmin(token, { page, limit, id: searchParams.get("id") })
      );
    }
    if (searchParams.get("name") || searchParams.get("sort")) {
      setName(searchParams.get("name"));

      setSort(searchParams.get("sort"));
      dispatch(
        getProductAdmin(token, {
          page,
          limit,

          name: searchParams.get("name"),

          sort: searchParams.get("sort"),
        })
      );
    }
  }, [
    searchParams.get("name"),
    searchParams.get("sort"),
    searchParams.get("id"),
  ]);

  const handleReset = () => {
    setName("");
    setSort("");
    setId("");
    setSearchParams({});
    dispatch(
      getProductAdmin(token, { page, limit, name: "", sort: "Newest Arrivals" })
    );
  };

  useEffect(() => {
    if (error) {
      setErr(error);

      dispatch(clearErrors());
    }
    if (deleteError) {
      setErr(deleteError);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    if (isDeleted) {
      setMsg("Product deleted successfully.");
      dispatch({ type: DELETE_PRODUCT_RESET });

      dispatch(getProductAdmin(token, { page, limit, name: "", sort: "" }));
    }
  }, [error, isDeleted, deleteError]);

  const handlePageChange = (e, p) => {
    setpage(p);
  };

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

    dispatch(deleteProduct(token, DeleteId));
    setCancelDiv("");
  };

  return (
    <div style={{width: "100%", position: "relative",minHeight: "70vh" }}>
      {
        cancelDiv ? <div onClick={()=> setCancelDiv("")} style={{position: "absolute", width: "100%", height: "100%",backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: "11"}}></div> : null
      }
      <>
        <MetaDeta title="Products for Admin" />
        {loading || isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <form onSubmit={handleSubmit} className="search">
                <div className="id">
                  <label htmlFor="id">Id: </label>
                  <input
                    value={id}
                    disabled={sort || name ? true : false}
                    onChange={(e) => setId(e.target.value)}
                    type="text"
                    placeholder="Search by id"
                  />
                </div>
                <div className="name">
                  <label htmlFor="name">Name: </label>
                  <input
                    value={name}
                    disabled={id ? true : false}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Search by name"
                  />
                </div>
                <div className="sort">
                  <label htmlFor="sort">Sort</label>
                  <select
                    value={sort}
                    disabled={id ? true : false}
                    onChange={(e) => setSort(e.target.value)}
                    name="sort"
                    id="sort"
                  >
                    <option value="default">Default</option>
                    <option value="Top Sales">Top Sales</option>
                    <option value="Top Reviews">Top Reviews</option>
                    <option value="Newest Arrivals">Newest Arrivals</option>
                    <option value="Price Low to High">Price Low to High</option>
                    <option value="Price High to Low">Price High to Low</option>
                    <option value="Stock Low to High">Stock Low to High</option>
                    <option value="Stock High to Low">Stock High to Low</option>
                    <option value="High Rated">High Rated</option>
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

              <div className="table">
                <div
                  className="productChinCard"
                  style={{ backgroundColor: "var(--v1)", color: "var(--white)" }}
                >
                  <b className="id">Id</b>
                  <b className="name">Name</b>
                  <b className="stock">Stock</b>
                  <b className="prices">Price</b>
                  <b className="action">Action</b>
                </div>
                {products &&
                  products.map((product) => (
                    <div key={product._id} className="productChinCard">
                      <p
                        onClick={(e) => handleCopyText(e.currentTarget.innerHTML)}
                        className="id copy"
                      >
                        {product._id}
                      </p>
                      <p className="name">
                        {product.name.slice(0, 60)}
                        {product.name.slice(59, 1000) ? "..." : null}
                      </p>
                      <p
                        className="stock"
                        style={product.Stock === 0 ? { color: "red" } : null}
                      >
                        {product.Stock}
                      </p>
                      <p className="prices">{product.price}</p>
                      <div className="action">
                        {cancelDiv === product._id ? (
                          <div id="cancel" className="cancelDiv cancel-div-admin">
                            <p>Product Id: {DeleteId}</p>
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
                          <Link to={`/admin/product/details/${product._id}`}>
                            <AiOutlineEdit />
                          </Link>
                        </button>
                        <button onClick={() => handleDelete(product._id)}>
                          <FaRegTrashCan />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {!products ? (
                <div
                  style={{
                    minHeight: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1>Products not found</h1>
                </div>
              ) : null}
            </div>
            {pagination && pagination.number_of_Products <= limit ? (
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
          </>
        )}
      </>
    </div>
  );
};

export default Products;
