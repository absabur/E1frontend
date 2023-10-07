import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  myOrders,
} from "../../../actions/orderAction";

import LoadingPage from "../../layout/loading/LoadingPage";
import { reviewProduct } from "../../../actions/productAction";
import Rating from "@mui/material/Rating";
import { REVIEW_RESET } from "../../../constance/productConstant";
import GlobalState from "../../../GlobalState";
import MetaDeta from "../../layout/MetaDeta";
import { BackendUrl } from "../../../BackendUrl";

const Review = () => {
  const { setErr, setMsg } = useContext(GlobalState);
  const params = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token_abs_ecommerce");
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { success, isError, isLoading } = useSelector((state) => state.review);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrderDetails(token, params.id.slice(0, 24)));
  }, [params.id, dispatch]);

  useEffect(() => {
    const id = params.id.slice(0, 24);
    const productId = params.id.slice(24, 48);
    if (error) {
      setErr(error);
      dispatch(clearErrors());
    }
    if (isError) {
      setErr(isError);
      dispatch(clearErrors());
    }
    if (success) {
      setMsg("Review done");
      const token = localStorage.getItem("access_token_abs_ecommerce");
      const config = {
        headers: {
          "Content-Type": "application/json",
          access_token: `${token}`,
        },
        withCredentials: true,
      };
      axios.put(`${BackendUrl}/api/order/reviewd`, { id, productId }, config);
      dispatch({ type: REVIEW_RESET });
      dispatch(myOrders(token));
      navigate("/profile");
    }
    if (rating === 5 && comment.length < 10) setComment("Satisfied");
    if (rating === 4 && comment.length < 10) setComment("Good");
    if (rating === 3 && comment.length < 10) setComment("Average");
    if (rating === 2 && comment.length < 10) setComment("Poor");
    if (rating === 1 && comment.length < 10) setComment("Bad");
  }, [error, success, isError, rating]);

  const handleClick = async () => {
    const reviewData = {
      rating: rating,
      comment: comment,
      productId: params.id.slice(24, 48),
      orderId: params.id.slice(0, 24),
    };
    await dispatch(reviewProduct(token, reviewData));
  };

  return (
    <>
      <MetaDeta title="FeedBack" />
      {loading || isLoading ? (
        <LoadingPage />
      ) : order && order.orderStatus === "delivered" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
            backgroundColor: "var(--back)",
          }}
        >
          <h1 style={{ margin: "1rem" }}>Product Review</h1>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <label htmlFor="comment" style={{ marginTop: "1rem" }}>
            Write a review about this product.
          </label>
          <textarea
            id="comment"
            placeholder="Write a review..."
            style={{ margin: "1rem", resize: "none"}}
            onChange={(e) => setComment(e.target.value)}
            cols="30"
            rows="10"
            value={comment}
          ></textarea>
          <button
            style={{ margin: "1rem 0", padding: "10px", fontSize: "17px" , width:"50%"}}
            onClick={handleClick}
            className="v1button"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <h1>You must buy and receive product to review.</h1>
      )}
    </>
  );
};

export default Review;
