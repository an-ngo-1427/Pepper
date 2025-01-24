import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{backgroundColor:'red'}}>
      <Link to="/">Home</Link>
      <Link to="/dogs">View Dogs</Link>
      <Link to="/walks">Schedule Walks</Link>
    </nav>
  );
};

export default Navbar;
