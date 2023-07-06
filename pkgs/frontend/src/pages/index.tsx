import { TransactionBlock } from "@mysten/sui.js";
import {
  ConnectButton, useWallet
} from '@suiet/wallet-kit';
import { useEffect, useState } from 'react';
import NftCard from 'src/components/NftCard';
import { SuiObjectLinkButton } from 'src/components/SuiObjectLinkButton';
import LoadingIndicator from 'src/components/common/LoadingIndicator';
import { NFT_PACKAGE_ID } from 'src/config/constants';
import { getAssets } from 'src/suitterLib/client';
import { NFTType } from 'src/suitterLib/types';
import { moveCallMintNft } from "./../suitterLib/moveCall";

/**
 * Pageコンポーネント
 * @returns 
 */
const Page = () => {
  const [nfts, setNfts] = useState<NFTType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { 
    address,
    signAndExecuteTransactionBlock
  } = useWallet();

  /**
   * NFTを取得するためのメソッド
   */
  const getNfts = async () => {
    getAssets(address!, setNfts);
  }

  /**
   * NFTをミントするメソッド
   */
  const mint = async() => {
    setIsLoading(true);
    // トランザクションオブジェクトを生成
    const tx = new TransactionBlock();
    // moveCallTransferNft
    moveCallMintNft({
      tx, 
      name: "some name",
      description: "some description",
      url: "https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop"
    });

    try {
      // トランザクションに署名＆送信
      await signAndExecuteTransactionBlock({ 
        transactionBlock: tx 
      });
      
      alert("Mint Success!!");
      setIsLoading(false);
    } catch(err) {
      console.log("err:", err);
      alert("Mint fail...");
      setIsLoading(false);
    }
  }

  /**
   * 左列用のコンポーネント
   * @returns 
   */
  const LeftPart = () => (
    <div className="w-1/4 p-4 text-white">
      <div className="font-bold text-lg mb-4">
        <ConnectButton>
          Connect Wallet
        </ConnectButton>
      </div>
      <div className="font-bold text-lg mb-4">Sui NFT Dapp</div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          USER
          <SuiObjectLinkButton id={address!} />
        </span>
      </div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          PACKAGE_ID
          <SuiObjectLinkButton id={NFT_PACKAGE_ID} />
        </span>
      </div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          <button
            className="py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={mint}
          >
            mint NFT
          </button>
        </span>
      </div>
      <button
        onClick={getNfts}
      >
        get nfts
      </button>
    </div>
  )
  
  /**
   * 中央列用のコンポーネント
   * @returns 
   */
  const CenterPart = () => {
    return(
      <div className="w-3/4 p-4 border-slate-600 border-x-[0.5px] flex flex-col h-screen">
        <div className="font-bold text-lg mb-4 text-white">NFTs</div>
        <div className="overflow-auto flex-grow gap-1">
          {
            nfts.map((nft, index) => (
              <>
                <NftCard
                  key={index}
                  id={nft.data.objectId}
                  name={nft.data.content.fields.name}
                  description={nft.data.content.fields.description}
                  url={nft.data.content.fields.url}
                  setIsLoading={setIsLoading}
                  signAndExecuteTransactionBlock={signAndExecuteTransactionBlock}
                />
              </>
            ))
          }
        </div>
      </div>
    )
  }

  useEffect(() => {
    getNfts();
  },[])

  return (
    <main className="flex min-h-screen bg-slate-900">
      <>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen w-screen">
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <LeftPart />
            <CenterPart />
          </>
        )}
      </>
    </main >
  )
}

export default Page;
