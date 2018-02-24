## Bitski.js

Current version: 0.0.1

Bitski JS SDK is a JavaScript library that connects your DApp with a user, a wallet, and a connection to the Ethereum blockchain (currently Kovan TestNet only).

You can easily get started by adding these two script tags to HEAD:

```html
<script src="https://rawgit.com/IdentityModel/oidc-client-js/dev/dist/oidc-client.js"></script>
<script src="https://rawgit.com/OutThereLabs/bitski-js-sdk/master/lib/bitski.js"></script>
```

Then, where you would normally initialize Web3, you can run the Bitski SDK instead of displaying metamask installation instructions:


```javascript
var settings = {
    authority: 'https://hydra.outtherelabs.com/',
    client_id: '<YOUR-CLIENT-ID>',
    redirect_uri: 'https://your-site.co/',
    post_logout_redirect_uri: 'https://your-site.co/',
    response_type: 'token id_token',
    scope: 'openid',

    popup_redirect_uri:'https://your-site.co/',
    popup_post_logout_redirect_uri:'https://your-site.co/',

    silent_redirect_uri:'https://your-site.co/',
    automaticSilentRenew:true,
    silentRequestTimeout:10000,

    filterProtocolClaims: true,
    loadUserInfo: true
};

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = bitski.InitializeWeb3(settings);
}
```

### More Info
* [Usage](usage.md)
* [Examples](examples.md)
* [API Reference](_api/index.md)
* [Contact Us](http://bitski.co)
