import { docnurse } from "../assets";
import { Headset, HeartPulse, Stethoscope } from "lucide-react";
import { Badge } from "./ui/badge";

const About = () => {
  return (
    <section className="about about-section home-section" id="about">
      <p className="home-section-kicker">About DOCMED</p>
      <h2 className="home-section-heading">Why choose us?</h2>

      <div className="row">
        <div className="image">
          <img
            className="about-image"
            src={docnurse}
            style={{ height: "50rem", borderRadius: "5rem" }}
            alt="A doctor and nurse providing care"
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
              <Badge variant="outline" className="icons">
                <HeartPulse aria-hidden="true" />
                <span>Clinical Excellence</span>
              </Badge>
              <Badge variant="outline" className="icons">
                <Stethoscope aria-hidden="true" />
                <span>Personalized Care</span>
              </Badge>
              <Badge variant="outline" className="icons">
                <Headset aria-hidden="true" />
                <span>24/7 service</span>
              </Badge>
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
              We provide a hospital experience at par with global standards
              using cutting-edge technologies for invasive as well as
              non-invasive treatments.
            </p>
            {/* <a href="#" className="btn">know more</a> */}

            <p> </p>
        </div>
      </div>
    </section>
  );
};

export default About;
