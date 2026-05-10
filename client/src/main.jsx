/**
 * main.jsx — React Application Entry Point
 * ─────────────────────────────────────────────────────────────
 * Mounts the React app into the #root div defined in index.html.
 * React.StrictMode enables extra development warnings/checks.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
