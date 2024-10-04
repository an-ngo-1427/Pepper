import React from "react";
import Hero from "../Components/Landing/Hero.jsx";
import Footer from "../Components/Landing/Footer";
import "../App.css";
import pepperTrail from "../assets/pepper-trail.jpeg";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// const url = require('../assets/pepper-trail.jpeg')
const LandingPage = () => {
  console.log(pepperTrail)
  return (
    <div>
      <Hero />

      <section
        className="info-section"
        style={{ backgroundImage: `url(${pepperTrail})`, height: '100vh', backgroundBlendMode: 'multiply', backgroundSize: 'cover' }}

      >
        <h2
          style={{
            padding: '15px',
            color: 'black',
            fontWeight:'bold'
          }}
        >Why Choose Pepper's Happy Trails?</h2>
        <Box
          w='500px'
          ml='25px'
        >
          <p
            style={{
              fontSize: '30px',
              width: '500px',
              fontWeight: 'bold',
              color: 'black',
              padding: '30px'
            }}
          >
            " Here, at Pepper's, our everyday's goal is to makesure that your pet enjoy all the best
            that life has to offer. The safety & well-being of your furry loved ones is our utmost
            priority."
          </p>
          <Button
            bg='#aa9f88'
            _hover={{ cursor: 'pointer', bg: '#534734' }}
            style={{
              width: '100px'

            }}
          ><Link to='/signup'>Sign Up</Link></Button>

        </Box>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
