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
    apiKey: "AIzaSyCAU8s3rpHNf9o17nIlJNfts2fgrGAB7cI",
    authDomain: "prosoccerstats-bb26e.firebaseapp.com",
    databaseURL: "https://prosoccerstats-bb26e.firebaseio.com",
    projectId: "prosoccerstats-bb26e",
    storageBucket: "prosoccerstats-bb26e.appspot.com",
    messagingSenderId: "910686527180",
    appId: "1:910686527180:web:85b56cbb1f627fdb822c69",
    measurementId: "G-HR4KRL3N8P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));