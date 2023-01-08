import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import "./connectedAccount.css";

import { useAccount, useDisconnect } from "wagmi";
import useWeb3Hook from '../../../hooks/web3Hook';

export default function Web3ConnectedAccount() {
  const { disconnect } = useDisconnect()

  const { address, status } = useAccount();
  const { chainId } = useWeb3Hook ();
  
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        mounted,
      }) => {

        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
                if (
                    ( !mounted || !account || !chain ) ||
                    chain.unsupported 
                ) {
                    return <span><i>wallet not connected</i></span>;
                }
                return (
                  <div>
                    <span>{address}</span>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                      
                      <button className="button button-small button-to-popover" style={{width: 'auto'}} onClick={disconnect}>DISCONNECT</button>    
                    </div>                    
                    
                  </div>
                );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};