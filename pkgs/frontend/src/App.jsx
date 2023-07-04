import { TransactionBlock } from "@mysten/sui.js";
import { useWalletKit, } from "@mysten/wallet-kit";
import React, { useEffect, useState } from 'react';
import NftCard from "./components/NftCard";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import LoadingIndicator from './components/common/LoadingIndicator';
import './styles/App.css';
import {
  NFT_PACKAGE_ID
} from "./utils/constants";
import {
  getAssets
} from "./utils/sui";

/**
 * App Component
 * @returns 
 */
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]); 

  const { 
    currentAccount, 
    signAndExecuteTransactionBlock 
  } = useWalletKit();

  /**
   * NFTをミントするMoveコントラクトの処理を呼び出すメソッド
   * @returns 
   */
  const handleClick = async () => {
    setIsLoading(true);
    // トランザクションオブジェクトを生成
    const tx = new TransactionBlock();
    // パッケージIDを指定する。
    tx.moveCall({
      target: `${NFT_PACKAGE_ID}::dev_nft::mint`,
      arguments: [
        tx.pure("some name"),
        tx.pure("some description"),
        tx.pure(
          "https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop"
        ),
      ],
    });

    try {
      // トランザクションに署名＆送信
      await signAndExecuteTransactionBlock({ transactionBlock: tx });
      alert("Mint Success!!")
      setIsLoading(false);
    } catch(err) {
      console.log("err:", err);
      alert("Mint fail...")
      setIsLoading(false);
    }
  };

  /**
   * NFTを一覧で出力するコンポーネント
   */
  const NFTs = () => {
    return(
      <div className="nft-gallery">
        {nfts !== undefined && (
          <>
            {nfts.map((nft, index) => (
              <NftCard
                key={index}
                id={nft.data.objectId}
                name={nft.data.content.fields.name}
                description={nft.data.content.fields.description}
                url={nft.data.content.fields.url}
                setIsLoading={setIsLoading}
              />
            ))}
          </>
        )}
      </div>
    )
  }

  /**
   * レンダリングする時に実行するメソッド
   */
  useEffect(() => {
    if(currentAccount) {
      const result = getAssets(currentAccount.address, setNfts);
      setNfts(result);
    };
  }, [currentAccount]);

  return (
    <div className="App">
      <div className="container">
				<Header />
        {isLoading ? (
          <div className="connect-wallet-container">
            <LoadingIndicator/>
          </div>
        ) : (
          <>
            <div className="connect-wallet-container">
              {currentAccount !== null ? (
                <>
                  <button 
                    className="cta-button mint-button"
                    onClick={handleClick} 
                  >
                    Let's Mint NFT
                  </button>
                </>
              ) : (
                <strong>Please Connect Wallet</strong>
              )}
            </div>
            <div>
              {currentAccount !== null && NFTs()}
            </div>
          </> 
        )}
        <Footer/>
      </div>
    </div>
  );
};

export default App;
