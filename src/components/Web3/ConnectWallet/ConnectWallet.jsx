import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import "./connectButton.css";

export default function Web3ConnectWallet() {

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <>
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button className="col button button-fill " onClick={openConnectModal}>CONNECT WALLET</button>
                );
              }
              if (chain.unsupported) {
                return (
                  <div className='connected-wallet wrong-chain' onClick={openChainModal} type="button">
                    Wrong network
                  </div>
                );
              }
              
            })()}
          </>
        );
      }}
      
    </ConnectButton.Custom>
  );
};