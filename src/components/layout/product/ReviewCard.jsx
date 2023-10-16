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
  console.log(review);
  return (
    <div className="reviewCard">
      <div className="user">
        <img src={review.image? review.image : profilePng} alt="User" />
        <div className="name-stars">
          <p style={{textDecoration: "underLine", textAlign: "center"}}>{review.name}</p>
          <ReactStars {...options} />
          <span>{review.reviewDate.date? review.reviewDate.date : review.reviewDate.slice(0,15)}</span>
        </div>
      </div>
      <div className="commentReview"><p className="reviewCardComment">{review.comment}</p></div>
    </div>
  );
};

export default ReviewCard;