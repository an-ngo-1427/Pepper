import React from "react";
import heroImage from "../../assets/dog-walking.jpg";
import "../../App.css";

const Hero = () => {
  return (
    <section className="hero" /*style={{ backgroundImage: `url(${heroImage})` }}*/>
      <div className="hero-content">
        <h1 id="company-name">Pepper's Happy Trails</h1>
        <p>lonely pets no more, a caring friend for your best friend</p>
      </div>
    </section>
  );
};

export default Hero;
