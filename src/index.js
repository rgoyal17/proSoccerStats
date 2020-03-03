import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'whatwg-fetch';
import 'firebase/app';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));