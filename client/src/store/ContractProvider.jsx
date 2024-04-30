import React, { useState} from 'react';
import { ethers } from "ethers";

import abi from "../artifacts/contracts/Share.sol/Share.json";

import ContractContext from './ContractContext';

export default function ContractProvider({children}) {
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [isConnected, setIsConnected] = useState();

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
     //const contractAddress = "0xEa40749cfc271cFFD4904F14b9b666391a9fafD9";

    const connectAccount = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);

        window.ethereum.on("chainChanged", () => window.location.reload());
        window.ethereum.on("accountsChanged", () => window.location.reload());
    
        if (provider) {
          const signer = await provider.getSigner();
          let account_ = await signer.getAddress();
          setAccount(account_);
          setIsConnected(true);
    
          const contract_ = new ethers.Contract(contractAddress, abi.abi, signer);
          setContract(contract_);
        } else {
          console.log("No metamask");
        }
    }
     
  return (
    <ContractContext.Provider value={{
        contract : contract,
        account : account,
        isConnected : isConnected,
        connectAccount : connectAccount,
    }}>
      {children}
    </ContractContext.Provider>
  )
}
