import { TransactionBlock } from "@mysten/sui.js";
import { useState } from 'react';
import { moveCallTransferNft } from "./../../suitterLib/moveCall";

/**
 * NFTCard コンポーネント
 * @param id NFTのオブジェクトID
 */
const NftCard = (props: { 
  id: string,
  name: string,
  description: string,
  url: string,
  setIsLoading: any,
  signAndExecuteTransactionBlock: any,
}) => {
  const [toAddress, setToAddress] = useState<string>("");

  // トランザクションオブジェクトを生成
  const tx = new TransactionBlock();
  
  /**
   * NFTをTransferするメソッド
   */
  const handleTransfer = async () => {
    props.setIsLoading(true);
    // moveCallTransferNft
    moveCallTransferNft({
      tx, 
      id: props.id, 
      toAddress
    });

    try {
      // トランザクションに署名＆送信
      await props.signAndExecuteTransactionBlock({ 
        transactionBlock: tx 
      });
      
      alert("Transfer Success!!");
      props.setIsLoading(false);
    } catch(err) {
      console.log("err:", err);
      alert("Transfer fail...");
      props.setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <img src={props.url} alt={props.name} height="200px" />
      <h3 className="font-bold text-lg mb-4 text-white">{props.name}</h3>
      <p className="font-bold text-lg mb-4 text-white">{props.description}</p>
      <div className="form-container">
        <input
          type="text"
          value={toAddress}
          placeholder="enter address"
          className="flex-1 appearance-none border border-gray-300 mb-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
      <button 
        className="py-2 px-4 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
        onClick={handleTransfer} 
      >
        Transfer NFT
      </button>
    </div>
  );
};

export default NftCard;