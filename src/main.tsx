import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import NewsProvider from './context/NewsProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <NewsProvider>
      <App />
    </NewsProvider>
  </React.StrictMode>,
);
