import React from "react";
import Reviews from "./Revies";

const Library = () => {
  return (
    <section className="library home-section">
      <p className="home-section-kicker">Patient stories</p>
      <h2 className="home-section-heading">What people say about us</h2>
      <Reviews />
      {/* <h3 className="sub-heading">PS4</h3>
            <h1 className="heading">Play station originals</h1>
            <PS4 />
            <br /><br /> */}
    </section>
  );
};

export default Library;
