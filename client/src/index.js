import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify'
import { store } from './redux/store';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <ToastContainer />
      <App />
    </ThemeProvider>
  </Provider>
);
