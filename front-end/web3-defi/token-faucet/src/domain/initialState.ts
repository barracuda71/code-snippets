import {State} from "./State";
import {Token} from "./models";

export const initialState: (data:{} | void)=>State = (data = {}) => ({
  tokens: [ Token.USDT, Token.EYWA],
  balances: {
    [Token.USDT]: 0,
    [Token.EYWA]: 0,
  },
  tokenAddresses: {
    [Token.USDT]: '0xa9E233E2c06fbAFf7d1D913060d5F4e159092414',
    [Token.EYWA]: '0x08Ffcb0Ca216Bb3C12855910Ee4014191D81eeba',
  },
  currentToken: Token.USDT,
  publicKey: '',
});