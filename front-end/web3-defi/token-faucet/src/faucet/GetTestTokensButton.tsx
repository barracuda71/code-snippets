import React, {useCallback} from 'react';
import styled from "@emotion/styled";
import {useDataStore} from "../index";
import {mintAbi} from "../abis/mint-abi";
import {useRefreshBalance} from "../domain/hooks/useRefreshBalance";
import {observer} from "mobx-react-lite";

const StyledButton = styled.div`
    height: 56px;
    width: 100%;
    margin-top: 10px;
    border-radius: 8px;
    background-color: #0CCFAC;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    '&:hover': {
      background-color: #0ACCA9;
    },
`

export const GetTestTokensButton = observer(() => {
    const store = useDataStore();
    const {tokenAddresses, publicKey, currentToken} = store;
    const refreshBalance = useRefreshBalance();
    const onClickHandler = useCallback(() => {
        const contractAddress = tokenAddresses[currentToken];
        const tokenContract = new window.web3.eth.Contract(mintAbi, contractAddress);
        tokenContract.methods.mint(publicKey, 1)
            .send({ from: publicKey })
            .then(() => {
            refreshBalance(currentToken);
        });
    }, [currentToken, publicKey]);
    if(!store.publicKey){
        return null;
    }
    return (
        <StyledButton onClick={onClickHandler}>
            GET TEST TOKENS
        </StyledButton>
    )
});