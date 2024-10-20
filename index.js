import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // You can create this file for basic global styles
import App from './App';  // This assumes you have an App.js file

// Render the App component to the root div in the public/index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
