import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Link to="about">About Us</Link>
    </div>
  );
};
export default About;
