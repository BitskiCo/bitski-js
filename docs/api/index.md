---
---



#  Bitski.js

## Index

### External modules

* ["index"](#external-module-index-)
* ["oauthhttpprovider"](#external-module-oauthhttpprovider-)



## External modules
---

<a id="_index_"></a>

## &quot;index&quot;


<a id="_index_.initializeweb3"></a>

####  InitializeWeb3


`InitializeWeb3(settings: any): Web3`



<small>*Defined in [index.ts:27](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/index.ts#L27)*</small>



Initialize [Web3](https://github.com/ethereum/web3) with Bitski. This will be ignored if a web3 object already exists.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| settings | `any`   |  - |





**Returns:** `Web3`
Web3 object configured for Bitski.






---

<a id="_oauthhttpprovider_"></a>

## &quot;oauthhttpprovider&quot;


<a id="_oauthhttpprovider_.oauthhttpprovider"></a>

####  OAuthHttpProvider


A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls






### Constructors
<a id="_oauthhttpprovider_.oauthhttpprovider.constructor"></a>

####  constructor



`new OAuthHttpProvider(host: string, timeout: number, settings: any): OAuthHttpProvider`



<small>*Overrides HttpProvider.__constructor*</small>

<small>*Defined in [oauthhttpprovider.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/oauthhttpprovider.ts#L17)*</small>




**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| host | `string`   |  JSON-RPC endpoint |
| timeout | `number`   |  Timeout in seconds |
| settings | `any`   |  settings object for configuring OAuth, see [InitializeWeb3](#_index_.initializeweb3) |





**Returns:** [OAuthHttpProvider](#class-oauthhttpprovider)





### Properties
<a id="_oauthhttpprovider_.oauthhttpprovider.adddefaultevents"></a>

####  addDefaultEvents


`addDefaultEvents:  undefined `

<small>*Inherited from HttpProvider.addDefaultEvents*</small>

<small>*Defined in [types/web3-providers-http.d.ts:19](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L19)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.connection"></a>

####  connection


`connection:  undefined `

<small>*Inherited from HttpProvider.connection*</small>

<small>*Defined in [types/web3-providers-http.d.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L18)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.currentuser"></a>

####  currentUser


`currentUser:  User  =  null`

<small>*Defined in [oauthhttpprovider.ts:16](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/oauthhttpprovider.ts#L16)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.host"></a>

####  host


`host:  string `

<small>*Defined in [oauthhttpprovider.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/oauthhttpprovider.ts#L17)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.notificationcallbacks"></a>

####  notificationCallbacks


`notificationCallbacks:  undefined `

<small>*Inherited from HttpProvider.notificationCallbacks*</small>

<small>*Defined in [types/web3-providers-http.d.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L17)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.responsecallbacks"></a>

####  responseCallbacks


`responseCallbacks:  undefined `

<small>*Inherited from HttpProvider.responseCallbacks*</small>

<small>*Defined in [types/web3-providers-http.d.ts:16](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L16)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.usermanager"></a>

####  userManager


`userManager:  UserManager `

<small>*Defined in [oauthhttpprovider.ts:15](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/oauthhttpprovider.ts#L15)*</small>






### Methods
<a id="_oauthhttpprovider_.oauthhttpprovider._preparerequest"></a>

#### «Private» _prepareRequest


`_prepareRequest(): XMLHttpRequest`



<small>*Defined in [oauthhttpprovider.ts:57](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/oauthhttpprovider.ts#L57)*</small>





**Returns:** `XMLHttpRequest`




<a id="_oauthhttpprovider_.oauthhttpprovider.on"></a>

####  on


`on(type: string, callback: function): undefined`



<small>*Inherited from HttpProvider.on*</small>

<small>*Defined in [types/web3-providers-http.d.ts:20](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L20)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |
| callback | `function`   |  - |





**Returns:** `undefined`




<a id="_oauthhttpprovider_.oauthhttpprovider.removealllisteners"></a>

####  removeAllListeners


`removeAllListeners(type: string): undefined`



<small>*Inherited from HttpProvider.removeAllListeners*</small>

<small>*Defined in [types/web3-providers-http.d.ts:22](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L22)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |





**Returns:** `undefined`




<a id="_oauthhttpprovider_.oauthhttpprovider.removelistener"></a>

####  removeListener


`removeListener(type: string, callback: function): undefined`



<small>*Inherited from HttpProvider.removeListener*</small>

<small>*Defined in [types/web3-providers-http.d.ts:21](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L21)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |
| callback | `function`   |  - |





**Returns:** `undefined`




<a id="_oauthhttpprovider_.oauthhttpprovider.reset"></a>

####  reset


`reset(): undefined`



<small>*Inherited from HttpProvider.reset*</small>

<small>*Defined in [types/web3-providers-http.d.ts:23](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L23)*</small>





**Returns:** `undefined`




<a id="_oauthhttpprovider_.oauthhttpprovider.send"></a>

####  send


`send(payload: JsonRPCRequest, callback: function): void`



<small>*Inherited from HttpProvider.send*</small>

<small>*Defined in [types/web3-providers-http.d.ts:27](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/types/web3-providers-http.d.ts#L27)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| callback | `function`   |  - |





**Returns:** `void`




<a id="_oauthhttpprovider_.oauthhttpprovider.sendasync"></a>

####  sendAsync


`sendAsync(payload: JsonRPCRequest, callback: function): void`



<small>*Defined in [oauthhttpprovider.ts:67](https://github.com/OutThereLabs/bitski-js-sdk/blob/bde0279/src/oauthhttpprovider.ts#L67)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| callback | `function`   |  - |





**Returns:** `void`







