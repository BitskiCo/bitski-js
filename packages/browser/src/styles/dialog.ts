/* tslint:disable */

const closeSVG = 'PHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTcuODYzOTYxMDMsNS43NDI2NDA2OSBMMTEuMDQ1OTQxNSw4LjkyNDYyMTIgQzExLjYzMTcyOCw5LjUxMDQwNzY0IDExLjYzMTcyOCwxMC40NjAxNTUxIDExLjA0NTk0MTUsMTEuMDQ1OTQxNSBDMTAuNDYwMTU1MSwxMS42MzE3MjggOS41MTA0MDc2NCwxMS42MzE3MjggOC45MjQ2MjEyLDExLjA0NTk0MTUgTDUuNzQyNjQwNjksNy44NjM5NjEwMyBMMi41NjA2NjAxNywxMS4wNDU5NDE1IEMxLjk3NDg3MzczLDExLjYzMTcyOCAxLjAyNTEyNjI3LDExLjYzMTcyOCAwLjQzOTMzOTgyOCwxMS4wNDU5NDE1IEMtMC4xNDY0NDY2MDksMTAuNDYwMTU1MSAtMC4xNDY0NDY2MDksOS41MTA0MDc2NCAwLjQzOTMzOTgyOCw4LjkyNDYyMTIgTDMuNjIxMzIwMzQsNS43NDI2NDA2OSBMMC40MzkzMzk4MjgsMi41NjA2NjAxNyBDLTAuMTQ2NDQ2NjA5LDEuOTc0ODczNzMgLTAuMTQ2NDQ2NjA5LDEuMDI1MTI2MjcgMC40MzkzMzk4MjgsMC40MzkzMzk4MjggQzEuMDI1MTI2MjcsLTAuMTQ2NDQ2NjA5IDEuOTc0ODczNzMsLTAuMTQ2NDQ2NjA5IDIuNTYwNjYwMTcsMC40MzkzMzk4MjggTDUuNzQyNjQwNjksMy42MjEzMjAzNCBMOC45MjQ2MjEyLDAuNDM5MzM5ODI4IEM5LjUxMDQwNzY0LC0wLjE0NjQ0NjYwOSAxMC40NjAxNTUxLC0wLjE0NjQ0NjYwOSAxMS4wNDU5NDE1LDAuNDM5MzM5ODI4IEMxMS42MzE3MjgsMS4wMjUxMjYyNyAxMS42MzE3MjgsMS45NzQ4NzM3MyAxMS4wNDU5NDE1LDIuNTYwNjYwMTcgTDcuODYzOTYxMDMsNS43NDI2NDA2OSBaIiBmaWxsPSIjQ0NDRUQzIj48L3BhdGg+PC9zdmc+';
const loadingSVG = 'PHN2ZyBmaWxsPSIjMDAwIiB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iOC4wNDIlIiB5MT0iMCUiIHgyPSI2NS42ODIlIiB5Mj0iMjMuODY1JSIgaWQ9ImEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9IjAiIG9mZnNldD0iMCUiLz4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIuNjMxIiBvZmZzZXQ9IjYzLjE0NiUiLz4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzAwIiBvZmZzZXQ9IjEwMCUiLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIj4KICAgICAgICAgICAgPHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4IiBpZD0iT3ZhbC0yIiBzdHJva2U9InVybCgjYSkiIHN0cm9rZS13aWR0aD0iMiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';

const css = `
#bitski-dialog-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 1000;
  transition: background linear 0.2s;
  pointer-events: none;
}
#bitski-dialog-container.visible {
  background: rgba(0, 0, 0, 0.5);
  pointer-events: auto;
}
.bitski-dialog {
  opacity: 0;
  transform: translateY(100vh);
  transition: opacity 300ms linear, transform 400ms cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#bitski-dialog-container.visible .bitski-dialog {
  opacity: 1;
  transform: none;
  transition: opacity 300ms linear, transform 600ms cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: auto;
}
.bitski-dialog .close-button {
  background: transparent url('data:image/svg+xml;base64,${closeSVG}') no-repeat 50% 50%;
  position: absolute;
  right: 12px;
  top: 12px;
  border: none;
  outline: none;
  margin: 0;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  z-index: 100;
  overflow: hidden;
  text-indent: -1000px;
}
.bitski-dialog-body {
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  max-width: 100%;
}
.bitski-dialog-body.loading::after {
  content: "";
  background: url('data:image/svg+xml;base64,${loadingSVG}') no-repeat 50% 50%;
  animation: rotate 600ms linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0.3;
  width: 38px;
  height: 38px;
  margin-left: -19px;
  margin-top: -19px;
  z-index: -1;
}
@media (min-width: 600px) {
  #bitski-dialog-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bitski-dialog {
    position: relative;
    width: 490px;
    height: 420px;
  }
  .bitski-dialog-body {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.1), 0px 10px 50px rgba(0,0,0,0.4);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;
export default css;
