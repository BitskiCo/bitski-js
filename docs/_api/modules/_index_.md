---
---
[Bitski.js](../README.md) > ["index"](../modules/_index_.md)



# External module: "index"

## Index

### Functions

* [InitializeWeb3](_index_.md#initializeweb3)



---
## Functions
<a id="initializeweb3"></a>

###  InitializeWeb3

**InitializeWeb3**(settings: *`any`*): `Web3`



*Defined in [index.ts:41](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/index.ts#L41)*



Initialize [Web3](https://github.com/ethereum/web3) with Bitski. This will be ignored if a web3 object already exists.
*__example__*: // Set up Bitski for exampledapp.co web3 = InitializeWeb3({ authority: '[https://hydra.outtherelabs.com/'](https://hydra.outtherelabs.com/'), client_id: 'YOUR-CLIENT-ID', redirect_uri: '[https://exampledapp.co/'](https://exampledapp.co/'), post_logout_redirect_uri: '[https://exampledapp.co'](https://exampledapp.co'), response_type: 'token id_token', scope: 'openid', popup_redirect_uri: '[https://exampledapp.co'](https://exampledapp.co'), popup_post_logout_redirect_uri: '[https://exampledapp.co'](https://exampledapp.co'), silent_redirect_uri: '[https://exampledapp.co'](https://exampledapp.co'), automaticSilentRenew: true, silentRequestTimeout: 10000, filterProtocolClaims: true, loadUserInfo: true });



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| settings | `any`   |  - |





**Returns:** `Web3`
Web3 object configured for Bitski.






___


