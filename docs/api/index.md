---
---



#  Bitski.js

## Index

### External modules

* ["bitski"](#_bitski_)
* ["bitskiprovider"](#_bitskiprovider_)
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


<a id="_bitskiprovider_.bitskiprovider.currentsigninpromise"></a>

#### currentSignInPromise

Cached sign in promise.


```javascript
private var currentSignInPromise: Promise<User> =  null
```
<small>*Defined in [bitskiprovider.ts:93](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L93)*</small>





<a id="_bitskiprovider_.bitskiprovider.queuedsends"></a>

#### queuedSends

Queued requests to be sent upon logging in.


```javascript
private var queuedSends: object[] =  []
```
<small>*Defined in [bitskiprovider.ts:98](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L98)*</small>







---

### Methods
<a id="_bitskiprovider_.bitskiprovider.flushqueuedsends"></a>

#### flushQueuedSends



Flush all queued requests




##### Declaration


```typescript
private function flushQueuedSends(user: User)
```
<small>*Defined in [bitskiprovider.ts:170](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L170)*</small>



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
<small>*Defined in [bitskiprovider.ts:222](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L222)*</small>



##### Return Value
`boolean`


boolean if we are connected.









<a id="_bitskiprovider_.bitskiprovider.requiresauthentication"></a>

#### requiresAuthentication



Returns a boolean value that indicates whether the Web3 method can be executed without being logged in.




##### Declaration


```typescript
private function requiresAuthentication(method: string): boolean
```
<small>*Defined in [bitskiprovider.ts:115](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L115)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  A web3 method name (ex: "eth_sign") |



##### Return Value
`boolean`


boolean for if the method can be executed without being logged in.






<a id="_bitskiprovider_.bitskiprovider.requiresauthorization"></a>

#### requiresAuthorization



Returns a boolean value that indicates whether the Web3 method can be executed without the user's explicit authorization.




##### Declaration


```typescript
private function requiresAuthorization(method: string): boolean
```
<small>*Defined in [bitskiprovider.ts:133](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L133)*</small>



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
<small>*Defined in [bitskiprovider.ts:182](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L182)*</small>



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
<small>*Defined in [bitskiprovider.ts:201](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L201)*</small>



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
<small>*Defined in [bitskiprovider.ts:214](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L214)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| user | `User`   |  - |
| callback | `function`   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |








<a id="_bitskiprovider_.bitskiprovider.signin"></a>

#### signIn



Sign in to Bitski.




##### Declaration


```typescript
function signIn(): Promise<User>
```
<small>*Defined in [bitskiprovider.ts:147](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L147)*</small>



##### Return Value
`Promise<User>`


Promise with the current user








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
<small>*Defined in [bitskiprovider.ts:12](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L12)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.automaticsilentrenew"></a>

#### automaticSilentRenew

Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration. The attempt is made as a result of the `accessTokenExpiring` event being raised.


```javascript
var automaticSilentRenew: boolean = true
```
<small>*Defined in [bitskiprovider.ts:52](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L52)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.client_id"></a>

#### client_id

Your client application's identifier as registered with Bitski.


```javascript
var client_id: string
```
<small>*Defined in [bitskiprovider.ts:16](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L16)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.filterprotocolclaims"></a>

#### filterProtocolClaims

Should OIDC protocol claims be removed from profile.


```javascript
var filterProtocolClaims: boolean = true
```
<small>*Defined in [bitskiprovider.ts:61](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L61)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.loaduserinfo"></a>

#### loadUserInfo

Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.


```javascript
var loadUserInfo: boolean = true
```
<small>*Defined in [bitskiprovider.ts:66](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L66)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.popup_post_logout_redirect_uri"></a>

#### popup_post_logout_redirect_uri

The post-logout redirect URI for the popup method.


```javascript
var popup_post_logout_redirect_uri: string =  this.popup_post_logout_redirect_uri
```
<small>*Defined in [bitskiprovider.ts:42](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L42)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.popup_redirect_uri"></a>

#### popup_redirect_uri

The URL for the page containing the call to `signinPopupCallback` to handle the callback from Bitski.


```javascript
var popup_redirect_uri: string =  this.redirect_uri
```
<small>*Defined in [bitskiprovider.ts:38](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L38)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.post_logout_redirect_uri"></a>

#### post_logout_redirect_uri

The post-logout redirect URI.


```javascript
var post_logout_redirect_uri: string
```
<small>*Defined in [bitskiprovider.ts:33](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L33)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.redirect_uri"></a>

#### redirect_uri

The redirect URI of your client application to receive the OAuth response from the Bitski.


```javascript
var redirect_uri: string
```
<small>*Defined in [bitskiprovider.ts:29](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L29)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.response_type"></a>

#### response_type

The type of response desired from the provider.


```javascript
var response_type: string = "token id_token"
```
<small>*Defined in [bitskiprovider.ts:20](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L20)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.scope"></a>

#### scope

The OAuth scope being requested from Bitski.


```javascript
var scope: string = "openid"
```
<small>*Defined in [bitskiprovider.ts:24](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L24)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.silentrequesttimeout"></a>

#### silentRequestTimeout

Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out.


```javascript
var silentRequestTimeout: number = 10000
```
<small>*Defined in [bitskiprovider.ts:57](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L57)*</small>


<a id="_bitskiprovider_.bitskiprovidersettings.silent_redirect_uri"></a>

#### silent_redirect_uri

The URL for the page containing the code handling the silent renew.


```javascript
var silent_redirect_uri: string =  this.redirect_uri
```
<small>*Defined in [bitskiprovider.ts:46](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/bitskiprovider.ts#L46)*</small>




---


### Relationships
##### Implements
* UserManagerSettings

---



---

<a id="_oauthhttpprovider_"></a>


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


<a id="_oauthhttpprovider_.oauthhttpprovider.currentuser"></a>

#### currentUser

The current logged in `User`


```javascript
var currentUser: User =  null
```
<small>*Defined in [oauthhttpprovider.ts:22](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L22)*</small>


<a id="_oauthhttpprovider_.oauthhttpprovider.host"></a>

#### host

The JSON-RPC endpoint


```javascript
var host: string
```
<small>*Defined in [oauthhttpprovider.ts:26](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L26)*</small>




<a id="_oauthhttpprovider_.oauthhttpprovider.settings"></a>

#### settings

Object containing the OAuth settings. see [BitskiProviderSettings](#class-bitskiprovidersettings)


```javascript
var settings: UserManagerSettings
```
<small>*Defined in [oauthhttpprovider.ts:30](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L30)*</small>


<a id="_oauthhttpprovider_.oauthhttpprovider.usermanager"></a>

#### userManager

Instance user manager object.


```javascript
var userManager: UserManager
```
<small>*Defined in [oauthhttpprovider.ts:18](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L18)*</small>




---

### Methods
<a id="_oauthhttpprovider_.oauthhttpprovider._preparerequest"></a>

#### _prepareRequest



Prepares a new XMLHttpRequest with the proper headers




##### Declaration


```typescript
private function _prepareRequest(): XMLHttpRequest
```
<small>*Defined in [oauthhttpprovider.ts:84](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L84)*</small>



##### Return Value
`XMLHttpRequest`


Request object that is ready for a payload.











<a id="_oauthhttpprovider_.oauthhttpprovider.sendasync"></a>

#### sendAsync



Send a web3 / JSON-RPC request asynchronously.




##### Declaration


```typescript
function sendAsync(payload: JsonRPCRequest, callback: function)
```
<small>*Defined in [oauthhttpprovider.ts:98](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L98)*</small>



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
<small>*Defined in [oauthhttpprovider.ts:51](https://github.com/OutThereLabs/bitski-js-sdk/blob/master/src/oauthhttpprovider.ts#L51)*</small>



##### Return Value
`Promise<User>`


A promise for a user.








---


### Relationships
##### Extends
* HttpProvider

---





