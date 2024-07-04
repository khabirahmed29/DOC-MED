import { hero } from "../assets";
import { Link } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <section class="home" id="home">
      <div class="swiper-container home-slider">
        <div class="swiper-slide slide">
          <div class="content">
            <h3>
              We're <strong> determined</strong> for
              <br />
              your <strong> better </strong> life. <br />
            </h3>
            <br /> <br />
            <h6 class="small">
              You can get the care you need 24/7 – be it online or in person.{" "}
              <br />
              You will be treated by caring specialist doctors.
            </h6>
            <br />
            {/* <Link to="/DOCMED/login">
              <a className="btn">join as doctor</a>
            </Link> */}
          </div>
          <div class="image">
            <img src={hero} className="heroimg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
