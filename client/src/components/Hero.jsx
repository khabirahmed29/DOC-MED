import React from "react";
import { ArrowDown, ArrowRight, HeartPulse, Stethoscope } from "lucide-react";
import { hero } from "../assets";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import "../styles/hero.css";

const scrollToSection = (sectionId) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => (
  <section className="hero-section" id="home">
    <div className="hero-inner">
      <div className="hero-copy">
        <Badge variant="secondary" className="hero-eyebrow">
          <span className="hero-eyebrow-icon"><HeartPulse size={16} aria-hidden="true" /></span>
          <span>Care that puts you first</span>
        </Badge>
        <h1>
          We’re determined for <span>your better life.</span>
        </h1>
        <p className="hero-description">
          Get the care you need 24/7, online or in person. Our caring specialist
          doctors are here to help you feel your best.
        </p>
        <div className="hero-actions">
          <Button
            type="button"
            className="hero-primary-button"
            onClick={() => scrollToSection("doctors")}
          >
            <Stethoscope size={18} aria-hidden="true" />
            Explore our doctors
            <ArrowRight size={17} aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="hero-secondary-button"
            onClick={() => scrollToSection("about")}
          >
            Learn about us
            <ArrowDown size={16} aria-hidden="true" />
          </Button>
        </div>
        <div className="hero-trust-note">
          <span className="hero-trust-mark"><HeartPulse size={16} aria-hidden="true" /></span>
          <span>Thoughtful care from doctors you can trust</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image-frame">
          <img src={hero} className="hero-image" alt="A family smiling together" />
        </div>
        <Card className="hero-image-caption">
          <span className="hero-caption-icon"><Stethoscope size={18} aria-hidden="true" /></span>
          <CardContent className="hero-caption-content">
            <CardTitle className="hero-caption-title">Care for every chapter</CardTitle>
            <CardDescription className="hero-caption-description">
              Here for you and your family
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

export default Hero;
