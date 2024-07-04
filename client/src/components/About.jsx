import { docnurse, healthCare } from "../assets";

const About = () => {
  return (
    <section className="about" id="about">
      <h3 className="sub-heading"> about us </h3>
      <h1 className="heading"> why choose us? </h1>

      <div className="row">
        <div className="image">
          <img
            className="about-image"
            src={docnurse}
            style={{ height: "50rem", borderRadius: "5rem" }}
            alt=""
          />
        </div>

        <div className="content">
          <h3>We are developing a healthcare system around you</h3>
          <p>
            We think that everyone should have easy access to excellent
            healthcare. Our aim is to make the procedure as simple as possible
            for our patients and to offer treatment no matter where they are —
            in person or at their convenience.
          </p>
          <p>
            We are committed to delivering medical solutions for even the most
            difficult cases for the benefit of patients from around the world.
          </p>
          <div className="icons-container">
            <div className="icons">
              <i class="fa-solid fa-house-medical-circle-check"></i>
              <span>Clinical Excellence</span>
            </div>
            <div className="icons">
              <i class="fa-solid fa-user-doctor"></i>
              <span>Personalized Care</span>
            </div>
            <div className="icons">
              <i className="fas fa-headset"></i>
              <span>24/7 service</span>
            </div>
          </div>
          {/* <a href="#" className="btn">know more</a> */}
          <br />
          <br />
          <br />
          <br />
          <h2>
            more about recent technologies used by us in our health care
            centers.
          </h2>
          <h3>Cutting Edge Technologies</h3>
          <p>
            We provide a hospital experience at par with global standards using
            cutting-edge technologies for invasive as well as non-invasive
            treatments.
          </p>
          {/* <a href="#" className="btn">know more</a> */}

          <p> </p>
        </div>
      </div>
    </section>
  );
};

export default About;
