import { User } from 'oidc-client';
import { AuthProvider, OAuthProviderIntegrationType } from '../auth/auth-provider';

/**
 * Sizing options for the Bitski connect button.
 */
export enum ConnectButtonSize {
  SMALL,
  MEDIUM,
  LARGE,
}

/**
 * A button used to connect to Bitski.
 */
export class ConnectButton {
  public element: HTMLElement;
  public size: ConnectButtonSize;
  public callback?: (error?: Error, user?: User) => void;
  private authProvider: AuthProvider;
  private authIntegrationType: OAuthProviderIntegrationType;
  private defaultColor: string = '#298FFF';
  private activeColor: string = '#1A7CE6';

  /**
   * @param bitskiInstance An instance of Bitski to sign into
   * @param existingDiv An existing div to turn into a connect button
   */
  constructor(
    authProvider: AuthProvider,
    existingDiv?: HTMLElement,
    size: ConnectButtonSize = ConnectButtonSize.MEDIUM,
    authIntegrationType: OAuthProviderIntegrationType = OAuthProviderIntegrationType.POPUP,
    callback?: (error?: Error, user?: User) => void
  ) {
    this.authProvider = authProvider;
    this.size = size;
    this.authIntegrationType = authIntegrationType;
    this.element = document.createElement('button');
    this.callback = callback;
    this.setDefaultStyle();

    this.element.addEventListener('click', this.signin.bind(this));
    this.element.addEventListener('mousedown', this.focus.bind(this));
    this.element.addEventListener('mouseup', this.blur.bind(this));
    this.element.addEventListener('mouseout', this.blur.bind(this));
    this.element.addEventListener('focus', this.focus.bind(this));
    this.element.addEventListener('blur', this.blur.bind(this));

    if (existingDiv) {
      existingDiv.appendChild(this.element);
    }
  }

  /**
   * Removes the button from the page
   */
  public remove() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  private signin() {
    this.authProvider.signIn(this.authIntegrationType).then((user: User) => {
      if (this.callback) {
        this.callback(undefined, user);
      }
    }).catch((error: Error) => {
      if (this.callback) {
        this.callback(error, undefined);
      }
    });
  }

  private focus() {
    this.element.style.backgroundColor = this.activeColor;
  }

  private blur() {
    this.element.style.backgroundColor = this.defaultColor;
  }

  private setDefaultStyle() {
    this.element.title = 'Continue with Bitski';
    this.element.innerText = 'Continue with Bitski';

    this.element.style.fontFamily = '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, \'Helvetica Neue\', sans-serif';
    this.element.style.fontWeight = 'bold';
    this.element.style.backgroundColor = '#298FFF';
    this.element.style.backgroundRepeat = 'no-repeat';
    this.element.style.backgroundPositionY = '50%';
    this.element.style.color = '#fff';
    this.element.style.border = 'none';
    this.element.style.margin = '0';
    this.element.style.padding = '0';
    this.element.style.cursor = 'pointer';

    switch (this.size) {
      case ConnectButtonSize.SMALL:
        this.configureForSmall();
        break;
      case ConnectButtonSize.MEDIUM:
        this.configureForMedium();
        break;
      case ConnectButtonSize.LARGE:
        this.configureForLarge();
        break;
    }
  }

