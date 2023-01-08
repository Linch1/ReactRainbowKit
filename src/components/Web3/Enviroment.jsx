import React, { useEffect } from 'react';
// setup rainbowkit/ethers/wagmi
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import EnumChainId from '../../enum/chain.id';
import bscChainImage from '../../img/bsc_conn.png';
import useWeb3Hook from '../../hooks/web3Hook';

import { useAccount } from 'wagmi';


let CustomChain = {
  bsc: {
      id: EnumChainId.BSC,
      name: 'Binance Smart Chain',
      nativeCurrency: { name: 'Bnb', symbol: 'BNB', decimals: 18 },
      rpcUrls: {
        default: {
          http: [`https://bsc-dataseed4.binance.org/`]
        },
      },
      blockExplorers: {
        default: {
          name: 'bscscan', url: 'https://bscscan.com'
        },
      },
      hasIcon: true,
      iconUrl: bscChainImage.src,
  },
  bsc_testnet: {
      id: EnumChainId.BSC_TESTNET,
      name: 'Binance Smart Chain Testnet',
      nativeCurrency: { name: 'Bnb', symbol: 'BNB', decimals: 18 },
      rpcUrls: {
        default: {
          http: [`https://data-seed-prebsc-1-s1.binance.org:8545/`]
        },
      },
      blockExplorers: {
        default: {
          name: 'bscscan', url: 'https://testnet.bscscan.com'
        } ,
      },
      hasIcon: true,
      iconUrl: bscChainImage.src,
  },
  ftm_testnet: {
    id: EnumChainId.FTM_TESTNET,
    name: 'Fantom Testnet',
    nativeCurrency: { name: 'ftm', symbol: 'FTM', decimals: 18 },
    rpcUrls: {
      default: {
        http: [`https://fantom-testnet.public.blastapi.io/`]
      },
    },
    blockExplorers: {
      default: {
        name: 'ftmscan', url: 'https://testnet.ftmscan.com'
      },
    },
    hasIcon: true,
    iconUrl: bscChainImage.src,
}
}

const { chains, provider } = configureChains(
	[ CustomChain.bsc, CustomChain.bsc_testnet, CustomChain.ftm_testnet ],
	[
	  publicProvider()
	]
);
  
const { connectors } = getDefaultWallets({
	appName: 'GambleDao',
	chains
});
  
const wagmiClient = createClient({
	autoConnect: true,
	connectors, 
	provider
})


let firstStatus = false;

function WalletListener(){
  
  let {address, provider} = useWeb3Hook();
  let { status, isConnecting, isReconnecting, isConnected, isDisconnected} = useAccount();

  useEffect( () => {
    console.log('[ADDRESS CHANGE]', address);
  }, [address]);

  useEffect( () => {
      if(!firstStatus && (status == 'disconnected' || status == 'connected' )) {
        firstStatus = true;
        console.log('[INTITAL WALLET STATUS]', status);
    }
  }, [status])

  return <></>
}

export default function Web3Enviroment({children}) {


  return (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
            <WalletListener /> 
            {children}	
        </RainbowKitProvider>
    </WagmiConfig>
  );
};