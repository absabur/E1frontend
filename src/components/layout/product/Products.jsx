import React, { useContext, useEffect, useState } from "react";
import { clearErrors, getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../../layout/loading/LoadingPage";
import ProductCard from "../../Home/ProductCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import MetaDeta from "../MetaDeta";

import { allCategory } from "../../../actions/admin/productsAction";
import GlobalState from "../../../GlobalState";
import { ALL_PRODUCT_RESET } from "../../../constance/productConstant";

const Products = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const dispatch = useDispatch();

  const [page, setpage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [cate, setCate] = useState("");
  const [sort, setSort] = useState("");

  const [fminPrice, setfMinPrice] = useState(0);
  const [fmaxPrice, setfMaxPrice] = useState(1000000);
  const [fcate, setfCate] = useState("");
  const [fsort, setfSort] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({});

  const { loading, error, products, pagination } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector((state) => state.categories);
  let search = searchParams.get("search") || "";

  let limit = 20;
  useEffect(() => {
    if (error) {
      setErr(error);

      dispatch(clearErrors());
    }
    if (searchParams.get("minPrice")) {
      setfMinPrice(searchParams.get("minPrice"));

      setMinPrice(searchParams.get("minPrice"));
    }
    if (searchParams.get("maxPrice")) {
      setfMaxPrice(searchParams.get("maxPrice"));

      setMaxPrice(searchParams.get("maxPrice"));
    }
    if (searchParams.get("sort")) {
      setfSort(searchParams.get("sort"));

      setSort(searchParams.get("sort"));
    }
    if (searchParams.get("cate")) {
      setfCate(searchParams.get("cate"));

      setCate(searchParams.get("cate"));
    }
    dispatch({type: ALL_PRODUCT_RESET})
    dispatch(
      getProduct(search, page, limit, fminPrice, fmaxPrice, fcate, fsort)
    );
  }, [
    dispatch,
    search,
    page,
    limit,
    error,
    fminPrice,
    fmaxPrice,
    fsort,
    fcate,
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
    searchParams.get("sort"),
    searchParams.get("cate"),
  ]);

  const handlePageChange = (e, p) => {
    setpage(p);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchParams.get("search")) {
      let search = searchParams.get("search");
    } else {
      search = "";
    }
    if (Number(minPrice) > Number(maxPrice)) {
      setSearchParams({ search, minPrice, maxPrice: minPrice, cate, sort });
    } else {
      setSearchParams({ search, minPrice, maxPrice, cate, sort });
    }
  };
  const hanleReset = () => {
    setMinPrice(0);
    setMaxPrice(1000000);
    setCate("");
    setSort("");
    if (searchParams.get("search")) {
      setSearchParams({ search: searchParams.get("search") });
    } else {
      setSearchParams({ search: "" });
    }
    window.location.reload();
  };

  useEffect(() => {
    dispatch(allCategory());
  }, []);

  const sortedKey = [
    "Default",
    "Top Sales",
    "Top Reviews",
    "Newest Arrivals",
    "Price Low to High",
    "Price High to Low",
  ];

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="main-product-section">
          <MetaDeta title="Products" />
          <div className="filter-div">
            <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>
              Filter Products
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="form-input">
                <label htmlFor="min-price">Min Price </label>
                <input
                  value={minPrice}
                  type="Number"
                  id="min-price"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span> -- </span>
                <input
                  value={maxPrice}
                  type="Number"
                  id="max-price"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <label htmlFor="max-price"> Max Price</label>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "space-between",
                }}
              >
                <div className="select-filter">
                  <h2 className="selectHead">Category</h2>
                  <select
                    className="select"
                    value={cate}
                    onChange={(e) => setCate(e.target.value)}
                  >
                    <option value="">Choose</option>

                    {categories &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="select-filter">
                  <h2 className="selectHead">Sort</h2>
                  <select
                    className="select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    {sortedKey.map((sorted) => (
                      <option key={sorted} value={sorted}>
                        {sorted}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="buttons">
                <button
                  type="reset"
                  className="v1button filterButton"
                  onClick={hanleReset}
                >
                  Reset filters
                </button>
                <button type="submit" className="v2button filterButton">
                  Apply filter
                </button>
              </div>
            </form>
          </div>
          <div className="products-section">
            <MetaDeta title="All Products" />
            {/* <Search/> */}

            {products && products.length > 0 ? (
              <>
                <div className="px80"></div>
                <h1 className="products-heading">Products</h1>

                {search ? (
                  <h3 style={{ marginBottom: "1rem" }}>
                    <span style={{ color: "#300054" }}>
                      {pagination.number_of_Products}
                    </span>{" "}
                    Products found for: '{searchParams.get("search")}'
                  </h3>
                ) : (
                  <h3 style={{ marginBottom: "1rem" }}>
                    <span style={{ color: "#300054" }}>
                      {pagination.number_of_Products}
                    </span>{" "}
                    Products found.{" "}
                  </h3>
                )}
                <div className="productCard">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                {pagination.number_of_Products <= limit ? (
                  <div style={{ height: "1rem" }}></div>
                ) : (
                  <div className="pagination">
                    <button onClick={() => setpage(1)} className="f-l-arrow">
                      {"<<"}
                    </button>
                    <Pagination
                      variant="outlined"
                      shape="rounded"
                      count={pagination.number_of_Pages}
                      page={pagination.currentPage}
                      color="secondary"
                      onChange={handlePageChange}
                    />
                    <button
                      onClick={() => setpage(pagination.number_of_Pages)}
                      className="f-l-arrow"
                    >
                      {">>"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="not-found">
                <h1>Products not found.</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
