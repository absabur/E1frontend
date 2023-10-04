// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../../actions/productAction";
import Carousel from "react-material-ui-carousel";
// @ts-ignore
import { Link, useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.jsx";
import LoadingPage from "../loading/LoadingPage";
import Error from "../../Error/Error";

import { addToCart } from "../../../actions/cartAction";
import { RESET_CART_STATE } from "../../../constance/cartConstant";
import { auth } from "../../../actions/userAction";
import Rating from "@mui/material/Rating";
import { RiStarSFill } from "react-icons/ri";
import GlobalState from "../../../GlobalState";
import MetaDeta from "../MetaDeta";

const ProductDetails = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [stars, setStars] = useState("all");
  const [reviews, setReviews] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, product } = useSelector(
    // @ts-ignore
    (state) => state.productDetails
  );

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [count5, setCount5] = useState(0);

  // @ts-ignore
  const { isError, message } = useSelector((state) => state.cartAdd);
  // console.log(error, loading, product)
  useEffect(() => {
    // @ts-ignore
    dispatch(getProductDetails(params.id));
    if (error) {
      setErr(error);
      // @ts-ignore
      dispatch(clearErrors());
    }

    dispatch({
      type: RESET_CART_STATE,
    });
  }, [dispatch, params.id, error]);
  useEffect(() => {
    if (isError) {
      setErr(isError);
      dispatch({
        type: RESET_CART_STATE,
      });
    }
    if (message) {
      // @ts-ignore
      dispatch(auth());
      setMsg(message);
      dispatch({
        type: RESET_CART_STATE,
      });
    }
    if (stars === "all") {
      setReviews(product.reviews);
    }
    let rev1 = [];
    let rev2 = [];
    let rev3 = [];
    let rev4 = [];
    let rev5 = [];
    if (JSON.stringify(product) !== "{}") {
      product.reviews.map((review) => {
        if (review.rating === 1) {
          rev1.push(review);
        }
        if (review.rating === 2) {
          rev2.push(review);
        }
        if (review.rating === 3) {
          rev3.push(review);
        }
        if (review.rating === 4) {
          rev4.push(review);
        }
        if (review.rating === 5) {
          rev5.push(review);
        }
      });
      setCount1(rev1.length);
      setCount2(rev2.length);
      setCount3(rev3.length);
      setCount4(rev4.length);
      setCount5(rev5.length);
    }
    if (stars === "1star") {
      // @ts-ignore
      setReviews(rev1);
    }

    if (stars === "2star") {
      // @ts-ignore
      setReviews(rev2);
    }

    if (stars === "3star") {
      // @ts-ignore
      setReviews(rev3);
    }

    if (stars === "4star") {
      // @ts-ignore
      setReviews(rev4);
    }

    if (stars === "5star") {
      // @ts-ignore
      setReviews(rev5);
    }
  }, [isError, message, stars, product]);

  const incQuantity = () => {
    if (cartQuantity >= product.Stock) return;
    setCartQuantity(cartQuantity + 1);
  };
  const decQuantity = () => {
    if (cartQuantity <= 1) return;
    setCartQuantity(cartQuantity - 1);
  };

  const handleAddCart = async () => {
    const data = {
      productId: product._id,
      quantity: cartQuantity,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
    };
    // @ts-ignore
    await dispatch(addToCart(data));
  };

  const handleBuy = (productId, name, price, quantity, image) => {
    sessionStorage.setItem("order-from", "buy");
    sessionStorage.setItem(
      "order-details",
      JSON.stringify({ productId, name, price, quantity, image })
    );
    navigate("/order/shiping");
    dispatch({
      type: RESET_CART_STATE,
    });
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : product ? (
        <>
        <MetaDeta title="Product Details" />
          <p
            style={{
              textAlign: "center",
              padding: "1rem 0",
              borderBottom: "var(--white) double 2px",
              backgroundColor: "rgb(218, 223, 217)",
            }}
          >
            Product Category: {product.category}
          </p>
          <div className="productSection">
            <div className="productImage">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="productDetails">
              <h1 className="productName">{product.name}</h1>
              <div className="reviews">
                <div className="retings">
                  <Rating value={product.ratings} precision={0.5} readOnly />

                  <span>{product.ratings && product.ratings.toFixed(1)}</span>
                </div>
                <a href="#reviews" className="productCardSpan">
                  {product.numOfReviews} reviews
                </a>
                <span>(Sold: {product.sold})</span>
              </div>
              <div className="detailsBottom">
                <h1 className="itemPrice">Price: ৳{product.price}</h1>
                <p className="status">
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? " OutOfStock" : ` InStock`}
                  </b>
                  <br />
                  <p style={{ paddingTop: "0.4rem" }}>
                    {product.Stock < 1 ? null : ` ${product.Stock} Item Left`}
                  </p>
                </p>
                <div className="cartInput">
                  <button onClick={decQuantity}>−</button>
                  <input
                    readOnly
                    value={product.Stock === 0 ? 0 : cartQuantity}
                    type="number"
                    name=""
                    id=""
                  />
                  <button onClick={incQuantity}>+</button>
                </div>
                <div className="buttons">
                  <button
                    disabled={product.Stock === 0 ? true : false}
                    onClick={handleAddCart}
                    className="v1button addBuyButton"
                  >
                    Add to cart
                  </button>
                  <button
                    disabled={product.Stock === 0 ? true : false}
                    onClick={() =>
                      handleBuy(
                        product._id,
                        product.name,
                        product.price,
                        cartQuantity,
                        product.images[0].url
                      )
                    }
                    className="v2button addBuyButton"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="description">
            <h3 className="descHead">Description</h3>
            <xmp style={{ whiteSpace: "pre-wrap", width: "100%" }}>
              {product.description}
            // @ts-ignore
            </xmp>
          </div>
          <div id="reviews" className="allReviews">
            <h3 className="reviewHead">REVIEWS</h3>
            <div className="nav">
              <button
                // @ts-ignore
                style={
                  stars === "all"
                    ? { backgroundColor: "rgba(35, 255, 1, 0.3)" }
                    : null
                }
                onClick={() => setStars("all")}
                className="reviewButton"
              >
                All <span>({product && product.numOfReviews})</span>
              </button>
              <button
                // @ts-ignore
                style={
                  stars === "1star"
                    ? { backgroundColor: "rgba(35, 255, 1, 0.3)" }
                    : null
                }
                onClick={() => setStars("1star")}
                className="reviewButton"
              >
                <RiStarSFill /> <span>({count1})</span>
              </button>
              <button
                // @ts-ignore
                style={
                  stars === "2star"
                    ? { backgroundColor: "rgba(35, 255, 1, 0.3)" }
                    : null
                }
                onClick={() => setStars("2star")}
                className="reviewButton"
              >
                <RiStarSFill />
                <RiStarSFill /> <span>({count2})</span>
              </button>
              <button
                // @ts-ignore
                style={
                  stars === "3star"
                    ? { backgroundColor: "rgba(35, 255, 1, 0.3)" }
                    : null
                }
                onClick={() => setStars("3star")}
                className="reviewButton"
              >
                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill /> <span>({count3})</span>
              </button>
              <button
                // @ts-ignore
                style={
                  stars === "4star"
                    ? { backgroundColor: "rgba(35, 255, 1, 0.3)" }
                    : null
                }
                onClick={() => setStars("4star")}
                className="reviewButton"
              >
                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill /> <span>({count4})</span>
              </button>
              <button
                // @ts-ignore
                style={
                  stars === "5star"
                    ? { backgroundColor: "rgba(35, 255, 1, 0.3)" }
                    : null
                }
                onClick={() => setStars("5star")}
                className="reviewButton"
              >
                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill /> <span>({count5})</span>
              </button>
            </div>
            {reviews && reviews[0] ? (
              <div className="reviewCards">
                {reviews &&
                  reviews.map((review) => (
                    // @ts-ignore
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
            {/* <button>Submit Review</button> */}
          </div>
        </>
      ) : (
        <Error message={error ? error : "Product not Found"} />
      )}
    </>
  );
};

export default ProductDetails;
