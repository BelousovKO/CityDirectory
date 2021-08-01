import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Root from './components/root/root';

const rootElement = document.querySelector('#root');

ReactDOM.render(
  <BrowserRouter>
    <Root/>
  </BrowserRouter>,
  rootElement
);


