import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Enable smooth scrolling for the whole app
document.documentElement.style.scrollBehavior = 'smooth';

// Fix TypeScript error for requestAnimationFrame
declare global {
  interface Window {
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);