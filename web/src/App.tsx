import React from 'react';

import Routes from './routes';
import { ToastContainer } from 'react-toastify';

import './App.module.scss';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
