
import { useEffect, useState } from "react";
import ContractAdsManager from "../web3Actors/ContractAdsManager";
import ContractIERC20 from "../web3Actors/ContractToken";
import useWeb3Hook from "./web3Hook";

export default function useWeb3Contracts(){
    
    let [contractToken, setContractToken] = useState(null);
    let [contractAdsManager, setContractAdsManager] = useState(null);
    let { address, provider, signer, chainId } = useWeb3Hook();

    useEffect( () => {
        if( !signer || !signer.data || !address || !provider) return;
        
        let contractAddr = '0x3df7fbF592978B05595006536Be549e7E1bEA487';

        // setContractToken(new ContractIERC20(
        //     provider,
        //     signer.data,
        //     'tokenAdrr',
        //     (err, code, message) => {
        //         console.log('Error: ', err);
        //     },
        //     (res) => {
        //         console.log('Success: ', res);
        //     }
        // ));

        setContractAdsManager(new ContractAdsManager(
            provider,
            signer.data,
            contractAddr,
            (err, code, message) => {
                console.log('Error: ', err);
            },
            (res) => {
                console.log('Success: ', res);
            }
        ));

    }, [signer.data])
   
    return {
        contractToken,
        contractAdsManager
    }
}