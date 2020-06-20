import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import 'whatwg-fetch';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDVC94Si2wfDFYhE4PovmbLyHqTBrTFwfo",
    authDomain: "pro-soccer-stats.firebaseapp.com",
    databaseURL: "https://pro-soccer-stats.firebaseio.com",
    projectId: "pro-soccer-stats",
    storageBucket: "pro-soccer-stats.appspot.com",
    messagingSenderId: "155457021823",
    appId: "1:155457021823:web:8085f76e27ab5294ba9c4a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));