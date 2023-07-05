import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit, } from "@mysten/wallet-kit";
import React, { useState } from 'react';
import {
  NFT_PACKAGE_ID
} from "./../../utils/constants";
import "./NftCard.css";

/**
 * NFTCard コンポーネント
 * @param id NFTのオブジェクトID
 */
const NftCard = ({ 
  id,
  name,
  description,
  url,
  setIsLoading
}) => {
  const [toAddress, setToAddress] = useState(null);
  
  const {  
    signAndExecuteTransactionBlock 
  } = useWalletKit();

  /**
   * NFTをTransferするメソッド
   */
   const handleTransfer = async () => {
    setIsLoading(true);
    // トランザクションオブジェクトを生成
    const tx = new TransactionBlock();
    // パッケージIDを指定する。
    // 移転の際は、NFTのオブジェクトIDと送信先アドレスを指定する必要あり。
    tx.moveCall({
      target: `${NFT_PACKAGE_ID}::dev_nft::transfer`,
      arguments: [
        tx.object(id),
        tx.object(toAddress),
      ],
    });

    try {
      // トランザクションに署名＆送信
      await signAndExecuteTransactionBlock({ transactionBlock: tx });
      alert("Transfer Success!!");
      setIsLoading(false);
    } catch(err) {
      console.log("err:", err);
      alert("Transfer fail...");
      setIsLoading(false);
    }
  };

  return (
    <div className="nft-card">
      <img src={url} alt={name} height="200px" />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="form-container">
        <input
          type="text"
          value={toAddress}
          placeholder="enter address"
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
      <button 
        className="cta-button connect-wallet-button"
        onClick={handleTransfer} 
      >
        Let's Transfer NFT
      </button>
    </div>
  );
};

export default NftCard;