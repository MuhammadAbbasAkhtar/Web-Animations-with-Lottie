import React from "react";
import ReactDOM from "react-dom";
import animationList from './animationList'
import App from "./App";
import fixList from './fixList';

fixList()
if(!localStorage.getItem('list'))
localStorage.setItem('list', JSON.stringify(animationList))
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
