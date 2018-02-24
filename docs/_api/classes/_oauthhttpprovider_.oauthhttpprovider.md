---
---
[Bitski.js](../README.md) > ["oauthhttpprovider"](../modules/_oauthhttpprovider_.md) > [OAuthHttpProvider](../classes/_oauthhttpprovider_.oauthhttpprovider.md)



# Class: OAuthHttpProvider


A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls
*__class__*: 

*__param__*: JSON-RPC endpoint

*__param__*: Timeout in seconds

*__param__*: settings object for configuring OAuth, see [InitializeWeb3](../modules/_index_.md#initializeweb3)

*__example__*: // Set up a new HTTPOAuthProvider var settings = { authority: '[https://hydra.outtherelabs.com/'](https://hydra.outtherelabs.com/'), client_id: 'YOUR-CLIENT-ID', redirect_uri: '[https://exampledapp.co/'](https://exampledapp.co/'), post_logout_redirect_uri: '[https://exampledapp.co'](https://exampledapp.co'), response_type: 'token id_token', scope: 'openid', popup_redirect_uri: '[https://exampledapp.co'](https://exampledapp.co'), popup_post_logout_redirect_uri: '[https://exampledapp.co'](https://exampledapp.co'), silent_redirect_uri: '[https://exampledapp.co'](https://exampledapp.co'), automaticSilentRenew: true, silentRequestTimeout: 10000, filterProtocolClaims: true, loadUserInfo: true }; var provider = new OAuthHttpProvider('[https://my-rpc-server.com'](https://my-rpc-server.com'), 1000, settings);


## Hierarchy


 `HttpProvider`

**↳ OAuthHttpProvider**







## Index

### Constructors

* [constructor](_oauthhttpprovider_.oauthhttpprovider.md#constructor)


### Properties

* [addDefaultEvents](_oauthhttpprovider_.oauthhttpprovider.md#adddefaultevents)
* [connection](_oauthhttpprovider_.oauthhttpprovider.md#connection)
* [currentUser](_oauthhttpprovider_.oauthhttpprovider.md#currentuser)
* [host](_oauthhttpprovider_.oauthhttpprovider.md#host)
* [notificationCallbacks](_oauthhttpprovider_.oauthhttpprovider.md#notificationcallbacks)
* [responseCallbacks](_oauthhttpprovider_.oauthhttpprovider.md#responsecallbacks)
* [userManager](_oauthhttpprovider_.oauthhttpprovider.md#usermanager)


### Methods

* [_prepareRequest](_oauthhttpprovider_.oauthhttpprovider.md#_preparerequest)
* [on](_oauthhttpprovider_.oauthhttpprovider.md#on)
* [removeAllListeners](_oauthhttpprovider_.oauthhttpprovider.md#removealllisteners)
* [removeListener](_oauthhttpprovider_.oauthhttpprovider.md#removelistener)
* [reset](_oauthhttpprovider_.oauthhttpprovider.md#reset)
* [send](_oauthhttpprovider_.oauthhttpprovider.md#send)
* [sendAsync](_oauthhttpprovider_.oauthhttpprovider.md#sendasync)



---
## Constructors
<a id="constructor"></a>


### **new OAuthHttpProvider**(host: *`string`*, timeout: *`number`*, settings: *`any`*): [OAuthHttpProvider](_oauthhttpprovider_.oauthhttpprovider.md)


*Overrides HttpProvider.__constructor*

*Defined in [oauthhttpprovider.ts:39](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/oauthhttpprovider.ts#L39)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| host | `string`   |  - |
| timeout | `number`   |  - |
| settings | `any`   |  - |





**Returns:** [OAuthHttpProvider](_oauthhttpprovider_.oauthhttpprovider.md)

---


## Properties
<a id="adddefaultevents"></a>

###  addDefaultEvents

** addDefaultEvents**:  *`undefined`* 

*Inherited from HttpProvider.addDefaultEvents*

*Defined in [types/web3-providers-http.d.ts:19](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L19)*





___

<a id="connection"></a>

###  connection

** connection**:  *`undefined`* 

*Inherited from HttpProvider.connection*

*Defined in [types/web3-providers-http.d.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L18)*





___

<a id="currentuser"></a>

###  currentUser

** currentUser**:  *`User`*  =  null

*Defined in [oauthhttpprovider.ts:38](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/oauthhttpprovider.ts#L38)*





___

<a id="host"></a>

###  host

** host**:  *`string`* 

*Defined in [oauthhttpprovider.ts:39](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/oauthhttpprovider.ts#L39)*





___

<a id="notificationcallbacks"></a>

###  notificationCallbacks

** notificationCallbacks**:  *`undefined`* 

*Inherited from HttpProvider.notificationCallbacks*

*Defined in [types/web3-providers-http.d.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L17)*





___

<a id="responsecallbacks"></a>

###  responseCallbacks

** responseCallbacks**:  *`undefined`* 

*Inherited from HttpProvider.responseCallbacks*

*Defined in [types/web3-providers-http.d.ts:16](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L16)*





___

<a id="usermanager"></a>

###  userManager

** userManager**:  *`UserManager`* 

*Defined in [oauthhttpprovider.ts:37](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/oauthhttpprovider.ts#L37)*





___


## Methods
<a id="_preparerequest"></a>

### «Private» _prepareRequest

**_prepareRequest**(): `XMLHttpRequest`



*Defined in [oauthhttpprovider.ts:75](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/oauthhttpprovider.ts#L75)*





**Returns:** `XMLHttpRequest`





___

<a id="on"></a>

###  on

**on**(type: *`string`*, callback: *`function`*): `undefined`



*Inherited from HttpProvider.on*

*Defined in [types/web3-providers-http.d.ts:20](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L20)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |
| callback | `function`   |  - |





**Returns:** `undefined`





___

<a id="removealllisteners"></a>

###  removeAllListeners

**removeAllListeners**(type: *`string`*): `undefined`



*Inherited from HttpProvider.removeAllListeners*

*Defined in [types/web3-providers-http.d.ts:22](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L22)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |





**Returns:** `undefined`





___

<a id="removelistener"></a>

###  removeListener

**removeListener**(type: *`string`*, callback: *`function`*): `undefined`



*Inherited from HttpProvider.removeListener*

*Defined in [types/web3-providers-http.d.ts:21](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L21)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |
| callback | `function`   |  - |





**Returns:** `undefined`





___

<a id="reset"></a>

###  reset

**reset**(): `undefined`



*Inherited from HttpProvider.reset*

*Defined in [types/web3-providers-http.d.ts:23](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L23)*





**Returns:** `undefined`





___

<a id="send"></a>

###  send

**send**(payload: *`JsonRPCRequest`*, callback: *`function`*): `void`



*Inherited from HttpProvider.send*

*Defined in [types/web3-providers-http.d.ts:27](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/types/web3-providers-http.d.ts#L27)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| callback | `function`   |  - |





**Returns:** `void`





___

<a id="sendasync"></a>

###  sendAsync

**sendAsync**(payload: *`JsonRPCRequest`*, callback: *`function`*): `void`



*Defined in [oauthhttpprovider.ts:85](https://github.com/OutThereLabs/bitski-js-sdk/blob/31cf8f9/src/oauthhttpprovider.ts#L85)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| callback | `function`   |  - |





**Returns:** `void`





___


