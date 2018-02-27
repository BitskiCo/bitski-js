---
---



#  Bitski.js

## Index

### External modules

* ["bitski"](#external-module-bitski-)
* ["bitskiprovider"](#external-module-bitskiprovider-)
* ["oauthhttpprovider"](#external-module-oauthhttpprovider-)



## External modules
---

<a id="_bitski_"></a>

## &quot;bitski&quot;


<a id="_bitski_.initializeweb3"></a>

####  InitializeWeb3


`InitializeWeb3(client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string): Web3`



<small>*Defined in [bitski.ts:15](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/bitski.ts#L15)*</small>



Initialize [Web3](https://github.com/ethereum/web3) with Bitski. This will be ignored if a web3 object already exists.
*__example__*: // Set up Bitski for exampledapp.co web3 = bitsi.InitializeWeb3('YOUR-CLIENT-ID');



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| client_id | `string`   |  - |
| redirect_uri | `string`   |  Redirect URL, defaults to window.URL |
| post_logout_redirect_uri | `string`   |  Post logout redirect URL, defaults to window.URL |





**Returns:** `Web3`
Web3 object configured for Bitski.






---

<a id="_bitskiprovider_"></a>

## &quot;bitskiprovider&quot;


<a id="_bitskiprovider_.bitskiprovider"></a>

####  BitskiProvider


A Web3 provider that connects to the Bitski service
*__example__*: var provider = new BitskiProvider('MY_CLIENT_ID');







### Constructors
<a id="_bitskiprovider_.bitskiprovider.constructor"></a>

####  constructor



`new BitskiProvider(client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string): BitskiProvider`



<small>*Overrides [OAuthHttpProvider](#class-oauthhttpprovider).[constructor](#_oauthhttpprovider_.oauthhttpprovider.constructor)*</small>

<small>*Defined in [bitskiprovider.ts:10](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/bitskiprovider.ts#L10)*</small>




**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| client_id | `string`   |  - |
| redirect_uri | `string`   |  Redirect URL, defaults to window.URL |
| post_logout_redirect_uri | `string`   |  Post logout redirect URL, defaults to window.URL |





**Returns:** [BitskiProvider](#class-bitskiprovider)





### Properties
<a id="_bitskiprovider_.bitskiprovider.adddefaultevents"></a>

####  addDefaultEvents


`addDefaultEvents:  undefined `

<small>*Inherited from HttpProvider.addDefaultEvents*</small>

<small>*Defined in [types/web3-providers-http.d.ts:19](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L19)*</small>





<a id="_bitskiprovider_.bitskiprovider.connection"></a>

####  connection


`connection:  undefined `

<small>*Inherited from HttpProvider.connection*</small>

<small>*Defined in [types/web3-providers-http.d.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L18)*</small>





<a id="_bitskiprovider_.bitskiprovider.currentuser"></a>

####  currentUser


`currentUser:  User  =  null`

<small>*Inherited from [OAuthHttpProvider](#class-oauthhttpprovider).[currentUser](#_oauthhttpprovider_.oauthhttpprovider.currentuser)*</small>

<small>*Defined in [oauthhttpprovider.ts:16](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L16)*</small>





<a id="_bitskiprovider_.bitskiprovider.host"></a>

####  host


`host:  string `

<small>*Inherited from [OAuthHttpProvider](#class-oauthhttpprovider).[host](#_oauthhttpprovider_.oauthhttpprovider.host)*</small>

<small>*Defined in [oauthhttpprovider.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L17)*</small>





<a id="_bitskiprovider_.bitskiprovider.notificationcallbacks"></a>

####  notificationCallbacks


`notificationCallbacks:  undefined `

<small>*Inherited from HttpProvider.notificationCallbacks*</small>

<small>*Defined in [types/web3-providers-http.d.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L17)*</small>





<a id="_bitskiprovider_.bitskiprovider.responsecallbacks"></a>

####  responseCallbacks


`responseCallbacks:  undefined `

<small>*Inherited from HttpProvider.responseCallbacks*</small>

<small>*Defined in [types/web3-providers-http.d.ts:16](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L16)*</small>





<a id="_bitskiprovider_.bitskiprovider.settings"></a>

####  settings


`settings:  any `

<small>*Inherited from [OAuthHttpProvider](#class-oauthhttpprovider).[settings](#_oauthhttpprovider_.oauthhttpprovider.settings)*</small>

<small>*Defined in [oauthhttpprovider.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L18)*</small>





<a id="_bitskiprovider_.bitskiprovider.usermanager"></a>

####  userManager


`userManager:  UserManager `

<small>*Inherited from [OAuthHttpProvider](#class-oauthhttpprovider).[userManager](#_oauthhttpprovider_.oauthhttpprovider.usermanager)*</small>

<small>*Defined in [oauthhttpprovider.ts:15](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L15)*</small>






### Methods
<a id="_bitskiprovider_.bitskiprovider.on"></a>

####  on


`on(type: string, callback: function): undefined`



<small>*Inherited from HttpProvider.on*</small>

<small>*Defined in [types/web3-providers-http.d.ts:20](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L20)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |
| callback | `function`   |  - |





**Returns:** `undefined`




<a id="_bitskiprovider_.bitskiprovider.removealllisteners"></a>

####  removeAllListeners


`removeAllListeners(type: string): undefined`



<small>*Inherited from HttpProvider.removeAllListeners*</small>

<small>*Defined in [types/web3-providers-http.d.ts:22](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L22)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |





**Returns:** `undefined`




<a id="_bitskiprovider_.bitskiprovider.removelistener"></a>

####  removeListener


`removeListener(type: string, callback: function): undefined`



<small>*Inherited from HttpProvider.removeListener*</small>

<small>*Defined in [types/web3-providers-http.d.ts:21](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L21)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |
| callback | `function`   |  - |





**Returns:** `undefined`




<a id="_bitskiprovider_.bitskiprovider.requiressignin"></a>

#### «Private» requiresSignIn


`requiresSignIn(method: string): boolean`



<small>*Defined in [bitskiprovider.ts:36](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/bitskiprovider.ts#L36)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  - |





**Returns:** `boolean`




<a id="_bitskiprovider_.bitskiprovider.reset"></a>

####  reset


`reset(): undefined`



<small>*Inherited from HttpProvider.reset*</small>

<small>*Defined in [types/web3-providers-http.d.ts:23](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L23)*</small>





**Returns:** `undefined`




<a id="_bitskiprovider_.bitskiprovider.send"></a>

####  send


`send(payload: JsonRPCRequest, callback: function): void`



<small>*Overrides HttpProvider.send*</small>

<small>*Defined in [bitskiprovider.ts:40](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/bitskiprovider.ts#L40)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| callback | `function`   |  - |





**Returns:** `void`




<a id="_bitskiprovider_.bitskiprovider.sendasync"></a>

####  sendAsync


`sendAsync(payload: JsonRPCRequest, callback: function): void`



<small>*Inherited from [OAuthHttpProvider](#class-oauthhttpprovider).[sendAsync](#_oauthhttpprovider_.oauthhttpprovider.sendasync)*</small>

<small>*Defined in [oauthhttpprovider.ts:75](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L75)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| callback | `function`   |  - |





**Returns:** `void`




<a id="_bitskiprovider_.bitskiprovider.sendauthenticated"></a>

####  sendAuthenticated


`sendAuthenticated(payload: JsonRPCRequest, user: User, callback: function): void`



<small>*Defined in [bitskiprovider.ts:52](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/bitskiprovider.ts#L52)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| user | `User`   |  - |
| callback | `function`   |  - |





**Returns:** `void`




<a id="_bitskiprovider_.bitskiprovider.signin"></a>

####  signIn


`signIn(): Promise&lt;User&gt;`



<small>*Inherited from [OAuthHttpProvider](#class-oauthhttpprovider).[signIn](#_oauthhttpprovider_.oauthhttpprovider.signin)*</small>

<small>*Defined in [oauthhttpprovider.ts:35](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L35)*</small>





**Returns:** `Promise`.<`User`>





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

<small>*Defined in [oauthhttpprovider.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L18)*</small>




**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| host | `string`   |  JSON-RPC endpoint |
| timeout | `number`   |  Timeout in seconds |
| settings | `any`   |  settings object for configuring OAuth, see [InitializeWeb3](#_bitski_.initializeweb3) |





**Returns:** [OAuthHttpProvider](#class-oauthhttpprovider)





### Properties
<a id="_oauthhttpprovider_.oauthhttpprovider.adddefaultevents"></a>

####  addDefaultEvents


`addDefaultEvents:  undefined `

<small>*Inherited from HttpProvider.addDefaultEvents*</small>

<small>*Defined in [types/web3-providers-http.d.ts:19](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L19)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.connection"></a>

####  connection


`connection:  undefined `

<small>*Inherited from HttpProvider.connection*</small>

<small>*Defined in [types/web3-providers-http.d.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L18)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.currentuser"></a>

####  currentUser


`currentUser:  User  =  null`

<small>*Defined in [oauthhttpprovider.ts:16](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L16)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.host"></a>

####  host


`host:  string `

<small>*Defined in [oauthhttpprovider.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L17)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.notificationcallbacks"></a>

####  notificationCallbacks


`notificationCallbacks:  undefined `

<small>*Inherited from HttpProvider.notificationCallbacks*</small>

<small>*Defined in [types/web3-providers-http.d.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L17)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.responsecallbacks"></a>

####  responseCallbacks


`responseCallbacks:  undefined `

<small>*Inherited from HttpProvider.responseCallbacks*</small>

<small>*Defined in [types/web3-providers-http.d.ts:16](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L16)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.settings"></a>

####  settings


`settings:  any `

<small>*Defined in [oauthhttpprovider.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L18)*</small>





<a id="_oauthhttpprovider_.oauthhttpprovider.usermanager"></a>

####  userManager


`userManager:  UserManager `

<small>*Defined in [oauthhttpprovider.ts:15](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L15)*</small>






### Methods
<a id="_oauthhttpprovider_.oauthhttpprovider._preparerequest"></a>

#### «Private» _prepareRequest


`_prepareRequest(): XMLHttpRequest`



<small>*Defined in [oauthhttpprovider.ts:65](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L65)*</small>





**Returns:** `XMLHttpRequest`




<a id="_oauthhttpprovider_.oauthhttpprovider.on"></a>

####  on


`on(type: string, callback: function): undefined`



<small>*Inherited from HttpProvider.on*</small>

<small>*Defined in [types/web3-providers-http.d.ts:20](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L20)*</small>



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

<small>*Defined in [types/web3-providers-http.d.ts:22](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L22)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  - |





**Returns:** `undefined`




<a id="_oauthhttpprovider_.oauthhttpprovider.removelistener"></a>

####  removeListener


`removeListener(type: string, callback: function): undefined`



<small>*Inherited from HttpProvider.removeListener*</small>

<small>*Defined in [types/web3-providers-http.d.ts:21](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L21)*</small>



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

<small>*Defined in [types/web3-providers-http.d.ts:23](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L23)*</small>





**Returns:** `undefined`




<a id="_oauthhttpprovider_.oauthhttpprovider.send"></a>

####  send


`send(payload: JsonRPCRequest, callback: function): void`



<small>*Inherited from HttpProvider.send*</small>

<small>*Defined in [types/web3-providers-http.d.ts:27](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/types/web3-providers-http.d.ts#L27)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| callback | `function`   |  - |





**Returns:** `void`




<a id="_oauthhttpprovider_.oauthhttpprovider.sendasync"></a>

####  sendAsync


`sendAsync(payload: JsonRPCRequest, callback: function): void`



<small>*Defined in [oauthhttpprovider.ts:75](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L75)*</small>



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  - |
| callback | `function`   |  - |





**Returns:** `void`




<a id="_oauthhttpprovider_.oauthhttpprovider.signin"></a>

####  signIn


`signIn(): Promise&lt;User&gt;`



<small>*Defined in [oauthhttpprovider.ts:35](https://github.com/OutThereLabs/bitski-js-sdk/blob/1b16ef4/src/oauthhttpprovider.ts#L35)*</small>





**Returns:** `Promise`.<`User`>







