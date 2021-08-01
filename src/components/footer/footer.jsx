import React from "react";
import './footer.scss';
import {Link} from "react-router-dom";

const Footer = () => {

  return (
    <div className={'footer'}>
      <Link to='/aboutUs' className={'aboutUs'}>О НАС</Link>
      <div className={'trademark'}>ГОРОДА&#174;</div>
    </div>
  )
}

export default Footer;
