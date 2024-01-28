import React from "react";
import "./Loader.css";

const LoadingCard = ({ prod }) => {
  let arr = [];
  for (let i = 0; i < prod; i++) {
    arr.push(<div className="loading-card"></div>);
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {arr}
    </div>
  );
};

export default LoadingCard;
