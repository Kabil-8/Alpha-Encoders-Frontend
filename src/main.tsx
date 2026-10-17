import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Initialize React DOM
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Dismiss pre-boot loader as soon as React has mounted
if (typeof window !== 'undefined') {
  requestAnimationFrame(() => {
    (window as any).__RB_FINISH_BOOT__?.();
  });
}
