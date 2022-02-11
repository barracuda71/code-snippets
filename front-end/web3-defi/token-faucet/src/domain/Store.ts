import { extendObservable } from 'mobx';
import {initialState} from "./initialState";
import {Actions, actions} from "./actions";
import {State} from "./State";
import {Token} from "./models";


export class Store  implements State, Actions {
  constructor() {
    extendObservable(this, {
      ...initialState(),
      ...actions(this)
    });
  }

  balances!: Record<Token, number>;
  tokenAddresses!: Record<Token, string>;
  currentToken!: Token;
  publicKey!: string;
  tokens!: Token[];

  setCurrentToken!: (token: Token) => void;
  setPublicKey!: (publicKey: string) => void;
  setBalance!: (token: Token, balance: number)  => void;
}

export const store = new Store();

export function createStore() {
  return store;
}
