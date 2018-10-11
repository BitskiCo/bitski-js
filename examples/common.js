import { Bitski } from 'bitski';
import Web3 from 'web3';


console.log("Setting up bitski...");
var bitski = new Bitski('demo-client-id');
var provider = bitski.getProvider('kovan')

window.bitski = bitski;
window.web3 = new Web3(provider);
