export interface TokenBalance {
  amount: string;
  amountUSD: string;
  name: string;
  image?: string;
}

interface Tokens {
  totalBalanceUsd: string;
  balances: TokenBalance[];
}

export enum TokenStateKind {
  NoAddress = 'noAddress',
  Loading = 'loading',
  Tokens = 'tokens',
  Error = 'error',
}

export type TokensState =
  | { kind: TokenStateKind.NoAddress }
  | { kind: TokenStateKind.Loading; address: string; chainId: number }
  | { kind: TokenStateKind.Tokens; address: string; chainId: number; tokens: Tokens }
  | { kind: TokenStateKind.Error; address: string; chainId: number };

export enum TokenActionKind {
  FetchStart = 'Fetch Start',
  FetchSuccess = 'Fetch Success',
  FetchError = 'Fetch Error',
}

export type TokenAction =
  | {
      kind: TokenActionKind.FetchSuccess;
      address: string;
      chainId: number;
      tokens: Tokens;
    }
  | {
      kind: TokenActionKind.FetchStart;
      address: string;
      chainId: number;
    }
  | {
      kind: TokenActionKind.FetchError;
      address: string;
      chainId: number;
    };

export function tokensReducer(tokensState: TokensState, action: TokenAction): TokensState {
  switch (action.kind) {
    case TokenActionKind.FetchStart:
      return {
        kind: TokenStateKind.Loading,
        address: action.address,
        chainId: action.chainId,
      };
    case TokenActionKind.FetchSuccess:
      switch (tokensState.kind) {
        case TokenStateKind.NoAddress:
          break;
        default:
          if (tokensState.address != action.address) {
            // Fetch does not match current address
            return tokensState;
          }
      }
      return {
        kind: TokenStateKind.Tokens,
        address: action.address,
        chainId: action.chainId,
        tokens: action.tokens,
      };
    case TokenActionKind.FetchError:
      return {
        kind: TokenStateKind.Error,
        address: action.address,
        chainId: action.chainId,
      };
  }
}
