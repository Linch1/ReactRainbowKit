
import { useAccount, useDisconnect, useProvider, useSigner, useSignMessage, useNetwork } from "wagmi";

export default function useWeb3Hook(){
    let onError = (error) => {
        window.popup.alert(error.message, false);
    }
    
    let provider = useProvider();
    let account = useAccount({ onError: onError });
    let {chain} = useNetwork();
   
    return {
        account: account,
        address: account ? account.address : null,
        disconnect: useDisconnect(),
        signature: useSignMessage({ onError: onError }),
        signer: useSigner(),
        provider: provider,
        chainId: chain ? chain.id : -1,
        chainName: chain ? chain.name : ''
    }
}