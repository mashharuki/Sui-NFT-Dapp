import {
  Connection
} from "@mysten/sui.js";

export const SUI_PACKAGE = process.env.NEXT_PUBLIC_DAPP_PACKAGE!; // changed here.
export const SUI_MODULE = process.env.NEXT_PUBLIC_DAPP_MODULE!; // changed here.
export const NETWORK = process.env.NEXT_PUBLIC_SUI_NETWORK!;
export const MODULE_URL = `https://explorer.sui.io/object/${SUI_PACKAGE}?network=${NETWORK}`

// API RPC Endpoint(for devnet)
// export const RPC_API_URL = 'https://fullnode.devnet.sui.io:443'; 
// API RPC Endpoint(for mainnet)
// export const RPC_API_URL = 'https://fullnode.mainnet.sui.io:443'; 
// API RPC Endpoint(for testnet)
export const RPC_API_URL = 'https://fullnode.testnet.sui.io:443'; 

// NFTコントラクトのpackage ID
// const packageId = "0xd66a2ba7657f7c153020275b83e45a7fd1008bcdd9006a9fba838b13e577dc4b";
// const packageId = "0xb89b4498d96cdad53ca06376a2dee7b6161cc33bbb0ee564a10697d6be8065e6";
// export const NFT_PACKAGE_ID = "0xe189dc49a9504e7b473d38e40e5767fdd956da8b115996cd56a723e81131a054";

// testnet用のパッケージID
export const NFT_PACKAGE_ID = "0xc67af7a8c787d95c0d4ce650cbd46022cdb6b917faa0ee1020b2fb4719c95858";

export const CONNECTION = new Connection({
  fullnode: 'https://fullnode.testnet.sui.io',
  faucet: 'https://faucet.testnet.sui.io/gas',
});