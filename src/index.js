import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Web3Enviroment from './components/Web3/Enviroment';
import Web3ConnectWallet from './components/Web3/ConnectWallet/ConnectWallet';
import Web3ConnectedAccount from './components/Web3/ConnectedAccount/ConnectedAccount';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3Enviroment>
      <Web3ConnectWallet />
      <Web3ConnectedAccount />
      <div>ciao sono qui</div>
    </Web3Enviroment>
  </React.StrictMode>,
);