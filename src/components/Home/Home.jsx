import React, { useContext, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import MetaDeta from "../layout/MetaDeta";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../layout/loading/LoadingPage";
import GlobalState from "../../GlobalState";

const Home = () => {
  const { setErr } = useContext(GlobalState);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");

  const { loading, error, products } = useSelector((state) => state.products);
  // useSelector((state) => console.log(state.products));

  useEffect(() => {
    dispatch(getProduct(token));
  }, [dispatch]);

  if (error) {
    setErr(error);

    dispatch(clearErrors());
  }

  return (
    <div>
      <MetaDeta title="ABS-ECommerce" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <div className="container" id="container">
        <h2 className="homeHeading">Featured Products</h2>
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <div className="productCard">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <Link
              className="all-product v2button allProductBotton"
              to="/products"
            >
              All Product
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
