import React from "react";
import { reviews } from "../constants";

const Reviews = () => {
  return (
    <div className="box-container">
      {reviews.map((review, index) => (
        <article className="review-card" key={`${review.name}-${index}`}>
          <div className="review-card-image">
            <img src={review.img} alt="" />
          </div>
          <div className="review-card-content">
            <h3>{review.name}</h3>
            <p className="review-title">
              {review.title} <br />{" "}
            </p>
            <p>{review.rev}</p>
            <br />
            <p> </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Reviews;
