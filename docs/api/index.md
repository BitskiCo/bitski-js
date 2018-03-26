---
---



#  Bitski.js

## Index

### External modules

* ["bitski"](#_bitski_)
* ["bitski-provider"](#_bitski_provider_)
* ["bitski-provider-settings"](#_bitski_provider_settings_)
* ["connect-button"](#_connect_button_)
* ["dialog"](#_dialog_)
* ["login-button"](#_login_button_)
* ["oauth-http-provider"](#_oauth_http_provider_)



---

<a id="_bitski_"></a>


<a id="_bitski_.bitski"></a>

##  Bitski


Bitski SDK



<a id="_bitski_.bitski.constructor"></a>
### constructor
```typescript
new Bitski(clientId: string, networkName?: string, redirectUri?: string, postLogoutRedirectUri?: string): Bitski
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| clientId | `string`  | - |   OAuth Client ID |
| networkName | `string`  | &quot;kovan&quot; |   Web3 network name, defaults to 'kovan' |
| redirectUri _(Optional)_ | `string`  | - |   Redirect URL, defaults to window.URL |
| postLogoutRedirectUri _(Optional)_ | `string`  | - |   Post logout redirect URL, defaults to window.URL |



##### Return Value
[Bitski](#_bitski_.bitski)





---

### Properties
<a id="_bitski_.bitski.provider"></a>

#### provider
```javascript
var provider: BitskiProvider
```
<small>*Defined in [bitski.ts:27](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski.ts#L27)*</small>




---

### Methods
<a id="_bitski_.bitski.getconnectbutton"></a>

#### getConnectButton






##### Declaration


```typescript
function getConnectButton(existingDiv?: HTMLElement): ConnectButton
```
<small>*Defined in [bitski.ts:58](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski.ts#L58)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| existingDiv _(Optional)_ | `HTMLElement`   |  Existing element to turn into a Bitski connect button |



##### Return Value
[ConnectButton](#_connect_button_.connectbutton)







<a id="_bitski_.bitski.getweb3"></a>

#### getWeb3



Returns an initialized web3 API




##### Declaration


```typescript
function getWeb3(): Web3
```
<small>*Defined in [bitski.ts:51](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski.ts#L51)*</small>



##### Return Value
`Web3`









---



---


### Functions
<a id="_bitski_.initializeweb3"></a>

###  InitializeWeb3



Deprecated, use new Bitski(...) instead




##### Declaration


```typescript
function InitializeWeb3(clientId: string, networkName?: string, redirectUri?: string, postLogoutRedirectUri?: string): Web3
```
<small>*Defined in [bitski.ts:12](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski.ts#L12)*</small>



##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| clientId | `string`  | - |   - |
| networkName | `string`  | &quot;kovan&quot; |   - |
| redirectUri _(Optional)_ | `string`  | - |   - |
| postLogoutRedirectUri _(Optional)_ | `string`  | - |   - |



##### Return Value
`Web3`









---

<a id="_bitski_provider_"></a>


<a id="_bitski_provider_.bitskiprovider"></a>

##  BitskiProvider


A Web3 provider that connects to the Bitski service


#### Example

```javascript
var provider = new BitskiProvider('MY_CLIENT_ID');
```


<a id="_bitski_provider_.bitskiprovider.constructor"></a>
### constructor
```typescript
new BitskiProvider(clientId: string, networkName?: string, redirectUri?: string, postLogoutRedirectUri?: string): BitskiProvider
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| clientId | `string`  | - |   OAuth Client ID |
| networkName | `string`  | &quot;kovan&quot; |   Network name |
| redirectUri _(Optional)_ | `string`  | - |   Redirect URL, defaults to window.location.href |
| postLogoutRedirectUri _(Optional)_ | `string`  | - |   Post logout redirect URL, defaults to window.location.href |



##### Return Value
[BitskiProvider](#_bitski_provider_.bitskiprovider)





---

### Properties


<a id="_bitski_provider_.bitskiprovider.authorizationintegrationtype"></a>

#### authorizationIntegrationType

Determines how the authorization modals show up for eth_call and eth_sendTransaction.


```javascript
var authorizationIntegrationType: OAuthProviderIntegrationType =  OAuthProviderIntegrationType.IFRAME
```
<small>*Defined in [bitski-provider.ts:30](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L30)*</small>



<a id="_bitski_provider_.bitskiprovider.currenttransactiondialog"></a>

#### currentTransactionDialog
```javascript
private var currentTransactionDialog: Dialog =  null
```
<small>*Defined in [bitski-provider.ts:43](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L43)*</small>


<a id="_bitski_provider_.bitskiprovider.currenttransactionwindow"></a>

#### currentTransactionWindow
```javascript
private var currentTransactionWindow: Window =  null
```
<small>*Defined in [bitski-provider.ts:44](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L44)*</small>



<a id="_bitski_provider_.bitskiprovider.locked"></a>

#### locked

Acts like metamask, won't try to auto sign in.


```javascript
var locked: boolean = false
```
<small>*Defined in [bitski-provider.ts:35](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L35)*</small>


<a id="_bitski_provider_.bitskiprovider.networkname"></a>

#### networkName
```javascript
private var networkName: string
```
<small>*Defined in [bitski-provider.ts:42](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L42)*</small>



<a id="_bitski_provider_.bitskiprovider.pendingtransactions"></a>

#### pendingTransactions
```javascript
private var pendingTransactions: JsonRPC[] =  []
```
<small>*Defined in [bitski-provider.ts:41](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L41)*</small>


<a id="_bitski_provider_.bitskiprovider.queuedsends"></a>

#### queuedSends

Queued requests to be sent upon logging in.


```javascript
private var queuedSends: JsonRPC[] =  []
```
<small>*Defined in [bitski-provider.ts:40](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L40)*</small>






---

### Methods
<a id="_bitski_provider_.bitskiprovider.didsignin"></a>

#### didSignIn



After sign in functionality




##### Declaration


```typescript
function didSignIn(user: User)
```
<small>*Defined in [bitski-provider.ts:65](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L65)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User`   |  User authentication object to flush send queue. |








<a id="_bitski_provider_.bitskiprovider.flushqueuedsends"></a>

#### flushQueuedSends



Flush all queued requests




##### Declaration


```typescript
private function flushQueuedSends(user: User)
```
<small>*Defined in [bitski-provider.ts:121](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L121)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User`   |  User authentication object to send the requests through. |








<a id="_bitski_provider_.bitskiprovider.isconnected"></a>

#### isConnected



Check whether we are connected to the server.




##### Declaration


```typescript
private function isConnected(): boolean
```
<small>*Defined in [bitski-provider.ts:223](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L223)*</small>



##### Return Value
`boolean`


boolean if we are connected.







<a id="_bitski_provider_.bitskiprovider.receivemessage"></a>

#### receiveMessage



Returns a boolean value that indicates whether the Web3 method can be executed without being logged in.




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [bitski-provider.ts:76](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L76)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |  - |



##### Return Value
boolean for if the method can be executed without being logged in.








<a id="_bitski_provider_.bitskiprovider.requiresauthentication"></a>

#### requiresAuthentication



Determines if web3 method requires authentication




##### Declaration


```typescript
private function requiresAuthentication(method: string): boolean
```
<small>*Defined in [bitski-provider.ts:132](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L132)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  a web3 method name (ex: 'eth_sign') |



##### Return Value
`boolean`







<a id="_bitski_provider_.bitskiprovider.requiresauthorization"></a>

#### requiresAuthorization



Returns a boolean value that indicates whether the Web3 method can be executed without the user's explicit authorization.




##### Declaration


```typescript
private function requiresAuthorization(method: string): boolean
```
<small>*Defined in [bitski-provider.ts:150](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L150)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `string`   |  a web3 method name (ex: 'eth_sign') |



##### Return Value
`boolean`








<a id="_bitski_provider_.bitskiprovider.send"></a>

#### send



Sends a Web3 request.




##### Declaration


```typescript
function send(payload: JsonRPCRequest, callback: JsonRPCCallback)
```
<small>*Defined in [bitski-provider.ts:103](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L103)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| callback | [JsonRPCCallback](#_bitski_provider_.jsonrpccallback)   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |








<a id="_bitski_provider_.bitskiprovider.sendauthenticated"></a>

#### sendAuthenticated



Sends a request with authentication headers.




##### Declaration


```typescript
private function sendAuthenticated(payload: JsonRPCRequest, user: User, callback: JsonRPCCallback)
```
<small>*Defined in [bitski-provider.ts:166](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L166)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| user | `User`   |  User authentication object to send the requests through. |
| callback | [JsonRPCCallback](#_bitski_provider_.jsonrpccallback)   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |








<a id="_bitski_provider_.bitskiprovider.showauthorization"></a>

#### showAuthorization



Presents an authorization request to the user.




##### Declaration


```typescript
private function showAuthorization(payload: JsonRPCRequest, user: User, callback: JsonRPCCallback)
```
<small>*Defined in [bitski-provider.ts:179](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L179)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  JSON-RPC request object to send. |
| user | `User`   |  - |
| callback | [JsonRPCCallback](#_bitski_provider_.jsonrpccallback)   |  Handler for send request. `function (e: Error, val: JSONRPCResponse) => void` |











---


### Relationships
##### Extends
* [&quot;oauth-http-provider&quot;](#_oauth_http_provider_).[OAuthHttpProvider](#_oauth_http_provider_.oauthhttpprovider)

---


<a id="_bitski_provider_.jsonrpc"></a>

####  JsonRPC





### Properties
<a id="_bitski_provider_.jsonrpc.callback"></a>

#### callback
```javascript
var callback: function
```
<small>*Defined in [bitski-provider.ts:14](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L14)*</small>

##### Type declaration
function (e: Error, val: JsonRPCResponse)
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| e | `Error`   |  - |
| val | `JsonRPCResponse`   |  - |







<a id="_bitski_provider_.jsonrpc.payload"></a>

#### payload
```javascript
var payload: JsonRPCRequest
```
<small>*Defined in [bitski-provider.ts:13](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L13)*</small>





<a id="_bitski_provider_.jsonrpccallback"></a>

####  JsonRPCCallback


```javascript
var JsonRPCCallback: function
```
<small>*Defined in [bitski-provider.ts:17](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L17)*</small>

##### Type declaration
function (e: Error, val: JsonRPCResponse)
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| e | `Error`   |  - |
| val | `JsonRPCResponse`   |  - |











<a id="_bitski_provider_.bitski_api_v1_host"></a>

#### «Const» BITSKI_API_V1_HOST


```javascript
var BITSKI_API_V1_HOST: "https://api.bitski.com/v1" = "https://api.bitski.com/v1"
```
<small>*Defined in [bitski-provider.ts:8](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L8)*</small>





<a id="_bitski_provider_.bitski_oauth_host"></a>

#### «Const» BITSKI_OAUTH_HOST


```javascript
var BITSKI_OAUTH_HOST: "https://account.bitski.com" = "https://account.bitski.com"
```
<small>*Defined in [bitski-provider.ts:9](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L9)*</small>





<a id="_bitski_provider_.bitski_web_host"></a>

#### «Const» BITSKI_WEB_HOST


```javascript
var BITSKI_WEB_HOST: "https://www.bitski.com" = "https://www.bitski.com"
```
<small>*Defined in [bitski-provider.ts:10](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider.ts#L10)*</small>







---

<a id="_bitski_provider_settings_"></a>


<a id="_bitski_provider_settings_.bitskiprovidersettings"></a>

##  BitskiProviderSettings


Settings for configuring Bitski.



<a id="_bitski_provider_settings_.bitskiprovidersettings.constructor"></a>
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
[BitskiProviderSettings](#_bitski_provider_settings_.bitskiprovidersettings)





---

### Properties
<a id="_bitski_provider_settings_.bitskiprovidersettings.authority"></a>

#### authority

OAuth provider URL


```javascript
var authority: string
```
<small>*Defined in [bitski-provider-settings.ts:10](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L10)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.automaticsilentrenew"></a>

#### automaticSilentRenew

Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration. The attempt is made as a result of the `accessTokenExpiring` event being raised.


```javascript
var automaticSilentRenew: boolean = true
```
<small>*Defined in [bitski-provider-settings.ts:63](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L63)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.client_id"></a>

#### client_id

Your client application's identifier as registered with Bitski.


```javascript
var client_id: string
```
<small>*Defined in [bitski-provider-settings.ts:16](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L16)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.filterprotocolclaims"></a>

#### filterProtocolClaims

Should OIDC protocol claims be removed from profile.


```javascript
var filterProtocolClaims: boolean = true
```
<small>*Defined in [bitski-provider-settings.ts:74](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L74)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.loaduserinfo"></a>

#### loadUserInfo

Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.


```javascript
var loadUserInfo: boolean = true
```
<small>*Defined in [bitski-provider-settings.ts:80](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L80)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.popupwindowfeatures"></a>

#### popupWindowFeatures

Features used to style and configure the popup window


```javascript
var popupWindowFeatures: string = "location=no,toolbar=no,width=360,height=340,left=100,top=100;"
```
<small>*Defined in [bitski-provider-settings.ts:85](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L85)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.popup_post_logout_redirect_uri"></a>

#### popup_post_logout_redirect_uri

The post-logout redirect URI for the popup method.


```javascript
var popup_post_logout_redirect_uri: string =  this.popup_post_logout_redirect_uri
```
<small>*Defined in [bitski-provider-settings.ts:51](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L51)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.popup_redirect_uri"></a>

#### popup_redirect_uri

The URL for the page containing the call to `signinPopupCallback` to handle the callback from Bitski.


```javascript
var popup_redirect_uri: string =  this.redirect_uri
```
<small>*Defined in [bitski-provider-settings.ts:46](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L46)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.post_logout_redirect_uri"></a>

#### post_logout_redirect_uri

The post-logout redirect URI.


```javascript
var post_logout_redirect_uri: string
```
<small>*Defined in [bitski-provider-settings.ts:39](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L39)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.redirect_uri"></a>

#### redirect_uri

The redirect URI of your client application to receive the OAuth response from the Bitski.


```javascript
var redirect_uri: string
```
<small>*Defined in [bitski-provider-settings.ts:33](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L33)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.response_type"></a>

#### response_type

The type of response desired from the provider.


```javascript
var response_type: string = "token id_token"
```
<small>*Defined in [bitski-provider-settings.ts:21](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L21)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.scope"></a>

#### scope

The OAuth scope being requested from Bitski.


```javascript
var scope: string = "openid"
```
<small>*Defined in [bitski-provider-settings.ts:26](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L26)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.silentrequesttimeout"></a>

#### silentRequestTimeout

Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out.


```javascript
var silentRequestTimeout: number = 10000
```
<small>*Defined in [bitski-provider-settings.ts:69](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L69)*</small>


<a id="_bitski_provider_settings_.bitskiprovidersettings.silent_redirect_uri"></a>

#### silent_redirect_uri

The URL for the page containing the code handling the silent renew.


```javascript
var silent_redirect_uri: string =  this.silent_redirect_uri
```
<small>*Defined in [bitski-provider-settings.ts:56](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/bitski-provider-settings.ts#L56)*</small>




---


### Relationships
##### Implements
* UserManagerSettings

---



---

<a id="_connect_button_"></a>


<a id="_connect_button_.connectbutton"></a>

##  ConnectButton


A buton used to connect to Bitski



<a id="_connect_button_.connectbutton.constructor"></a>
### constructor
```typescript
new ConnectButton(provider: BitskiProvider, existingDiv?: HTMLElement): ConnectButton
```
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| provider | [BitskiProvider](#_bitski_provider_.bitskiprovider)   |  The BitskiProvider that will be used to sign in |
| existingDiv _(Optional)_ | `HTMLElement`   |  An existing div to turn into a connect button |



##### Return Value
[ConnectButton](#_connect_button_.connectbutton)





---

### Properties
<a id="_connect_button_.connectbutton.callback"></a>

#### callback
```javascript
var callback: function
```
<small>*Defined in [connect-button.ts:11](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/connect-button.ts#L11)*</small>

##### Type declaration
function (error?: Error, user?: User)
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| error _(Optional)_ | `Error`   |  - |
| user _(Optional)_ | `User`   |  - |







<a id="_connect_button_.connectbutton.element"></a>

#### element
```javascript
var element: HTMLElement
```
<small>*Defined in [connect-button.ts:10](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/connect-button.ts#L10)*</small>


<a id="_connect_button_.connectbutton.provider"></a>

#### provider
```javascript
private var provider: BitskiProvider
```
<small>*Defined in [connect-button.ts:12](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/connect-button.ts#L12)*</small>




---

### Methods
<a id="_connect_button_.connectbutton.setdefaultstyle"></a>

#### setDefaultStyle




##### Declaration


```typescript
private function setDefaultStyle()
```
<small>*Defined in [connect-button.ts:43](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/connect-button.ts#L43)*</small>








<a id="_connect_button_.connectbutton.signin"></a>

#### signin




##### Declaration


```typescript
private function signin()
```
<small>*Defined in [connect-button.ts:31](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/connect-button.ts#L31)*</small>










---



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
private var body: HTMLElement
```
<small>*Defined in [dialog.ts:6](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L6)*</small>


<a id="_dialog_.dialog.closebutton"></a>

#### closeButton
```javascript
private var closeButton: HTMLElement
```
<small>*Defined in [dialog.ts:8](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L8)*</small>


<a id="_dialog_.dialog.container"></a>

#### container
```javascript
private var container: HTMLElement
```
<small>*Defined in [dialog.ts:5](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L5)*</small>


<a id="_dialog_.dialog.content"></a>

#### content
```javascript
private var content: any
```
<small>*Defined in [dialog.ts:4](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L4)*</small>


<a id="_dialog_.dialog.dialog-1"></a>

#### dialog
```javascript
private var dialog: HTMLElement
```
<small>*Defined in [dialog.ts:7](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L7)*</small>




---

### Methods
<a id="_dialog_.dialog.create"></a>

#### create




##### Declaration


```typescript
private function create(): HTMLElement
```
<small>*Defined in [dialog.ts:31](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L31)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.createbody"></a>

#### createBody




##### Declaration


```typescript
private function createBody(): HTMLElement
```
<small>*Defined in [dialog.ts:98](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L98)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.createclosebutton"></a>

#### createCloseButton




##### Declaration


```typescript
private function createCloseButton(): HTMLElement
```
<small>*Defined in [dialog.ts:47](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L47)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.createcontainer"></a>

#### createContainer




##### Declaration


```typescript
private function createContainer(): HTMLElement
```
<small>*Defined in [dialog.ts:83](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L83)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.createdialog"></a>

#### createDialog




##### Declaration


```typescript
private function createDialog(): HTMLElement
```
<small>*Defined in [dialog.ts:69](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L69)*</small>



##### Return Value
`HTMLElement`







<a id="_dialog_.dialog.dismiss"></a>

#### dismiss




##### Declaration


```typescript
function dismiss()
```
<small>*Defined in [dialog.ts:27](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L27)*</small>








<a id="_dialog_.dialog.render"></a>

#### render




##### Declaration


```typescript
private function render(): HTMLElement
```
<small>*Defined in [dialog.ts:111](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/dialog.ts#L111)*</small>



##### Return Value
`HTMLElement`









---



---



---

<a id="_login_button_"></a>


<a id="_login_button_.loginbutton"></a>

##  LoginButton


Deprecated, use ConnectButton



<a id="_login_button_.loginbutton.constructor"></a>
### constructor
```typescript
new LoginButton(clientId: string, networkName?: string): LoginButton
```
##### Parameters

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| clientId | `string`  | - |   - |
| networkName | `string`  | &quot;kovan&quot; |   - |



##### Return Value
[LoginButton](#_login_button_.loginbutton)





---

### Properties
<a id="_login_button_.loginbutton.callback"></a>

#### callback
```javascript
var callback: function
```
<small>*Defined in [login-button.ts:11](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/login-button.ts#L11)*</small>

##### Type declaration
function (web3: Web3, error?: Error, user?: User)
##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| web3 | `Web3`   |  - |
| error _(Optional)_ | `Error`   |  - |
| user _(Optional)_ | `User`   |  - |







<a id="_login_button_.loginbutton.element"></a>

#### element
```javascript
var element: HTMLButtonElement
```
<small>*Defined in [login-button.ts:10](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/login-button.ts#L10)*</small>


<a id="_login_button_.loginbutton.provider"></a>

#### provider
```javascript
private var provider: BitskiProvider
```
<small>*Defined in [login-button.ts:12](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/login-button.ts#L12)*</small>


<a id="_login_button_.loginbutton.web3client"></a>

#### web3Client
```javascript
private var web3Client: Web3
```
<small>*Defined in [login-button.ts:13](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/login-button.ts#L13)*</small>




---

### Methods
<a id="_login_button_.loginbutton.setdefaultstyle"></a>

#### setDefaultStyle




##### Declaration


```typescript
private function setDefaultStyle()
```
<small>*Defined in [login-button.ts:44](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/login-button.ts#L44)*</small>








<a id="_login_button_.loginbutton.signin"></a>

#### signin




##### Declaration


```typescript
private function signin()
```
<small>*Defined in [login-button.ts:32](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/login-button.ts#L32)*</small>










---



---



---

<a id="_oauth_http_provider_"></a>


<a id="_oauth_http_provider_.__global"></a>

####  __global


Force window.web3 We can delete this one we have defaultAccount set up better






<a id="_oauth_http_provider_.__global.window"></a>

####  Window





### Properties
<a id="_oauth_http_provider_.__global.window.web3"></a>

#### web3
```javascript
var web3: Web3
```
<small>*Defined in [oauth-http-provider.ts:22](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L22)*</small>







<a id="_oauth_http_provider_.oauthproviderintegrationtype"></a>

####  OAuthProviderIntegrationType





<a id="_oauth_http_provider_.oauthproviderintegrationtype.iframe"></a>

####  IFRAME


```javascript
var IFRAME: 
```
<small>*Defined in [oauth-http-provider.ts:10](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L10)*</small>





<a id="_oauth_http_provider_.oauthproviderintegrationtype.popup"></a>

####  POPUP


```javascript
var POPUP: 
```
<small>*Defined in [oauth-http-provider.ts:12](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L12)*</small>





<a id="_oauth_http_provider_.oauthproviderintegrationtype.redirect"></a>

####  REDIRECT


```javascript
var REDIRECT: 
```
<small>*Defined in [oauth-http-provider.ts:11](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L11)*</small>





<a id="_oauth_http_provider_.oauthproviderintegrationtype.silent"></a>

####  SILENT


```javascript
var SILENT: 
```
<small>*Defined in [oauth-http-provider.ts:13](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L13)*</small>








<a id="_oauth_http_provider_.oauthhttpprovider"></a>

##  OAuthHttpProvider


A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls



<a id="_oauth_http_provider_.oauthhttpprovider.constructor"></a>
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
[OAuthHttpProvider](#_oauth_http_provider_.oauthhttpprovider)





---

### Properties

<a id="_oauth_http_provider_.oauthhttpprovider.authenticationdialog"></a>

#### authenticationDialog

The configured authentication dialog


```javascript
private var authenticationDialog: Dialog
```
<small>*Defined in [oauth-http-provider.ts:54](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L54)*</small>


<a id="_oauth_http_provider_.oauthhttpprovider.authenticationintegrationtype"></a>

#### authenticationIntegrationType

Determines how the authentication modals show up.


```javascript
var authenticationIntegrationType: OAuthProviderIntegrationType =  OAuthProviderIntegrationType.REDIRECT
```
<small>*Defined in [oauth-http-provider.ts:44](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L44)*</small>



<a id="_oauth_http_provider_.oauthhttpprovider.currentsigninpromise"></a>

#### currentSignInPromise

Cached sign in promise.


```javascript
private var currentSignInPromise: Promise<User> =  null
```
<small>*Defined in [oauth-http-provider.ts:65](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L65)*</small>


<a id="_oauth_http_provider_.oauthhttpprovider.currentuser"></a>

#### currentUser

The current logged in `User`


```javascript
var currentUser: User =  null
```
<small>*Defined in [oauth-http-provider.ts:39](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L39)*</small>


<a id="_oauth_http_provider_.oauthhttpprovider.host"></a>

#### host

The JSON-RPC endpoint


```javascript
private var host: string
```
<small>*Defined in [oauth-http-provider.ts:49](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L49)*</small>




<a id="_oauth_http_provider_.oauthhttpprovider.settings"></a>

#### settings

Object containing the OAuth settings. see [BitskiProviderSettings](#class-bitskiprovidersettings) Cached sign in promise.


```javascript
private var settings: UserManagerSettings
```
<small>*Defined in [oauth-http-provider.ts:60](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L60)*</small>


<a id="_oauth_http_provider_.oauthhttpprovider.usermanager"></a>

#### userManager

Instance user manager object.


```javascript
var userManager: UserManager
```
<small>*Defined in [oauth-http-provider.ts:34](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L34)*</small>




---

### Methods
<a id="_oauth_http_provider_.oauthhttpprovider._preparerequest"></a>

#### _prepareRequest



Prepares a new XMLHttpRequest with the proper headers




##### Declaration


```typescript
private function _prepareRequest(): XMLHttpRequest
```
<small>*Defined in [oauth-http-provider.ts:179](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L179)*</small>



##### Return Value
`XMLHttpRequest`


Request object that is ready for a payload.






<a id="_oauth_http_provider_.oauthhttpprovider.didsignin"></a>

#### didSignIn




##### Declaration


```typescript
function didSignIn(user: User)
```
<small>*Defined in [oauth-http-provider.ts:155](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L155)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| user | `User`   |  - |









<a id="_oauth_http_provider_.oauthhttpprovider.receivemessage"></a>

#### receiveMessage




##### Declaration


```typescript
function receiveMessage(event: MessageEvent)
```
<small>*Defined in [oauth-http-provider.ts:82](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L82)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `MessageEvent`   |  - |












<a id="_oauth_http_provider_.oauthhttpprovider.sendasync"></a>

#### sendAsync



Send a web3 / JSON-RPC request asynchronously.




##### Declaration


```typescript
private function sendAsync(payload: JsonRPCRequest, callback: function)
```
<small>*Defined in [oauth-http-provider.ts:194](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L194)*</small>



##### Parameters

| Param | Type | Description |
| ------ | ------ | ------ |
| payload | `JsonRPCRequest`   |  The JSON-RPC request object to send |
| callback | `function`   |  Handler function invoked when the request has completed. |








<a id="_oauth_http_provider_.oauthhttpprovider.signin"></a>

#### signIn



Sign in using the current settings.




##### Declaration


```typescript
function signIn(): Promise<User>
```
<small>*Defined in [oauth-http-provider.ts:95](https://github.com/BitskiCo/bitski-js-sdk/blob/master/src/oauth-http-provider.ts#L95)*</small>



##### Return Value
`Promise<User>`


A promise for a user.








---


### Relationships
##### Extends
* HttpProvider

---





