// Ensure window.fetch is writable and has a setter to prevent "Cannot set property fetch of #<Window> which has only a getter"
(function ensureFetchSetter() {
  try {
    const root = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : null;
    if (!root) return;
    let currentFetch = typeof root.fetch === 'function' ? root.fetch.bind(root) : root.fetch;
    try {
      Object.defineProperty(root, 'fetch', {
        get() {
          return currentFetch;
        },
        set(fn) {
          currentFetch = fn;
        },
        configurable: true,
        enumerable: true,
      });
    } catch {}

    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        const desc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
        if (desc && !desc.set && desc.configurable) {
          Object.defineProperty(Window.prototype, 'fetch', {
            get() {
              return currentFetch;
            },
            set(fn) {
              currentFetch = fn;
            },
            configurable: true,
            enumerable: desc.enumerable,
          });
        }
      } catch {}
    }
  } catch {}
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
