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
import LoadingDiv from "../layout/loading/LoadingDiv";

const Home = () => {
  const { setErr } = useContext(GlobalState);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");

  const { loading, error, products, productsForCategory } = useSelector((state) => state.products);

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

          <a className="scroll" href="#category">
            <button>
              Scroll <CgMouse />
            </button>
          </a>
      </div>
      
      {
        categories && 
        <div className="home-categories" id="category">
          <h1 className="categories-head">Categories</h1>
          {
            categories.map((cate)=> (
            <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", width: "100%", margin: "5px 0", boxShadow: "0 0 20px rgb(180, 180, 180)"}}>
              <div className="slider-head">
                <h3>{cate.name}</h3>
                <Link style={{color: "var(--v1)"}} to={`/products?search=&minPrice=null&maxPrice=null&cate=${cate._id}&sort=null`}>See All</Link>
              </div>
              <div style={{overflow: "auto", width: "100%"}}>
                <div className="product-slider">
                  {productsForCategory ? productsForCategory.map((product)=> (
                      <>{product.category === cate._id ? 
                        <Link to={`/product/${product._id}`} className="product-in-slider">
                          <div className="img">
                            <img src={product.images[0].url} alt="image" />
                          </div>
                          <div className="details">
                            <p>{product.name.slice(0, 20)}...</p>
                            <p style={{opacity: '0.7'}}>Sold: {product.sold}</p>
                            <strong>৳{product.price}</strong>
                          </div>
                        </Link>
                      : null}</>
                  )): <LoadingDiv />}
                </div>
              </div>
            </div>))
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
