import React from 'react';
import './root.css';
import LoginForm from "../login-form/login-form";
import {Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import {Redirect} from "react-router-dom";
import AboutUs from "../about-us/about-us";
import Footer from "../footer/footer";

const Root = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LoginForm}/>
        <Route exact path='/cityInfo/:cityName?' component={LoginForm}/>
        <Route exact path={'/aboutUs'} component={AboutUs}/>
        <Redirect to={'/'}/>
      </Switch>
      <Footer/>
    </>
  )
};

export default Root;
