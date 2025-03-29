export 
const chain_list = [
 {
   'id': 'eth',
   'name': 'Ethereum',
   'community_id': 1,
   'rpc_url': 'https://rpc.ankr.com/eth',
   'Uniswap': {
	 "SwapRouter": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
	 "SwapRouter02	": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
	 "Permit2": "0x000000000022d473030f116ddee9f6b43ac78ba3",
	 "UniversalRouter": "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
   },
   "Pancakeswap": {
	 "pancakeSwapRouter": "0xEfF92A263d31888d860bD50809A8D171709b7b1c",
   },
   "Sushiswap": {
	 "sushiSwapRouter": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
   }
},
{
   'id': 'pze',
   'name': 'Polygon zkEVM',
   'community_id': 1101,
   'rpc_url': 'https://1rpc.io/polygon/zkevm'
},
{
   'id': 'mobm',
   'name': 'Moonbeam',
   'community_id': 1284,
   'rpc_url': 'https://rpc.ankr.com/moonbeam'
},
{
   'id': 'fuse',
   'name': 'Fuse',
   'community_id': 122,
   'rpc_url': 'https://rpc.fuse.io'
},
 {
   'id': 'matic',
   'name': 'Polygon',
   'community_id': 137,
   'rpc_url': 'https://rpc-mainnet.maticvigil.com',
   'Uniswap': {
	 "SwapRouter": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
	 "SwapRouter02	": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
	 "Permit2": "0x000000000022d473030f116ddee9f6b43ac78ba3",
	 "UniversalRouter": "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
   }
}, {
   'id': 'op',
   'name': 'Optimism',
   'community_id': 10,
   'rpc_url': 'https://rpc.ankr.com/optimism',
}, {
   'id': 'bsc',
   'name': 'BNB Chain',
   'community_id': 56,
   'rpc_url': 'https://bsc-dataseed.binance.org',
   'Uniswap': {
	 "SwapRouter02	": "0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2",
	 "Permit2": "0x000000000022d473030f116ddee9f6b43ac78ba3",
	 "UniversalRouter": "0x5302086A3a25d473aAbBd0356eFf8Dd811a4d89B",
   },
   "Pancakeswap": {
	 "SwaprouterV3": "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4",
	 "SwaprouterV2": "0xca143ce32fe78f1f7019d7d551a6402fc5350c73",
   },
   "Sushiswap": {
	 "sushiSwapRouter": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
   }
}, {
   'id': 'celo',
   'name': 'Celo',
   'community_id': 42220,
   'rpc_url': 'https://rpc.ankr.com/celo',
}, {
   'id': 'ftm',
   'name': 'Fantom',
   'community_id': 250,
   'rpc_url': 'https://1rpc.io/ftm	pc'
}, {
   'id': 'pls',
   'name': 'Pulse',
   'community_id': 369,
   'rpc_url': 'https://rpc.pulsechain.com'
}, {
   'id': 'klay',
   'name': 'Klaytn',
   'community_id': 8217,
   'rpc_url': 'https://public-en-cypress.klaytn.net'
}, 
{
   'id': 'aurora',
   'name': 'Aurora',
   'community_id': 1313161554,
   'rpc_url': 'https://aurora.drpc.org'
}, {
   'id': 'avax',
   'name': 'Avalanche',
   'community_id': 43114,
   'rpc_url': 'https://1rpc.io/avax/c'
}, {
   'id': 'era',
   'name': 'zkSync Era',
   'community_id': 324,
   'rpc_url': 'https://mainnet.era.zksync.io'
}, {
   'id': 'base',
   'name': 'Base',
   'community_id': 8453,
   'rpc_url': 'https://base.publicnode.com',
   'Uniswap': {
	 "SwapRouter02	": "0x2626664c2603336E57B271c5C0b26F421741e481",
	 "Permit2": "0x000000000022D473030F116dDEE9F6B43aC78BA3",
	 "UniversalRouter": "0x3fC91A3a0x198EF79F1F515F02dFE9e3115eD9fC07183f02fCfd70395Cd496C647d5a6CC9D4B2b7FAD",
   }
}, {
   'id': 'cro',
   'name': 'Cronos',
   'community_id': 25,
   'rpc_url': 'https://evm.cronos.org'
}, {
   'id': 'xdai',
   'name': 'Gnosis Chain',
   'community_id': 100,
   'rpc_url': 'https://gnosis.drpc.org'
}, {
   'id': 'movr',
   'name': 'Moonriver',
   'community_id': 1285,
   'rpc_url': 'https://moonriver.publicnode.com'
},  {
   'id': 'arb',
   'name': 'Arbitrum',
   'community_id': 42161,
   'rpc_url': 'https://rpc.ankr.com/arbitrum',
   'Uniswap': {
	 "SwapRouter": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
	 "SwapRouter02	": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
	 "Permit2": "0x000000000022d473030f116ddee9f6b43ac78ba3",
	 "UniversalRouter": "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
   }
}
];