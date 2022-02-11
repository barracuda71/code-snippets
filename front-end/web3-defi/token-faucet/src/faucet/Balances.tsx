import React, {useEffect} from 'react';
import styled from "@emotion/styled";
import {observer} from "mobx-react-lite";
import {useDataStore} from "../index";
import {Token} from "../domain/models";
import {useRefreshBalance} from "../domain/hooks/useRefreshBalance";

const BalancesStyled = styled.div`
    text-align: right;
    color: #959EBD;
    font-size: 14px;
`

export const Balances = observer(() => {
    const store = useDataStore();
    const {balances} = store;
    const refreshBalance = useRefreshBalance();
    useEffect(() => {
        const interval = setInterval(() => {
            refreshBalance(Token.USDT);
            refreshBalance(Token.EYWA);
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    if(!store.publicKey){
        return null;
    }
    return (
        <BalancesStyled>
            EYWA balance: {balances[Token.EYWA]}; USDT balance: {balances[Token.USDT]}
        </BalancesStyled>
    )
});