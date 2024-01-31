---
'@bitski/waas-react-sdk': patch
---

This change wraps BitskiAuth in a Dialog component when `collapsed` is provided as a prop. By default, if no `connect` prop is provided, BitskiWidget will use `<BitskiConnect displayText="Login" />` as the dialog
trigger. If a `connect` prop is provided, the component passed to the `connect` prop will replace the dialog trigger.
Alternatively, users can extend `<BitskiConnect />` by passing children components into it to utilize the default interactivity of showing the account address on connection.

Summary:

- Add `connect` prop to control widget's login/connect button
- Wraps BitskiAuth in an animated dialog on entry and exit
