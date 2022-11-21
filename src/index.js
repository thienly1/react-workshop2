import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoRouter from './DemoRouter';
import 'bootstrap/dist/css/bootstrap.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DemoRouter />
  </React.StrictMode>
);

