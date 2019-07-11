/* tslint:disable */

const css = `
.bitski-connect-button {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 'Helvetica Neue', sans-serif;
  font-weight: 500;
  background-color: #1C11D9;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  border: none;
  color: #fff;
  margin: 0;
  padding: 0;
  cursor: pointer;
  text-shadow: 1px 0 1px rgba(0, 0, 0, 0.03);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.14);
  transition: background 200ms linear, transform 200ms ease-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.bitski-connect-button:focus,
.bitski-connect-button:active {
  background-color: #2117C7;
  transform: scale(0.99, 0.99);
  color: rgba(255, 255, 255, 0.8);
}
.bitski-connect-button.size-small {
  background-image: url('https://cdn.bitskistatic.com/sdk/btn-v2-bg-sm.svg');
  border-radius: 3px;
  font-size: 10px;
  height: 22px;
  line-height: 19px;
  padding-left: 30px;
  padding-right: 8px;
}
.bitski-connect-button.size-medium {
  background-image: url('https://cdn.bitskistatic.com/sdk/btn-v2-bg-md.svg');
  border-radius: 4px;
  font-size: 11px;
  height: 30px;
  line-height: 29px;
  padding-left: 40px;
  padding-right: 12px;
}
.bitski-connect-button.size-large {
  background-image: url('https://cdn.bitskistatic.com/sdk/btn-v2-bg-lg.svg');
  border-radius: 5px;
  font-size: 14px;
  height: 44px;
  line-height: 44px;
  padding-left: 57px;
  padding-right: 15px;
}
`;

export default css;
