import { configureChains, createConfig,InjectedConnector, getContract} from "@wagmi/core";
import { 
    mainnet,
    arbitrum, 
    polygon,
    polygonZkEvm,
    bsc,
    base,
    fantom,
    avalanche,
    cronos,
    pulsechain,
    moonbeam,
    moonriver,
    optimism,
    celo,
    klaytn,
    aurora,
    zkSync,
    gnosis,
    fuse,
   } from 'wagmi/chains'

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
if (typeof global === 'undefined') {
    window.global = window;
}

// 1. Define constants
const projectId = import.meta.env.VITE_PROJECT_ID;
if (!projectId) {
  throw new Error("You need to provide VITE_PROJECT_ID env variable");
}

const chains = [
  mainnet,
  arbitrum, 
  polygon,
  polygonZkEvm,
  bsc,
  base,
  fantom,
  avalanche,
  cronos,
  pulsechain,
  moonbeam,
  moonriver,
  optimism,
  celo,
  klaytn,
  aurora,
  zkSync,
  gnosis,
  fuse,


];

// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  publicClient,
});

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
    },
  },
  ethereumClient
);


export const injectedconnector = new InjectedConnector({
	chains: chains,
	options: {
    name: (detectedName) =>
      `Injected (${
        typeof detectedName === 'string'
          ? detectedName
          : detectedName.join(', ')
      })`,
	shimDisconnect: false,
  },
})

