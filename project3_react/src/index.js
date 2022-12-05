import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GoogleTranslate from './GoogleTranslate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <GoogleTranslate />
  </React.StrictMode>
);


