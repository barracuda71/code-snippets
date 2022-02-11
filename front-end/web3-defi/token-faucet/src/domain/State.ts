import {Token} from "./models";

export interface State {
  balances: Record<Token, number>;
  tokenAddresses: Record<Token, string>
  tokens: Token[];
  currentToken: Token;
  publicKey: string;
}