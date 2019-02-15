/* tslint:disable */

const css = `
.bitski-connect-button {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 'Helvetica Neue', sans-serif;
  font-weight: bold;
  background-color: #298FFF;
  background-repeat: no-repeat;
  background-position-y: 50%;
  color: #fff;
  border: solid 1px #2288F5;
  border-bottom-color: #1A7CE6;
  margin: 0;
  padding: 0;
  cursor: pointer;
  text-shadow: 1px 0 1px rgba(0, 0, 0, 0.03);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05);
  transition: background 200ms linear, transform 200ms ease-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.bitski-connect-button:hover {
  background-color: #2288F5;
}
.bitski-connect-button:focus,
.bitski-connect-button:active {
  background-color: #1A7CE6;
  border-color: #1A7CE6;
  transform: scale(0.99, 0.99);
  color: rgba(255, 255, 255, 0.8);
}
.bitski-connect-button.size-small {
  background-image: url('https://cdn.bitskistatic.com/sdk/logo-sm.svg');
  background-position-x: 6px;
  border-radius: 4px;
  font-size: 10px;
  height: 22px;
  line-height: 19px;
  padding-left: 27px;
  padding-right: 11px;
}
.bitski-connect-button.size-medium {
  background-image: url('https://cdn.bitskistatic.com/sdk/logo-md.svg');
  background-position-x: 6px;
  border-radius: 6px;
  font-size: 12px;
  height: 28px;
  line-height: 26px;
  padding-left: 35px;
  padding-right: 14px;
}
.bitski-connect-button.size-large {
  background-image: url('https://cdn.bitskistatic.com/sdk/logo-lg.svg');
  background-position-x: 12px;
  border-radius: 8px;
  font-size: 15px;
  height: 40px;
  line-height: 39px;
  padding-left: 48px;
  padding-right: 18px;
}
`;

export default css;
