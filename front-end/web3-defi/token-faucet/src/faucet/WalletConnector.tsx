import Web3 from 'web3';
import Web3Modal from 'web3modal';
import {useDataStore} from "../index";
import {observer} from "mobx-react-lite";
import styled from "@emotion/styled";
import React, {useState} from "react";
import {AlertDialog} from "../components/alert";
import {PublicKeyLoggedIn} from "./PublicKeyLoggedIn";

const ConnectWalletButton = styled.div`
    height: 56px;
    width: 192px;
    border-radius: 8px;
    background-color: #0CCFAC;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    '&:hover': {
      background-color: #0ACCA9;
    },
`

const ButtonText = styled.div`
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
`

const web3Modal = new Web3Modal({
  network: "rinkeby",
  cacheProvider: true,
});

export const WalletConnector = observer(() => {
  const store = useDataStore();
  
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState<boolean>(false);

  const handleConnectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      store.setPublicKey(accounts?.[0]);
      (window as any).web3 = web3;
      (window as any).web3Modal = web3Modal;
      (window as any).web3Provider = provider;
      //routing.push('/get-test-tokens');
    }
    catch (e) {
      setIsErrorAlertOpen(true);
    }

  };

  return (
      <>
        {
          store.publicKey ? (
            <PublicKeyLoggedIn/>
          )
          : (
            <ConnectWalletButton onClick={handleConnectWallet}>
              <ButtonText>Connect Wallet</ButtonText>
            </ConnectWalletButton>
          )
        }

        <AlertDialog isOpen={isErrorAlertOpen} onButtonClicked={() => setIsErrorAlertOpen(false)}
                     text={'Please make sure MetaMask is installed.'}/>
      </>
  );
});