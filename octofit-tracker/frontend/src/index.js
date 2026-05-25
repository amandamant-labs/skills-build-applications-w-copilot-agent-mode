import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Expose API base and log for debugging. Components should use apiUrl() helper.
const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE = codespace
  ? `https://${codespace}-8000.app.github.dev/api/`
  : `${window.location.origin}/api/`;
console.log('API_BASE set to:', API_BASE);
window.API_BASE = API_BASE;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
