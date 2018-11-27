import { Bitski } from 'bitski';
import Web3 from 'web3';

console.log("Setting up bitski...");

var bitski = new Bitski('3b6d0360-071c-4210-8862-176164d6ec76', 'http://localhost:8080/callback/callback.html');
var provider = bitski.getProvider();

window.bitski = bitski;
window.web3 = new Web3(provider);

window.web3.eth.getBlockNumber().then(number => console.log(number));
