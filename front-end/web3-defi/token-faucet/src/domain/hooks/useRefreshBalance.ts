import {useDataStore} from "../../index";
import {Token} from "../models";
import {balanceAbi} from "../../abis/balance-abi";

export const useRefreshBalance = () => {
    const store = useDataStore();
    const {tokenAddresses, publicKey} = store;
    return (token: Token) => {
        const contractAddress = tokenAddresses[token];
        const tokenContract = new window.web3.eth.Contract(balanceAbi, contractAddress);
        tokenContract.methods.balanceOf(publicKey).call().then((balance: number) => {
            store.setBalance(token, balance);
        });
    };
};