  private setAttributes(attributes: object) {
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        this.element.style[key] = attributes[key];
      }
    }
  }

  private configureForSmall() {
    // tslint:disable-next-line
    const logoSm = 'PHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MDguMDAwMDAwLCAtMTk3LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPg0KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAyLjAwMDAwMCwgMTkzLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05LjA3NjY2MjI0LDQgTDE0LjkyMzMzNzgsNCBDMTUuOTkzMTYwMiw0IDE2LjM4MTEwMzcsNC4xMTEzOTA3MyAxNi43NzIyMTQ4LDQuMzIwNTU5MjQgQzE3LjE2MzMyNiw0LjUyOTcyNzc2IDE3LjQ3MDI3MjIsNC44MzY2NzQwNCAxNy42Nzk0NDA4LDUuMjI3Nzg1MTYgQzE3Ljg4ODYwOTMsNS42MTg4OTYyNyAxOCw2LjAwNjgzOTc1IDE4LDcuMDc2NjYyMjQgTDE4LDEyLjkyMzMzNzggQzE4LDEzLjk5MzE2MDIgMTcuODg4NjA5MywxNC4zODExMDM3IDE3LjY3OTQ0MDgsMTQuNzcyMjE0OCBDMTcuNDcwMjcyMiwxNS4xNjMzMjYgMTcuMTYzMzI2LDE1LjQ3MDI3MjIgMTYuNzcyMjE0OCwxNS42Nzk0NDA4IEMxNi4zODExMDM3LDE1Ljg4ODYwOTMgMTUuOTkzMTYwMiwxNiAxNC45MjMzMzc4LDE2IEw5LjA3NjY2MjI0LDE2IEM4LjAwNjgzOTc1LDE2IDcuNjE4ODk2MjcsMTUuODg4NjA5MyA3LjIyNzc4NTE2LDE1LjY3OTQ0MDggQzYuODM2Njc0MDQsMTUuNDcwMjcyMiA2LjUyOTcyNzc2LDE1LjE2MzMyNiA2LjMyMDU1OTI0LDE0Ljc3MjIxNDggQzYuMTExMzkwNzMsMTQuMzgxMTAzNyA2LDEzLjk5MzE2MDIgNiwxMi45MjMzMzc4IEw2LDcuMDc2NjYyMjQgQzYsNi4wMDY4Mzk3NSA2LjExMTM5MDczLDUuNjE4ODk2MjcgNi4zMjA1NTkyNCw1LjIyNzc4NTE2IEM2LjUyOTcyNzc2LDQuODM2Njc0MDQgNi44MzY2NzQwNCw0LjUyOTcyNzc2IDcuMjI3Nzg1MTYsNC4zMjA1NTkyNCBDNy42MTg4OTYyNyw0LjExMTM5MDczIDguMDA2ODM5NzUsNCA5LjA3NjY2MjI0LDQgWiBNNy41NTQ5MjIyMyw4LjI4NTcxNDI5IEM3LjQ2MTMxMjc2LDguMjg1NzE0MjkgNy40MjczNjc3MSw4LjI5NTQ2MDk3IDcuMzkzMTQ1NDksOC4zMTM3NjMyMiBDNy4zNTg5MjMyNiw4LjMzMjA2NTQ2IDcuMzMyMDY1NDYsOC4zNTg5MjMyNiA3LjMxMzc2MzIyLDguMzkzMTQ1NDkgQzcuMjk1NDYwOTcsOC40MjczNjc3MSA3LjI4NTcxNDI5LDguNDYxMzEyNzYgNy4yODU3MTQyOSw4LjU1NDkyMjIzIEw3LjI4NTcxNDI5LDEzLjUyNjcxMDQgQzcuMjg1NzE0MjksMTMuNjIwMzE5OSA3LjI5NTQ2MDk3LDEzLjY1NDI2NDkgNy4zMTM3NjMyMiwxMy42ODg0ODcyIEM3LjMzMjA2NTQ2LDEzLjcyMjcwOTQgNy4zNTg5MjMyNiwxMy43NDk1NjcyIDcuMzkzMTQ1NDksMTMuNzY3ODY5NCBDNy40MjczNjc3MSwxMy43ODYxNzE3IDcuNDYxMzEyNzYsMTMuNzk1OTE4NCA3LjU1NDkyMjIzLDEzLjc5NTkxODQgTDcuOTM3OTAxMTMsMTMuNzk1OTE4NCBDOC4wMzE1MTA1OSwxMy43OTU5MTg0IDguMDY1NDU1NjUsMTMuNzg2MTcxNyA4LjA5OTY3Nzg3LDEzLjc2Nzg2OTQgQzguMTMzOTAwMDksMTMuNzQ5NTY3MiA4LjE2MDc1Nzg5LDEzLjcyMjcwOTQgOC4xNzkwNjAxNCwxMy42ODg0ODcyIEM4LjE5NzM2MjM4LDEzLjY1NDI2NDkgOC4yMDcxMDkwNywxMy42MjAzMTk5IDguMjA3MTA5MDcsMTMuNTI2NzEwNCBMOC4yMDcxMDkwNyw4LjU1NDkyMjIzIEM4LjIwNzEwOTA3LDguNDYxMzEyNzYgOC4xOTczNjIzOCw4LjQyNzM2NzcxIDguMTc5MDYwMTQsOC4zOTMxNDU0OSBDOC4xNjA3NTc4OSw4LjM1ODkyMzI2IDguMTMzOTAwMDksOC4zMzIwNjU0NiA4LjA5OTY3Nzg3LDguMzEzNzYzMjIgQzguMDY1NDU1NjUsOC4yOTU0NjA5NyA4LjAzMTUxMDU5LDguMjg1NzE0MjkgNy45Mzc5MDExMyw4LjI4NTcxNDI5IEw3LjU1NDkyMjIzLDguMjg1NzE0MjkgWiBNOS45ODYwMTUyNyw2LjE0Mjg1NzE0IEM5LjgwOTEwNzQ4LDYuMTQyODU3MTQgOS43NDI3NjcwNSw2LjIyIDkuNzQyNzY3MDUsNi4zOTYzMjY1MyBMOS43NDI3NjcwNSwxMy42MDM2NzM1IEM5Ljc0Mjc2NzA1LDEzLjc4IDkuODA5MTA3NDgsMTMuODU3MTQyOSA5Ljk4NjAxNTI3LDEzLjg1NzE0MjkgTDEzLjI5MTk3OTgsMTMuODU3MTQyOSBDMTUuMDE2ODMwOCwxMy44NTcxNDI5IDE1Ljg1NzE0MjksMTIuODc2MzI2NSAxNS44NTcxNDI5LDExLjUyMDgxNjMgQzE1Ljg1NzE0MjksMTAuNTUxMDIwNCAxNS41MjU0NDA3LDkuODY3NzU1MSAxNC43ODQ2MzkzLDkuNDQ4OTc5NTkgQzE0LjY2MzAxNTIsOS4zODI4NTcxNCAxNC42Mjk4NDUsOS4zMjc3NTUxIDE0LjYyOTg0NSw5LjIzOTU5MTg0IEMxNC42Mjk4NDUsOS4xOTU1MTAyIDE0LjY0MDkwMTcsOS4xNTE0Mjg1NyAxNC42NTE5NTg1LDkuMDg1MzA2MTIgQzE0LjY4NTEyODcsOC45MiAxNC43MjkzNTU2LDguNjU1NTEwMiAxNC43MjkzNTU2LDguNDc5MTgzNjcgQzE0LjcyOTM1NTYsNy4wOTA2MTIyNCAxMy45MDAxMDAzLDYuMTQyODU3MTQgMTIuMzQxMTAwNCw2LjE0Mjg1NzE0IEw5Ljk4NjAxNTI3LDYuMTQyODU3MTQgWiBNMTEuNzc3MjA2Nyw5LjE3MzQ2OTM5IEMxMS42MDAyOTg5LDkuMTczNDY5MzkgMTEuNTMzOTU4NSw5LjA5NjMyNjUzIDExLjUzMzk1ODUsOC45MiBMMTEuNTMzOTU4NSw4LjM5MTAyMDQxIEMxMS41MzM5NTg1LDguMjE0NjkzODggMTEuNjAwMjk4OSw4LjEzNzU1MTAyIDExLjc3NzIwNjcsOC4xMzc1NTEwMiBMMTIuMzQxMTAwNCw4LjEzNzU1MTAyIEMxMi42Mjg1NzU1LDguMTM3NTUxMDIgMTIuODQ5NzEwMyw4LjMyNDg5Nzk2IDEyLjg0OTcxMDMsOC42NTU1MTAyIEMxMi44NDk3MTAzLDguOTk3MTQyODYgMTIuNjI4NTc1NSw5LjE3MzQ2OTM5IDEyLjM0MTEwMDQsOS4xNzM0NjkzOSBMMTEuNzc3MjA2Nyw5LjE3MzQ2OTM5IFogTTExLjc3NzIwNjcsMTEuODYyNDQ5IEMxMS42MDAyOTg5LDExLjg2MjQ0OSAxMS41MzM5NTg1LDExLjc4NTMwNjEgMTEuNTMzOTU4NSwxMS42MDg5Nzk2IEwxMS41MzM5NTg1LDExLjA4IEMxMS41MzM5NTg1LDEwLjkwMzY3MzUgMTEuNjAwMjk4OSwxMC44MjY1MzA2IDExLjc3NzIwNjcsMTAuODI2NTMwNiBMMTMuMjU4ODA5NiwxMC44MjY1MzA2IEMxMy42OTAwMjIzLDEwLjgyNjUzMDYgMTMuOTMzMjcwNSwxMC45OTE4MzY3IDEzLjkzMzI3MDUsMTEuMzQ0NDg5OCBDMTMuOTMzMjcwNSwxMS43MDgxNjMzIDEzLjY5MDAyMjMsMTEuODYyNDQ5IDEzLjI1ODgwOTYsMTEuODYyNDQ5IEwxMS43NzcyMDY3LDExLjg2MjQ0OSBaIiBpZD0ibG9nby1zbSI+PC9wYXRoPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+';
    const attributes = {
      backgroundImage: `url('data:image/svg+xml;base64,${logoSm}')`,
      backgroundPositionX: '6px',
      borderRadius: '4px',
      fontSize: '10px',
      height: '20px',
      lineHeight: '20px',
      paddingLeft: '27px',
      paddingRight: '11px',
    };
    this.setAttributes(attributes);
  }

  private configureForMedium() {
    // tslint:disable-next-line
    const logoMd = 'PHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MDguMDAwMDAwLCAtMjQxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPg0KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAyLjAwMDAwMCwgMjM2LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC45MjI2NTk2LDUgTDE5LjA3NzM0MDQsNSBDMjAuNzg5MDU2NCw1IDIxLjQwOTc2Niw1LjE3ODIyNTE3IDIyLjAzNTU0MzgsNS41MTI4OTQ3OSBDMjIuNjYxMzIxNSw1Ljg0NzU2NDQxIDIzLjE1MjQzNTYsNi4zMzg2Nzg0NyAyMy40ODcxMDUyLDYuOTY0NDU2MjUgQzIzLjgyMTc3NDgsNy41OTAyMzQwMyAyNCw4LjIxMDk0MzYgMjQsOS45MjI2NTk1OCBMMjQsMTguMDc3MzQwNCBDMjQsMTkuNzg5MDU2NCAyMy44MjE3NzQ4LDIwLjQwOTc2NiAyMy40ODcxMDUyLDIxLjAzNTU0MzggQzIzLjE1MjQzNTYsMjEuNjYxMzIxNSAyMi42NjEzMjE1LDIyLjE1MjQzNTYgMjIuMDM1NTQzOCwyMi40ODcxMDUyIEMyMS40MDk3NjYsMjIuODIxNzc0OCAyMC43ODkwNTY0LDIzIDE5LjA3NzM0MDQsMjMgTDEwLjkyMjY1OTYsMjMgQzkuMjEwOTQzNiwyMyA4LjU5MDIzNDAzLDIyLjgyMTc3NDggNy45NjQ0NTYyNSwyMi40ODcxMDUyIEM3LjMzODY3ODQ3LDIyLjE1MjQzNTYgNi44NDc1NjQ0MSwyMS42NjEzMjE1IDYuNTEyODk0NzksMjEuMDM1NTQzOCBDNi4xNzgyMjUxNywyMC40MDk3NjYgNiwxOS43ODkwNTY0IDYsMTguMDc3MzQwNCBMNiw5LjkyMjY1OTU4IEM2LDguMjEwOTQzNiA2LjE3ODIyNTE3LDcuNTkwMjM0MDMgNi41MTI4OTQ3OSw2Ljk2NDQ1NjI1IEM2Ljg0NzU2NDQxLDYuMzM4Njc4NDcgNy4zMzg2Nzg0Nyw1Ljg0NzU2NDQxIDcuOTY0NDU2MjUsNS41MTI4OTQ3OSBDOC41OTAyMzQwMyw1LjE3ODIyNTE3IDkuMjEwOTQzNiw1IDEwLjkyMjY1OTYsNSBaIE04LjM1OTMwNDE0LDExLjQyODU3MTQgQzguMjA5NTI4OTksMTEuNDI4NTcxNCA4LjE1NTIxNjkxLDExLjQ0NDE2NjEgOC4xMDA0NjEzNSwxMS40NzM0NDk3IEM4LjA0NTcwNTc5LDExLjUwMjczMzMgOC4wMDI3MzMzMSwxMS41NDU3MDU4IDcuOTczNDQ5NzIsMTEuNjAwNDYxNCBDNy45NDQxNjYxMywxMS42NTUyMTY5IDcuOTI4NTcxNDMsMTEuNzA5NTI5IDcuOTI4NTcxNDMsMTEuODU5MzA0MSBMNy45Mjg1NzE0MywxOS4yNjMxNDQ4IEM3LjkyODU3MTQzLDE5LjQxMjkyIDcuOTQ0MTY2MTMsMTkuNDY3MjMyMSA3Ljk3MzQ0OTcyLDE5LjUyMTk4NzYgQzguMDAyNzMzMzEsMTkuNTc2NzQzMiA4LjA0NTcwNTc5LDE5LjYxOTcxNTcgOC4xMDA0NjEzNSwxOS42NDg5OTkzIEM4LjE1NTIxNjkxLDE5LjY3ODI4MjggOC4yMDk1Mjg5OSwxOS42OTM4Nzc2IDguMzU5MzA0MTQsMTkuNjkzODc3NiBMOC44Nzk5MzA5LDE5LjY5Mzg3NzYgQzkuMDI5NzA2MDQsMTkuNjkzODc3NiA5LjA4NDAxODEzLDE5LjY3ODI4MjggOS4xMzg3NzM2OSwxOS42NDg5OTkzIEM5LjE5MzUyOTI0LDE5LjYxOTcxNTcgOS4yMzY1MDE3MiwxOS41NzY3NDMyIDkuMjY1Nzg1MzEsMTkuNTIxOTg3NiBDOS4yOTUwNjg5MSwxOS40NjcyMzIxIDkuMzEwNjYzNjEsMTkuNDEyOTIgOS4zMTA2NjM2MSwxOS4yNjMxNDQ4IEw5LjMxMDY2MzYxLDExLjg1OTMwNDEgQzkuMzEwNjYzNjEsMTEuNzA5NTI5IDkuMjk1MDY4OTEsMTEuNjU1MjE2OSA5LjI2NTc4NTMxLDExLjYwMDQ2MTQgQzkuMjM2NTAxNzIsMTEuNTQ1NzA1OCA5LjE5MzUyOTI0LDExLjUwMjczMzMgOS4xMzg3NzM2OSwxMS40NzM0NDk3IEM5LjA4NDAxODEzLDExLjQ0NDE2NjEgOS4wMjk3MDYwNCwxMS40Mjg1NzE0IDguODc5OTMwOSwxMS40Mjg1NzE0IEw4LjM1OTMwNDE0LDExLjQyODU3MTQgWiBNMTEuOTc5MDIyOSw4LjIxNDI4NTcxIEMxMS43MTM2NjEyLDguMjE0Mjg1NzEgMTEuNjE0MTUwNiw4LjMzIDExLjYxNDE1MDYsOC41OTQ0ODk4IEwxMS42MTQxNTA2LDE5LjQwNTUxMDIgQzExLjYxNDE1MDYsMTkuNjcgMTEuNzEzNjYxMiwxOS43ODU3MTQzIDExLjk3OTAyMjksMTkuNzg1NzE0MyBMMTYuOTM3OTY5NywxOS43ODU3MTQzIEMxOS41MjUyNDYyLDE5Ljc4NTcxNDMgMjAuNzg1NzE0MywxOC4zMTQ0ODk4IDIwLjc4NTcxNDMsMTYuMjgxMjI0NSBDMjAuNzg1NzE0MywxNC44MjY1MzA2IDIwLjI4ODE2MTEsMTMuODAxNjMyNyAxOS4xNzY5NTksMTMuMTczNDY5NCBDMTguOTk0NTIyOCwxMy4wNzQyODU3IDE4Ljk0NDc2NzUsMTIuOTkxNjMyNyAxOC45NDQ3Njc1LDEyLjg1OTM4NzggQzE4Ljk0NDc2NzUsMTIuNzkzMjY1MyAxOC45NjEzNTI2LDEyLjcyNzE0MjkgMTguOTc3OTM3NywxMi42Mjc5NTkyIEMxOS4wMjc2OTMsMTIuMzggMTkuMDk0MDMzNSwxMS45ODMyNjUzIDE5LjA5NDAzMzUsMTEuNzE4Nzc1NSBDMTkuMDk0MDMzNSw5LjYzNTkxODM3IDE3Ljg1MDE1MDUsOC4yMTQyODU3MSAxNS41MTE2NTA1LDguMjE0Mjg1NzEgTDExLjk3OTAyMjksOC4yMTQyODU3MSBaIE0xNC42NjU4MTAxLDEyLjc2MDIwNDEgQzE0LjQwMDQ0ODQsMTIuNzYwMjA0MSAxNC4zMDA5Mzc4LDEyLjY0NDQ4OTggMTQuMzAwOTM3OCwxMi4zOCBMMTQuMzAwOTM3OCwxMS41ODY1MzA2IEMxNC4zMDA5Mzc4LDExLjMyMjA0MDggMTQuNDAwNDQ4NCwxMS4yMDYzMjY1IDE0LjY2NTgxMDEsMTEuMjA2MzI2NSBMMTUuNTExNjUwNSwxMS4yMDYzMjY1IEMxNS45NDI4NjMzLDExLjIwNjMyNjUgMTYuMjc0NTY1NCwxMS40ODczNDY5IDE2LjI3NDU2NTQsMTEuOTgzMjY1MyBDMTYuMjc0NTY1NCwxMi40OTU3MTQzIDE1Ljk0Mjg2MzMsMTIuNzYwMjA0MSAxNS41MTE2NTA1LDEyLjc2MDIwNDEgTDE0LjY2NTgxMDEsMTIuNzYwMjA0MSBaIE0xNC42NjU4MTAxLDE2Ljc5MzY3MzUgQzE0LjQwMDQ0ODQsMTYuNzkzNjczNSAxNC4zMDA5Mzc4LDE2LjY3Nzk1OTIgMTQuMzAwOTM3OCwxNi40MTM0Njk0IEwxNC4zMDA5Mzc4LDE1LjYyIEMxNC4zMDA5Mzc4LDE1LjM1NTUxMDIgMTQuNDAwNDQ4NCwxNS4yMzk3OTU5IDE0LjY2NTgxMDEsMTUuMjM5Nzk1OSBMMTYuODg4MjE0MywxNS4yMzk3OTU5IEMxNy41MzUwMzM1LDE1LjIzOTc5NTkgMTcuODk5OTA1OCwxNS40ODc3NTUxIDE3Ljg5OTkwNTgsMTYuMDE2NzM0NyBDMTcuODk5OTA1OCwxNi41NjIyNDQ5IDE3LjUzNTAzMzUsMTYuNzkzNjczNSAxNi44ODgyMTQzLDE2Ljc5MzY3MzUgTDE0LjY2NTgxMDEsMTYuNzkzNjczNSBaIiBpZD0ibG9nby1tZCI+PC9wYXRoPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=';
    const attributes = {
      backgroundImage: `url('data:image/svg+xml;base64,${logoMd}')`,
      backgroundPositionX: '6px',
      borderRadius: '6px',
      fontSize: '12px',
      height: '28px',
      lineHeight: '28px',
      paddingLeft: '35px',
      paddingRight: '14px',
    };
    this.setAttributes(attributes);
  }

  private configureForLarge() {
    // tslint:disable-next-line
    const logoLg = 'PHN2ZyB3aWR0aD0iMjJweCIgaGVpZ2h0PSIyMnB4IiB2aWV3Qm94PSIwIDAgMjIgMjIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MTQuMDAwMDAwLCAtMjk3LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPg0KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAyLjAwMDAwMCwgMjg4LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOC4xNTMzMjQ1LDkgTDI3Ljg0NjY3NTUsOSBDMjkuOTg2MzIwNSw5IDMwLjc2MjIwNzUsOS4yMjI3ODE0NyAzMS41NDQ0Mjk3LDkuNjQxMTE4NDkgQzMyLjMyNjY1MTksMTAuMDU5NDU1NSAzMi45NDA1NDQ1LDEwLjY3MzM0ODEgMzMuMzU4ODgxNSwxMS40NTU1NzAzIEMzMy43NzcyMTg1LDEyLjIzNzc5MjUgMzQsMTMuMDEzNjc5NSAzNCwxNS4xNTMzMjQ1IEwzNCwyNC44NDY2NzU1IEMzNCwyNi45ODYzMjA1IDMzLjc3NzIxODUsMjcuNzYyMjA3NSAzMy4zNTg4ODE1LDI4LjU0NDQyOTcgQzMyLjk0MDU0NDUsMjkuMzI2NjUxOSAzMi4zMjY2NTE5LDI5Ljk0MDU0NDUgMzEuNTQ0NDI5NywzMC4zNTg4ODE1IEMzMC43NjIyMDc1LDMwLjc3NzIxODUgMjkuOTg2MzIwNSwzMSAyNy44NDY2NzU1LDMxIEwxOC4xNTMzMjQ1LDMxIEMxNi4wMTM2Nzk1LDMxIDE1LjIzNzc5MjUsMzAuNzc3MjE4NSAxNC40NTU1NzAzLDMwLjM1ODg4MTUgQzEzLjY3MzM0ODEsMjkuOTQwNTQ0NSAxMy4wNTk0NTU1LDI5LjMyNjY1MTkgMTIuNjQxMTE4NSwyOC41NDQ0Mjk3IEMxMi4yMjI3ODE1LDI3Ljc2MjIwNzUgMTIsMjYuOTg2MzIwNSAxMiwyNC44NDY2NzU1IEwxMiwxNS4xNTMzMjQ1IEMxMiwxMy4wMTM2Nzk1IDEyLjIyMjc4MTUsMTIuMjM3NzkyNSAxMi42NDExMTg1LDExLjQ1NTU3MDMgQzEzLjA1OTQ1NTUsMTAuNjczMzQ4MSAxMy42NzMzNDgxLDEwLjA1OTQ1NTUgMTQuNDU1NTcwMyw5LjY0MTExODQ5IEMxNS4yMzc3OTI1LDkuMjIyNzgxNDcgMTYuMDEzNjc5NSw5IDE4LjE1MzMyNDUsOSBaIE0xNC44OTU1NTg3LDE2Ljg1NzE0MjkgQzE0LjcwODMzOTgsMTYuODU3MTQyOSAxNC42NDA0NDk3LDE2Ljg3NjYzNjIgMTQuNTcyMDA1MywxNi45MTMyNDA3IEMxNC41MDM1NjA4LDE2Ljk0OTg0NTIgMTQuNDQ5ODQ1MiwxNy4wMDM1NjA4IDE0LjQxMzI0MDcsMTcuMDcyMDA1MyBDMTQuMzc2NjM2MiwxNy4xNDA0NDk3IDE0LjM1NzE0MjksMTcuMjA4MzM5OCAxNC4zNTcxNDI5LDE3LjM5NTU1ODcgTDE0LjM1NzE0MjksMjYuNDIwNzY3OCBDMTQuMzU3MTQyOSwyNi42MDc5ODY3IDE0LjM3NjYzNjIsMjYuNjc1ODc2OCAxNC40MTMyNDA3LDI2Ljc0NDMyMTMgQzE0LjQ0OTg0NTIsMjYuODEyNzY1NyAxNC41MDM1NjA4LDI2Ljg2NjQ4MTMgMTQuNTcyMDA1MywyNi45MDMwODU4IEMxNC42NDA0NDk3LDI2LjkzOTY5MDMgMTQuNzA4MzM5OCwyNi45NTkxODM3IDE0Ljg5NTU1ODcsMjYuOTU5MTgzNyBMMTUuNTA3OTUwNywyNi45NTkxODM3IEMxNS42OTUxNjk3LDI2Ljk1OTE4MzcgMTUuNzYzMDU5OCwyNi45Mzk2OTAzIDE1LjgzMTUwNDIsMjYuOTAzMDg1OCBDMTUuODk5OTQ4NywyNi44NjY0ODEzIDE1Ljk1MzY2NDMsMjYuODEyNzY1NyAxNS45OTAyNjg4LDI2Ljc0NDMyMTMgQzE2LjAyNjg3MzMsMjYuNjc1ODc2OCAxNi4wNDYzNjY2LDI2LjYwNzk4NjcgMTYuMDQ2MzY2NiwyNi40MjA3Njc4IEwxNi4wNDYzNjY2LDE3LjM5NTU1ODcgQzE2LjA0NjM2NjYsMTcuMjA4MzM5OCAxNi4wMjY4NzMzLDE3LjE0MDQ0OTcgMTUuOTkwMjY4OCwxNy4wNzIwMDUzIEMxNS45NTM2NjQzLDE3LjAwMzU2MDggMTUuODk5OTQ4NywxNi45NDk4NDUyIDE1LjgzMTUwNDIsMTYuOTEzMjQwNyBDMTUuNzYzMDU5OCwxNi44NzY2MzYyIDE1LjY5NTE2OTcsMTYuODU3MTQyOSAxNS41MDc5NTA3LDE2Ljg1NzE0MjkgTDE0Ljg5NTU1ODcsMTYuODU3MTQyOSBaIE0xOS4zMDc2OTQ3LDEyLjkyODU3MTQgQzE4Ljk4MzM2MzcsMTIuOTI4NTcxNCAxOC44NjE3Mzk2LDEzLjA3IDE4Ljg2MTczOTYsMTMuMzkzMjY1MyBMMTguODYxNzM5NiwyNi42MDY3MzQ3IEMxOC44NjE3Mzk2LDI2LjkzIDE4Ljk4MzM2MzcsMjcuMDcxNDI4NiAxOS4zMDc2OTQ3LDI3LjA3MTQyODYgTDI1LjM2ODYyOTYsMjcuMDcxNDI4NiBDMjguNTMwODU2NSwyNy4wNzE0Mjg2IDMwLjA3MTQyODYsMjUuMjczMjY1MyAzMC4wNzE0Mjg2LDIyLjc4ODE2MzMgQzMwLjA3MTQyODYsMjEuMDEwMjA0MSAyOS40NjMzMDgsMTkuNzU3NTUxIDI4LjEwNTE3MjEsMTguOTg5Nzk1OSBDMjcuODgyMTk0NiwxOC44Njg1NzE0IDI3LjgyMTM4MjUsMTguNzY3NTUxIDI3LjgyMTM4MjUsMTguNjA1OTE4NCBDMjcuODIxMzgyNSwxOC41MjUxMDIgMjcuODQxNjUzMiwxOC40NDQyODU3IDI3Ljg2MTkyMzksMTguMzIzMDYxMiBDMjcuOTIyNzM1OSwxOC4wMiAyOC4wMDM4MTg3LDE3LjUzNTEwMiAyOC4wMDM4MTg3LDE3LjIxMTgzNjcgQzI4LjAwMzgxODcsMTQuNjY2MTIyNCAyNi40ODM1MTczLDEyLjkyODU3MTQgMjMuNjI1MzUwNiwxMi45Mjg1NzE0IEwxOS4zMDc2OTQ3LDEyLjkyODU3MTQgWiBNMjIuNTkxNTQ1NywxOC40ODQ2OTM5IEMyMi4yNjcyMTQ3LDE4LjQ4NDY5MzkgMjIuMTQ1NTkwNiwxOC4zNDMyNjUzIDIyLjE0NTU5MDYsMTguMDIgTDIyLjE0NTU5MDYsMTcuMDUwMjA0MSBDMjIuMTQ1NTkwNiwxNi43MjY5Mzg4IDIyLjI2NzIxNDcsMTYuNTg1NTEwMiAyMi41OTE1NDU3LDE2LjU4NTUxMDIgTDIzLjYyNTM1MDYsMTYuNTg1NTEwMiBDMjQuMTUyMzg4NSwxNi41ODU1MTAyIDI0LjU1NzgwMjIsMTYuOTI4OTc5NiAyNC41NTc4MDIyLDE3LjUzNTEwMiBDMjQuNTU3ODAyMiwxOC4xNjE0Mjg2IDI0LjE1MjM4ODUsMTguNDg0NjkzOSAyMy42MjUzNTA2LDE4LjQ4NDY5MzkgTDIyLjU5MTU0NTcsMTguNDg0NjkzOSBaIE0yMi41OTE1NDU3LDIzLjQxNDQ4OTggQzIyLjI2NzIxNDcsMjMuNDE0NDg5OCAyMi4xNDU1OTA2LDIzLjI3MzA2MTIgMjIuMTQ1NTkwNiwyMi45NDk3OTU5IEwyMi4xNDU1OTA2LDIxLjk4IEMyMi4xNDU1OTA2LDIxLjY1NjczNDcgMjIuMjY3MjE0NywyMS41MTUzMDYxIDIyLjU5MTU0NTcsMjEuNTE1MzA2MSBMMjUuMzA3ODE3NSwyMS41MTUzMDYxIEMyNi4wOTgzNzQzLDIxLjUxNTMwNjEgMjYuNTQ0MzI5MywyMS44MTgzNjczIDI2LjU0NDMyOTMsMjIuNDY0ODk4IEMyNi41NDQzMjkzLDIzLjEzMTYzMjcgMjYuMDk4Mzc0MywyMy40MTQ0ODk4IDI1LjMwNzgxNzUsMjMuNDE0NDg5OCBMMjIuNTkxNTQ1NywyMy40MTQ0ODk4IFoiIGlkPSJsb2dvLWxnIj48L3BhdGg+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4NCg==';
    const attributes = {
      backgroundImage: `url('data:image/svg+xml;base64,${logoLg}')`,
      backgroundPositionX: '12px',
      borderRadius: '8px',
      fontSize: '15px',
      height: '40px',
      lineHeight: '40px',
      paddingLeft: '48px',
      paddingRight: '18px',
    };
    this.setAttributes(attributes);
  }
}
