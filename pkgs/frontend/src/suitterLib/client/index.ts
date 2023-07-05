/**
 * ====================================================================
 * Sui ブロックチェーンのRPC APIを直接叩くメソッドを実装するファイル
 * ====================================================================
 */

import {
  NFT_PACKAGE_ID,
  RPC_API_URL
} from "./../../config/constants";

/**
 * 接続中のウォレットアドレスに紐づく資産をすべて取得するためのメソッド
 * @param address 接続中のウォレットアドレス
 */
export const getAssets = (
  address: string,
  setNfts: any
) => {
  // Request data
  // Connect walletしているアドレスに紐づくすべての資産(オブジェクト)を取得する。
  const requestData = {
    jsonrpc: '2.0',
    id: 1,
    method: 'suix_getOwnedObjects',
    params: [
      address,
      {
        "filter": {
          "MatchAll": [
            {
              "StructType": `${NFT_PACKAGE_ID}::dev_nft::DevNFT`
            }
          ]
        },
        options: {
          showType: true,
          showOwner: true,
          showPreviousTransaction: true,
          showDisplay: false,
          showContent: true,
          showBcs: false,
          showStorageRebate: false,
        },
      },
    ],
  };

  // Fetch options
  const requestOptions = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(requestData), 
  };

  // Make the API request
  fetch(RPC_API_URL, requestOptions)
    .then(response => {
      // Check if the response was successful (status code in the range of 200-299)
      if (response.ok) {
        return response.json(); // Parse the response data as JSON
      } else {
        throw new Error(`Request failed with status code:${response.status}`);
      }
    })
    .then(responseData => {
      // Handle the response data
      console.log('Response:', responseData.result.data);
      setNfts(responseData.result.data);
      // Perform any necessary processing or display based on the response
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
      return null;
    });
};