# @bitski/waas-react-sdk

## 1.0.1

### Patch Changes

- [#479](https://github.com/BitskiCo/bitski-js/pull/479) [`db47fb846b02e959bb18eba1f7052b894b26c983`](https://github.com/BitskiCo/bitski-js/commit/db47fb846b02e959bb18eba1f7052b894b26c983) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add chain switching; default email input display

- Updated dependencies [[`fe68fd25723cef9248b5ee630fbd195d76c84c91`](https://github.com/BitskiCo/bitski-js/commit/fe68fd25723cef9248b5ee630fbd195d76c84c91)]:
  - bitski@4.2.1

## 0.0.12

### Patch Changes

- [#468](https://github.com/BitskiCo/bitski-js/pull/468) [`c8519ddf2d99a77433cc57e2632b24c47d9464ee`](https://github.com/BitskiCo/bitski-js/commit/c8519ddf2d99a77433cc57e2632b24c47d9464ee) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Remove console log for debugging

## 0.0.11

### Patch Changes

- [#466](https://github.com/BitskiCo/bitski-js/pull/466) [`50b2c736364e21fedb981e7760fe09e7e798a15b`](https://github.com/BitskiCo/bitski-js/commit/50b2c736364e21fedb981e7760fe09e7e798a15b) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add wallet viewer

- [#464](https://github.com/BitskiCo/bitski-js/pull/464) [`72df3c03c17ee3bcbb65ec3fdf6ee86b075b45f0`](https://github.com/BitskiCo/bitski-js/commit/72df3c03c17ee3bcbb65ec3fdf6ee86b075b45f0) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - This change wraps BitskiAuth in a Dialog component when `collapsed` is provided as a prop. By default, if no `connect` prop is provided, BitskiWidget will use `<BitskiConnect displayText="Login" />` as the dialog
  trigger. If a `connect` prop is provided, the component passed to the `connect` prop will replace the dialog trigger.
  Alternatively, users can extend `<BitskiConnect />` by passing children components into it to utilize the default interactivity of showing the account address on connection.

  Summary:

  - Add `connect` prop to control widget's login/connect button
  - Wraps BitskiAuth in an animated dialog on entry and exit

## 0.0.10

### Patch Changes

- [#462](https://github.com/BitskiCo/bitski-js/pull/462) [`5e5d11d96252a670b136042e176a4e0175fd00c6`](https://github.com/BitskiCo/bitski-js/commit/5e5d11d96252a670b136042e176a4e0175fd00c6) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Update bitski package in WaaS SDK to reflect provider change

## 0.0.9

### Patch Changes

- [#458](https://github.com/BitskiCo/bitski-js/pull/458) [`84cd44fa8cc53a85095f37b4a994c9e7d61828f5`](https://github.com/BitskiCo/bitski-js/commit/84cd44fa8cc53a85095f37b4a994c9e7d61828f5) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - - Added children, collapsed, and loginText props to BitskiWidget

  <BitskiWidget collapsed>
  - To show login button initially before showing the auth view

  <BitskiWidget collapsed displayText="Connect">
  - You can set displayText prop to customize the button's text

  <BitskiWidget>
    <h1>Hello, world!</h1>
  </BitskiWidget>
  - Customize the connected state to display your own UI if desired. This can instead be a list of links for user settings or application settings. Or your own display of address and chains.

## 0.0.8

### Patch Changes

- [#456](https://github.com/BitskiCo/bitski-js/pull/456) [`1eb3250666b9f48e3598cc2c681e98efcfcb2b89`](https://github.com/BitskiCo/bitski-js/commit/1eb3250666b9f48e3598cc2c681e98efcfcb2b89) Thanks [@RealAndyLawton](https://github.com/RealAndyLawton)! - Adds Twitter login hint

## 0.0.7

### Patch Changes

- [#453](https://github.com/BitskiCo/bitski-js/pull/453) [`64d513d664a5a35eb776ffb18c30108d2a5a8ff2`](https://github.com/BitskiCo/bitski-js/commit/64d513d664a5a35eb776ffb18c30108d2a5a8ff2) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Undo change of socials prompt to none back to login

- [#455](https://github.com/BitskiCo/bitski-js/pull/455) [`0494c896b98cfdddb12ee800b9186c3a45dd1f34`](https://github.com/BitskiCo/bitski-js/commit/0494c896b98cfdddb12ee800b9186c3a45dd1f34) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Push injected connector when mobile is detected; externalize connectors and wagmi core.

## 0.0.6

### Patch Changes

- [#451](https://github.com/BitskiCo/bitski-js/pull/451) [`334ccea453655d34664a40a2f1db3fdeaaade5fa`](https://github.com/BitskiCo/bitski-js/commit/334ccea453655d34664a40a2f1db3fdeaaade5fa) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Undo bitski connector name change

- [#449](https://github.com/BitskiCo/bitski-js/pull/449) [`8627d5fc8c42dba133effc5cff6961b9f7bc9d1b`](https://github.com/BitskiCo/bitski-js/commit/8627d5fc8c42dba133effc5cff6961b9f7bc9d1b) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Set social logins prompt to none to avoid re-auth

## 0.0.5

### Patch Changes

- [#447](https://github.com/BitskiCo/bitski-js/pull/447) [`a520aa7c53666cb2bb27ca8dba2c19ec773a08e7`](https://github.com/BitskiCo/bitski-js/commit/a520aa7c53666cb2bb27ca8dba2c19ec773a08e7) Thanks [@RealAndyLawton](https://github.com/RealAndyLawton)! - Make logo configurable

## 0.0.4

### Patch Changes

- [#439](https://github.com/BitskiCo/bitski-js/pull/439) [`28d4472e4a700dac3e1d80ce7c4f2a6cecda0d91`](https://github.com/BitskiCo/bitski-js/commit/28d4472e4a700dac3e1d80ce7c4f2a6cecda0d91) Thanks [@RealAndyLawton](https://github.com/RealAndyLawton)! - Use Blockchain Accounts for provider.getAccounts

## 0.0.3

### Patch Changes

- [#444](https://github.com/BitskiCo/bitski-js/pull/444) [`0ad6ab7670423ba199f8284bb465e55e9b13ce02`](https://github.com/BitskiCo/bitski-js/commit/0ad6ab7670423ba199f8284bb465e55e9b13ce02) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add injected provider if no window provider; accounts for missing discovery in mobile

## 0.0.2

### Patch Changes

- [#435](https://github.com/BitskiCo/bitski-js/pull/435) [`d964c005be6b9105ae0335f6e47567c74185a007`](https://github.com/BitskiCo/bitski-js/commit/d964c005be6b9105ae0335f6e47567c74185a007) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Update demo app; only throw error for Bitski config if no appId or callbackURL

- Updated dependencies [[`69571b8c9024ede11a280d2de16b3ef20f27fb72`](https://github.com/BitskiCo/bitski-js/commit/69571b8c9024ede11a280d2de16b3ef20f27fb72)]:
  - bitski@4.0.0

## 0.0.1

### Patch Changes

- [#432](https://github.com/BitskiCo/bitski-js/pull/432) [`6aade4ae892f953684a1cbd457f5dcab1da4910a`](https://github.com/BitskiCo/bitski-js/commit/6aade4ae892f953684a1cbd457f5dcab1da4910a) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Publish @bitski/waas-react-sdk

## 0.0.3

### Patch Changes

- [#430](https://github.com/BitskiCo/bitski-js/pull/430) [`221afc507b06715171cbb8778bf2a360e7a6d792`](https://github.com/BitskiCo/bitski-js/commit/221afc507b06715171cbb8778bf2a360e7a6d792) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Fix retry buttons not working when no connections

## 0.0.2

### Patch Changes

- [#424](https://github.com/BitskiCo/bitski-js/pull/424) [`2d26d1caaa9d621c331fff65a6682012e5f03d6b`](https://github.com/BitskiCo/bitski-js/commit/2d26d1caaa9d621c331fff65a6682012e5f03d6b) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Include CSS in exported build to prevent need for import

## 0.0.1

### Patch Changes

- [#422](https://github.com/BitskiCo/bitski-js/pull/422) [`ff48dd8646160d1c2d2ac554cb816c9d485c27af`](https://github.com/BitskiCo/bitski-js/commit/ff48dd8646160d1c2d2ac554cb816c9d485c27af) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add BitskiWidget package for export and publish
