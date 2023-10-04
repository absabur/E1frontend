import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    edit: false,
    color: "rgb(0, 0, 0)",
    activeColor: "tomato",
    isHalf: true
  };
  return (
    <div className="reviewCard">
      <div className="user">
        <img src={profilePng} alt="User" />
        <p style={{textDecoration: "underLine"}}>{review.name}</p>
        <ReactStars {...options} />
      </div>
      <div className="commentReview"><p className="reviewCardComment">{review.comment}</p></div>
    </div>
  );
};

export default ReviewCard;