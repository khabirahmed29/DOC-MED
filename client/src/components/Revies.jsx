import React from "react";
import { reviews } from "../constants";

const Reviews = () => {
  return (
    <div className="box-container">
      {reviews.map((review, index) => (
        <div className="box">
          <div className="image">
            <img src={review.img} alt="" />
          </div>
          <div className="content">
            <h3>{review.name}</h3>
            <p style={{ color: "#47a3d4" }}>
              {review.title} <br />{" "}
            </p>
            <p>{review.rev}</p>
            <br />
            <p> </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
