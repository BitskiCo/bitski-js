---
'@bitski/waas-react-sdk': patch
---

- Added children, collapsed, and loginText props to BitskiWidget

<BitskiWidget collapsed>
- To show login button initially before showing the auth view

<BitskiWidget collapsed displayText="Connect">
- You can set displayText prop to customize the button's text

<BitskiWidget>
  <h1>Hello, world!</h1>
</BitskiWidget>
- Customize the connected state to display your own UI if desired. This can instead be a list of links for user settings or application settings. Or your own display of address and chains.
