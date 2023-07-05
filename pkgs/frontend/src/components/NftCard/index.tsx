import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit } from "@mysten/wallet-kit";
import { useState } from 'react';
import { moveCallTransferNft } from "./../../suitterLib/moveCall";
import "./NftCard.css";

/**
 * NFTCard コンポーネント
 * @param id NFTのオブジェクトID
 */
const NftCard = (props: { 
  id: string,
  name: string,
  description: string,
  url: string ,
  setIsLoading: any
}) => {
  const [toAddress, setToAddress] = useState<string>("");
  
  const {  
    signAndExecuteTransactionBlock 
  } = useWalletKit();

  /**
   * NFTをTransferするメソッド
   */
   const handleTransfer = async () => {
    props.setIsLoading(true);
    // トランザクションオブジェクトを生成
    const tx = new TransactionBlock();
    // moveCallTransferNft
    moveCallTransferNft({
      tx, 
      id: props.id, 
      toAddress
    });

    try {
      // トランザクションに署名＆送信
      await signAndExecuteTransactionBlock({ 
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
    <div className="nft-card">
      <img src={props.url} alt={props.name} height="200px" />
      <h3>{props.name}</h3>
      <p>{props.description}</p>
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
        Transfer NFT
      </button>
    </div>
  );
};

export default NftCard;