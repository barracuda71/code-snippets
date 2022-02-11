import { action } from 'mobx';
import {State} from "./State";
import {Token} from "./models";

export interface Actions {
  setCurrentToken: (token: Token) => void;
  setPublicKey: (publicKey: string) => void;
  setBalance: (token: Token, balance: number)  => void;
}

export const actions = (state: State): Actions => ({
  setCurrentToken: action((token: Token) => {
    state.currentToken = token;
  }),
  setPublicKey: action( (publicKey: string) => {
    state.publicKey = publicKey;
  }),
  setBalance: action((token: Token, balance: number) => {
    state.balances[token] = balance;
  }),
});