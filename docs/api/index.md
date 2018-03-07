---
---



#  Bitski.js

## Index

### External modules

* ["bitski"](#_bitski_)
* ["bitskiprovider"](#_bitskiprovider_)
* ["dialog"](#_dialog_)
* ["oauthhttpprovider"](#_oauthhttpprovider_)



---

<a id="_bitski_"></a>


### Functions
<a id="_bitski_.initializeweb3"></a>

###  InitializeWeb3



Initialize [Web3](https://github.com/ethereum/web3) with Bitski. This will be ignored if a web3 object already exists.




##### Declaration


```typescript
function InitializeWeb3(client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string): Web3
```
<small>*Defined in [bitski.ts:17](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitski.ts#L17)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| client_id | `string`   |  OAuth Client ID |
| redirect_uri _(Optional)_ | `string`   |  Redirect URL, defaults to window.URL |
| post_logout_redirect_uri _(Optional)_ | `string`   |  Post logout redirect URL, defaults to window.URL |



##### Return Value
`Web3`


Web3 object configured for Bitski.








---

<a id="_bitskiprovider_"></a>


<a id="_bitskiprovider_.bitskiprovider"></a>

##  BitskiProvider


A Web3 provider that connects to the Bitski service


#### Example

```javascript
var provider = new BitskiProvider('MY_CLIENT_ID');
```


<a id="_bitskiprovider_.bitskiprovider.constructor"></a>
### constructor
```typescript
new BitskiProvider(client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string): BitskiProvider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| client_id | `string`   |  OAuth Client ID |
| redirect_uri _(Optional)_ | `string`   |  Redirect URL, defaults to window.location.href |
| post_logout_redirect_uri _(Optional)_ | `string`   |  Post logout redirect URL, defaults to window.location.href |



##### Return Value
[BitskiProvider](#_bitskiprovider_.bitskiprovider)





---

### Properties


<a id="_bitskiprovider_.bitskiprovider.currenttransactiondialog"></a>

#### currentTransactionDialog
```javascript
private var currentTransactionDialog: Dialog =  null
```
<small>*Defined in [bitskiprovider.ts:102](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L102)*</small>






<a id="_bitskiprovider_.bitskiprovider.pendingtransactions"></a>

#### pendingTransactions
```javascript
private var pendingTransactions: object[] =  []
```
<small>*Defined in [bitskiprovider.ts:101](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L101)*</small>


<a id="_bitskiprovider_.bitskiprovider.queuedsends"></a>

#### queuedSends

Queued requests to be sent upon logging in.


```javascript
private var queuedSends: object[] =  []
```
<small>*Defined in [bitskiprovider.ts:100](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L100)*</small>







---

### Methods
<a id="_bitskiprovider_.bitskiprovider.didsignin"></a>

#### didSignIn




##### Declaration


```typescript
function didSignIn(user: User)
```
<small>*Defined in [bitskiprovider.ts:175](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L175)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User`   |  - |








<a id="_bitskiprovider_.bitskiprovider.flushqueuedsends"></a>

#### flushQueuedSends



Flush all queued requests




##### Declaration


```typescript
private function flushQueuedSends(user: User)
```
<small>*Defined in [bitskiprovider.ts:184](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L184)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User`   |  User authentication object to send the requests through. |








<a id="_bitskiprovider_.bitskiprovider.isconnected"></a>

#### isConnected



Check whether we are connected to the server.




##### Declaration


```typescript
function isConnected(): boolean
```
<small>*Defined in [bitskiprovider.ts:255](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L255)*</small>



##### Return Value
`boolean`


boolean if we are connected.







<a id="_bitskiprovider_.bitskiprovider.receivemessage"></a>

#### receiveMessage



Returns a boolean value that indicates whether the Web3 method can be executed without being logged in.




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [bitskiprovider.ts:119](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L119)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |  - |



##### Return Value
boolean for if the method can be executed without being logged in.








<a id="_bitskiprovider_.bitskiprovider.requiresauthentication"></a>

#### requiresAuthentication




##### Declaration


```typescript
private function requiresAuthentication(method: string): boolean
```
<small>*Defined in [bitskiprovider.ts:147](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L147)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  - |



##### Return Value
`boolean`







<a id="_bitskiprovider_.bitskiprovider.requiresauthorization"></a>

#### requiresAuthorization



Returns a boolean value that indicates whether the Web3 method can be executed without the user's explicit authorization.




##### Declaration


```typescript
private function requiresAuthorization(method: string): boolean
```
<small>*Defined in [bitskiprovider.ts:165](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L165)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  a web3 method name (ex: "eth_sign") |



##### Return Value
`boolean`








<a id="_bitskiprovider_.bitskiprovider.send"></a>

#### send



Sends a Web3 request.




##### Declaration


```typescript
function send(payload: JsonRPCRequest, callback: function)
```
<small>*Defined in [bitskiprovider.ts:196](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L196)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| callback | `function`   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |









<a id="_bitskiprovider_.bitskiprovider.sendauthenticated"></a>

#### sendAuthenticated



Sends a request with authentication headers.




##### Declaration


```typescript
function sendAuthenticated(payload: JsonRPCRequest, user: User, callback: function)
```
<small>*Defined in [bitskiprovider.ts:215](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L215)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| user | `User`   |  User authentication object to send the requests through. |
| callback | `function`   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |








<a id="_bitskiprovider_.bitskiprovider.showauthorization"></a>

#### showAuthorization



Presents an authorization request to the user.




##### Declaration


```typescript
function showAuthorization(payload: JsonRPCRequest, user: User, callback: function)
```
<small>*Defined in [bitskiprovider.ts:228](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L228)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| user | `User`   |  - |
| callback | `function`   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |











---


### Relationships
##### Extends
* [&quot;oauthhttpprovider&quot;](#_oauthhttpprovider_).[OAuthHttpProvider](#_oauthhttpprovider_.oauthhttpprovider)

---

<a id="_bitskiprovider_.bitskiprovidersettings"></a>

##  BitskiProviderSettings


Settings for configuring Bitski.



<a id="_bitskiprovider_.bitskiprovidersettings.constructor-1"></a>
### constructor
```typescript
new BitskiProviderSettings(authority: string, client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string): BitskiProviderSettings
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| authority | `string`   |  Bitski OAuth URL |
| client_id | `string`   |  Your application's Bitski client ID |
| redirect_uri _(Optional)_ | `string`   |  URL to redirect to after log in |
| post_logout_redirect_uri _(Optional)_ | `string`   |  URL to redirect to after log out |



##### Return Value
[BitskiProviderSettings](#_bitskiprovider_.bitskiprovidersettings)





---

### Properties
<a id="_bitskiprovider_.bitskiprovidersettings.authority"></a>

#### authority

OAuth provider URL


```javascript
var authority: string
```
<small>*Defined in [bitskiprovider.ts:14](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L14)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.automaticsilentrenew"></a>

#### automaticSilentRenew

Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration. The attempt is made as a result of the `accessTokenExpiring` event being raised.


```javascript
var automaticSilentRenew: boolean = true
```
<small>*Defined in [bitskiprovider.ts:54](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L54)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.client_id"></a>

#### client_id

Your client application's identifier as registered with Bitski.


```javascript
var client_id: string
```
<small>*Defined in [bitskiprovider.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L18)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.filterprotocolclaims"></a>

#### filterProtocolClaims

Should OIDC protocol claims be removed from profile.


```javascript
var filterProtocolClaims: boolean = true
```
<small>*Defined in [bitskiprovider.ts:63](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L63)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.loaduserinfo"></a>

#### loadUserInfo

Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.


```javascript
var loadUserInfo: boolean = true
```
<small>*Defined in [bitskiprovider.ts:68](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L68)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.popup_post_logout_redirect_uri"></a>

#### popup_post_logout_redirect_uri

The post-logout redirect URI for the popup method.


```javascript
var popup_post_logout_redirect_uri: string =  this.popup_post_logout_redirect_uri
```
<small>*Defined in [bitskiprovider.ts:44](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L44)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.popup_redirect_uri"></a>

#### popup_redirect_uri

The URL for the page containing the call to `signinPopupCallback` to handle the callback from Bitski.


```javascript
var popup_redirect_uri: string =  this.redirect_uri
```
<small>*Defined in [bitskiprovider.ts:40](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L40)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.post_logout_redirect_uri"></a>

#### post_logout_redirect_uri

The post-logout redirect URI.


```javascript
var post_logout_redirect_uri: string
```
<small>*Defined in [bitskiprovider.ts:35](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L35)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.redirect_uri"></a>

#### redirect_uri

The redirect URI of your client application to receive the OAuth response from the Bitski.


```javascript
var redirect_uri: string
```
<small>*Defined in [bitskiprovider.ts:31](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L31)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.response_type"></a>

#### response_type

The type of response desired from the provider.


```javascript
var response_type: string = "token id_token"
```
<small>*Defined in [bitskiprovider.ts:22](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L22)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.scope"></a>

#### scope

The OAuth scope being requested from Bitski.


```javascript
var scope: string = "openid"
```
<small>*Defined in [bitskiprovider.ts:26](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L26)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.silentrequesttimeout"></a>

#### silentRequestTimeout

Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out.


```javascript
var silentRequestTimeout: number = 10000
```
<small>*Defined in [bitskiprovider.ts:59](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L59)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.silent_redirect_uri"></a>

#### silent_redirect_uri

The URL for the page containing the code handling the silent renew.


```javascript
var silent_redirect_uri: string =  this.redirect_uri
```
<small>*Defined in [bitskiprovider.ts:48](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L48)*</small>




---


### Relationships
##### Implements
* UserManagerSettings

---



---

<a id="_dialog_"></a>


<a id="_dialog_.dialog"></a>

##  Dialog


<a id="_dialog_.dialog.constructor"></a>
### constructor
```typescript
new Dialog(content: any): Dialog
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| content | `any`   |  - |



##### Return Value
[Dialog](#_dialog_.dialog)





---

### Properties
<a id="_dialog_.dialog.body"></a>

#### body
```javascript
var body: HTMLElement
```
<small>*Defined in [dialog.ts:4](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L4)*</small>


<a id="_dialog_.dialog.closebutton"></a>

#### closeButton
```javascript
var closeButton: HTMLElement
```
<small>*Defined in [dialog.ts:6](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L6)*</small>


<a id="_dialog_.dialog.container"></a>

#### container
```javascript
var container: HTMLElement
```
<small>*Defined in [dialog.ts:3](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L3)*</small>


<a id="_dialog_.dialog.content"></a>

#### content
```javascript
var content: any
```
<small>*Defined in [dialog.ts:2](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L2)*</small>


<a id="_dialog_.dialog.dialog-1"></a>

#### dialog
```javascript
var dialog: HTMLElement
```
<small>*Defined in [dialog.ts:5](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L5)*</small>




---

### Methods
<a id="_dialog_.dialog.create"></a>

#### create




##### Declaration


```typescript
function create(): HTMLElement
```
<small>*Defined in [dialog.ts:25](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L25)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.createbody"></a>

#### createBody




##### Declaration


```typescript
function createBody(): HTMLElement
```
<small>*Defined in [dialog.ts:96](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L96)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.createclosebutton"></a>

#### createCloseButton




##### Declaration


```typescript
function createCloseButton(): HTMLElement
```
<small>*Defined in [dialog.ts:41](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L41)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.createcontainer"></a>

#### createContainer




##### Declaration


```typescript
function createContainer(): HTMLElement
```
<small>*Defined in [dialog.ts:81](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L81)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.createdialog"></a>

#### createDialog




##### Declaration


```typescript
function createDialog(): HTMLElement
```
<small>*Defined in [dialog.ts:67](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L67)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.dismiss"></a>

#### dismiss




##### Declaration


```typescript
function dismiss()
```
<small>*Defined in [dialog.ts:114](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L114)*</small>








<a id="_dialog_.dialog.render"></a>

#### render




##### Declaration


```typescript
function render(): HTMLElement
```
<small>*Defined in [dialog.ts:109](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/dialog.ts#L109)*</small>



##### Return Value
`HTMLElement`









---



---



---

<a id="_oauthhttpprovider_"></a>


<a id="_oauthhttpprovider_.oauthproviderintegrationtype"></a>

####  OAuthProviderIntegrationType





<a id="_oauthhttpprovider_.oauthproviderintegrationtype.iframe"></a>

####  IFRAME


```javascript
var IFRAME: 
```
<small>*Defined in [oauthhttpprovider.ts:13](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L13)*</small>





<a id="_oauthhttpprovider_.oauthproviderintegrationtype.redirect"></a>

####  REDIRECT


```javascript
var REDIRECT: 
```
<small>*Defined in [oauthhttpprovider.ts:14](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L14)*</small>








<a id="_oauthhttpprovider_.oauthhttpprovider"></a>

##  OAuthHttpProvider


A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls



<a id="_oauthhttpprovider_.oauthhttpprovider.constructor"></a>
### constructor
```typescript
new OAuthHttpProvider(host: string, timeout: number, settings: UserManagerSettings): OAuthHttpProvider
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| host | `string`   |  JSON-RPC endpoint |
| timeout | `number`   |  Timeout in seconds |
| settings | `UserManagerSettings`   |  settings object for configuring OAuth, see [BitskiProviderSettings](#class-bitskiprovidersettings) |



##### Return Value
[OAuthHttpProvider](#_oauthhttpprovider_.oauthhttpprovider)





---

### Properties

<a id="_oauthhttpprovider_.oauthhttpprovider.authenticationdialog"></a>

#### authenticationDialog
```javascript
private var authenticationDialog: Dialog
```
<small>*Defined in [oauthhttpprovider.ts:35](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L35)*</small>



<a id="_oauthhttpprovider_.oauthhttpprovider.currentsigninpromise"></a>

#### currentSignInPromise

Cached sign in promise.


```javascript
private var currentSignInPromise: Promise<User> =  null
```
<small>*Defined in [oauthhttpprovider.ts:46](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L46)*</small>


<a id="_oauthhttpprovider_.oauthhttpprovider.currentuser"></a>

#### currentUser

The current logged in `User`


```javascript
var currentUser: User =  null
```
<small>*Defined in [oauthhttpprovider.ts:28](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L28)*</small>


<a id="_oauthhttpprovider_.oauthhttpprovider.host"></a>

#### host

The JSON-RPC endpoint


```javascript
var host: string
```
<small>*Defined in [oauthhttpprovider.ts:32](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L32)*</small>


<a id="_oauthhttpprovider_.oauthhttpprovider.integrationtype"></a>

#### integrationType
```javascript
var integrationType: OAuthProviderIntegrationType =  OAuthProviderIntegrationType.IFRAME
```
<small>*Defined in [oauthhttpprovider.ts:34](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L34)*</small>




<a id="_oauthhttpprovider_.oauthhttpprovider.settings"></a>

#### settings

Object containing the OAuth settings. see [BitskiProviderSettings](#class-bitskiprovidersettings) Cached sign in promise.


```javascript
var settings: UserManagerSettings
```
<small>*Defined in [oauthhttpprovider.ts:41](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L41)*</small>


<a id="_oauthhttpprovider_.oauthhttpprovider.usermanager"></a>

#### userManager

Instance user manager object.


```javascript
var userManager: UserManager
```
<small>*Defined in [oauthhttpprovider.ts:24](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L24)*</small>




---

### Methods
<a id="_oauthhttpprovider_.oauthhttpprovider._preparerequest"></a>

#### _prepareRequest



Prepares a new XMLHttpRequest with the proper headers




##### Declaration


```typescript
private function _prepareRequest(): XMLHttpRequest
```
<small>*Defined in [oauthhttpprovider.ts:152](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L152)*</small>



##### Return Value
`XMLHttpRequest`


Request object that is ready for a payload.






<a id="_oauthhttpprovider_.oauthhttpprovider.didsignin"></a>

#### didSignIn




##### Declaration


```typescript
function didSignIn(user: User)
```
<small>*Defined in [oauthhttpprovider.ts:139](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L139)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User`   |  - |









<a id="_oauthhttpprovider_.oauthhttpprovider.receivemessage"></a>

#### receiveMessage




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [oauthhttpprovider.ts:68](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L68)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |  - |












<a id="_oauthhttpprovider_.oauthhttpprovider.sendasync"></a>

#### sendAsync



Send a web3 / JSON-RPC request asynchronously.




##### Declaration


```typescript
function sendAsync(payload: JsonRPCRequest, callback: function)
```
<small>*Defined in [oauthhttpprovider.ts:166](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L166)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  The JSON-RPC request object to send |
| callback | `function`   |  Handler function invoked when the request has completed. |








<a id="_oauthhttpprovider_.oauthhttpprovider.signin"></a>

#### signIn



Sign in using the current settings.




##### Declaration


```typescript
function signIn(): Promise<User>
```
<small>*Defined in [oauthhttpprovider.ts:83](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L83)*</small>



##### Return Value
`Promise<User>`


A promise for a user.








---


### Relationships
##### Extends
* HttpProvider

---





