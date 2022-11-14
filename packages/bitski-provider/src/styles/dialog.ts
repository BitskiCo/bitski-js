/* tslint:disable */

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
#bitski-dialog-container.bitski-visible {
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
#bitski-dialog-container.bitski-visible .bitski-dialog {
  opacity: 1;
  transform: none;
  transition: opacity 300ms linear, transform 600ms cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: auto;
}
.bitski-dialog .bitski-close-button {
  background: transparent url('https://cdn.bitskistatic.com/sdk/close.svg') no-repeat 50% 50%;
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
.bitski-dialog-body.bitski-loading::after {
  content: "";
  background: url('https://cdn.bitskistatic.com/sdk/loading.svg') no-repeat 50% 50%;
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
    width: 400px;
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
