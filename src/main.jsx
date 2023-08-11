import React from 'react';
import ReactDOM from 'react-dom/client';
import Gameboard from './components/GameBoard';
import Layout from './components/Layout';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Layout>
    <Gameboard />
  </Layout>,
  // </React.StrictMode>,
);
