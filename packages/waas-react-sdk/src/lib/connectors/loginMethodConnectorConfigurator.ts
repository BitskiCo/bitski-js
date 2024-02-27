import { LoginMethod } from '../components/BitskiWidget/constants';
import connectorIconPasskey from '../assets/connector-icon-passkey.svg';
import connectorIconSms from '../assets/phone.svg';
import connectorIconGoogle from '../assets/google.svg';
import connectorIconApple from '../assets/apple.svg';
import connectorIconX from '../assets/x.svg';

import { Bitski } from 'bitski';
import { CONNECTOR_TYPE_BITSKI } from './bitski';

const APPLE_LOGIN_HINT = 'fa_ZWY0YTdjNTAtZDkzZC00YmI4LWI3MTktYzFjNDU0ZjRkMTYw';
const GOOGLE_LOGIN_HINT = 'fa_NTcyYjUyZWUtZjk4Yi00NTdhLTgzOTItYzI2MjM0YTU0MjIx';
const X_LOGIN_HINT = 'fa_NzBmODA3MzEtNmVhYy00OWFlLWI4YzMtNjdlYjBjYzBkMzA2';

interface LoginMethodConfigurator {
  id: string;
  name: string;
  type: string;
  icon?: string;
  loginHint?: string;
  login: (bitski: Bitski, extras?: { email?: string; phoneNumber?: string }) => Promise<void>;
}

export function configurator(loginMethod: LoginMethod, email?: string): LoginMethodConfigurator {
  switch (loginMethod) {
    case LoginMethod.Wallet:
      throw new Error('External Wallets should use their own Connectors');
    case LoginMethod.Email:
      return {
        id: loginMethod,
        name: 'Email',
        icon: connectorIconPasskey,
        type: CONNECTOR_TYPE_BITSKI,
        // Login hint needed on email and phone number for signer handling
        loginHint: email,
        async login(
          bitski: Bitski,
          extras?: { email?: string; phoneNumber?: string },
        ): Promise<void> {
          const email = extras?.email;
          if (!email) {
            throw new Error('Must supply an email');
          }
          await bitski.start({
            login_hint: email,
            prompt: 'login',
          });
        },
      };
    case LoginMethod.Google:
      return {
        id: loginMethod,
        name: 'Google',
        icon: connectorIconGoogle,
        type: CONNECTOR_TYPE_BITSKI,
        loginHint: GOOGLE_LOGIN_HINT,
        async login(
          bitski: Bitski,
          extras?: { email?: string; phoneNumber?: string },
        ): Promise<void> {
          await bitski.start({
            login_hint: GOOGLE_LOGIN_HINT,
            prompt: 'login',
          });
        },
      };
    case LoginMethod.Apple:
      return {
        id: 'apple',
        name: 'Apple',
        icon: connectorIconApple,
        type: CONNECTOR_TYPE_BITSKI,
        loginHint: APPLE_LOGIN_HINT,
        async login(
          bitski: Bitski,
          extras?: { email?: string; phoneNumber?: string },
        ): Promise<void> {
          await bitski.start({
            login_hint: APPLE_LOGIN_HINT,
            prompt: 'login',
          });
        },
      };
    case LoginMethod.X:
      return {
        id: loginMethod,
        name: 'X',
        icon: connectorIconX,
        type: CONNECTOR_TYPE_BITSKI,
        loginHint: X_LOGIN_HINT,
        async login(
          bitski: Bitski,
          extras?: { email?: string; phoneNumber?: string },
        ): Promise<void> {
          await bitski.start({
            login_hint: X_LOGIN_HINT,
            prompt: 'login',
          });
        },
      };
    case LoginMethod.Sms:
      return {
        id: loginMethod,
        name: 'SMS',
        icon: connectorIconSms,
        type: CONNECTOR_TYPE_BITSKI,
        // Login hint needed on email and phone number for signer handling
        loginHint: 'sms',
        async login(
          bitski: Bitski,
          extras?: { email?: string; phoneNumber?: string },
        ): Promise<void> {
          const phoneNumber = extras?.phoneNumber;
          if (!phoneNumber) {
            throw new Error('Must supply an phone number');
          }
          const e164Pattern = /^\+[1-9]\d{1,14}$/;
          if (!e164Pattern.test(phoneNumber)) {
            throw new Error('Phone number must be in E164 format');
          }
          const loginHint = `fa_${btoa(`6e398039-7a33-4ad9-94c6-2ca2a091adcf:${phoneNumber}`)}`;
          await bitski.start({
            login_hint: loginHint,
            prompt: 'login',
          });
        },
      };
  }
}
