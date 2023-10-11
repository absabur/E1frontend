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
import { allCategory } from "../../actions/admin/productsAction";

const Home = () => {
  const { setErr } = useContext(GlobalState);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");

  const { loading, error, products } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(allCategory(token));
  }, []);

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
          <p className="welcome">Welcome to Ecommerce</p>
          <h1 className="find-product">FIND AMAZING PRODUCTS BELOW</h1>

          <a className="scroll" href="#container">
            <button>
              Scroll <CgMouse />
            </button>
          </a>
      </div>
      
      {
        categories && 
        <div className="home-categories">
          <h1 className="categories-head">Categories</h1>
          {
            categories.map((cate)=> (
            <Link className="category-card" to={`/products?search=&minPrice=null&maxPrice=null&cate=${cate._id}&sort=null`}>
              <p>{cate.name}</p>
            </Link>
            ))
          }
        </div>
      }

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
