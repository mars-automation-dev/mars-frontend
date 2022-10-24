import React from 'react';
import MarsLogo from '../../imgs/marsconsulting2.jpg'

const Logo = ({ white, ...props }) => {
  return (
    <img src={MarsLogo} alt={"logo"}/>
  );
};

export default Logo;
