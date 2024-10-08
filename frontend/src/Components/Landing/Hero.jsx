import React from "react";
import heroImage from "/Users/giang/Pepper/frontend/src/assets/dog-walking.jpg";
import "/Users/giang/Pepper/frontend/src/App.css";

const Hero = () => {
  return (
    <section className="hero" /*style={{ backgroundImage: `url(${heroImage})` }}*/>
      <div className="hero-content">
        <h1 id="company-name">Pepper's Happy Trails</h1>
        <p>lonely pets no more, a caring friend for your best friend</p>
        <button
          className="cta-button"
          onClick={() => (window.location.href = "/frontend/src/pages/Reservation.jsx")}>
          <a href="/reservation">Join our Trail</a>
        </button>
      </div>
    </section>
  );
};

export default Hero;
