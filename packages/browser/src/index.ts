import type { Bitski, BitskiSDKOptions } from './-private/bitski';
import { processCallback } from './-private/utils/callback';
import { loadScript } from './load';

export type { Store } from './-private/utils/store';

export type { ConnectButtonSize, ConnectButtonOptions } from './-private/components/connect-button';

export type { User } from './-private/auth/user';

export type {
  AuthenticationError,
  AuthenticationErrorCode,
} from './-private/errors/authentication-error';
export type { ParseError, ParseErrorCode } from './-private/errors/parse-error';
export type { SignerError, SignerErrorCode } from './-private/errors/signer-error';

export type { SignInOptions } from './-private/auth/oauth-manager';

export type {
  OAuthSignInMethod,
  AuthenticationStatus,
  Bitski,
  BitskiSDKOptions,
  ProviderOptions,
} from './-private/bitski';

export type {
  Network,
  BinanceSmartChain,
  BinanceSmartChainTestnet,
  Mainnet,
  Goerli,
  Polygon,
  Mumbai,
} from 'bitski-provider';

export async function createBitski(
  clientId: string,
  redirectUri?: string,
  additionalScopes?: string[],
  options?: BitskiSDKOptions,
): Promise<Bitski | null> {
  const Bitski = await loadScript();

  return Bitski ? new Bitski(clientId, redirectUri, additionalScopes, options) : null;
}

/**
 * Alternative to using our static callback.html file. Call this from your own redirect page.
 */
export const popupCallback = processCallback;

// Note: duplicated so we don't include the whole module
export const LOGIN_HINT_SIGNUP = 'signup';
