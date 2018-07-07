//Node Modules
import React from 'react';
import { render } from 'react-dom';
import Router from "./components/Router";

//Styles
import "./css/style.css";

//Render application to #main
render(<Router />, document.querySelector('#main'))