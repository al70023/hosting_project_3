import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GoogleTranslate from './GoogleTranslate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <label class="text-xl">Google Translate:</label>
    <GoogleTranslate />
    <App />
    
  </div>
);


