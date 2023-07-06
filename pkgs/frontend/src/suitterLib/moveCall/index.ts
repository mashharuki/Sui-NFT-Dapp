import { TransactionBlock } from '@mysten/sui.js';
import { NFT_PACKAGE_ID } from 'src/config/constants';


/**
 * NFTを発行するためのメソッド
 */
export const moveCallMintNft = async (props: {
  tx: TransactionBlock,
  name: string,
  description: string,
  url: string
}) => {
  const { tx } = props;
  // モジュール名と関数を指定
  const moduleName = "dev_nft";
  const methodName = "mint";

  // パッケージIDを指定する。
  tx.moveCall({
    target: `${NFT_PACKAGE_ID}::${moduleName}::${methodName}`,
    arguments: [
      tx.pure(props.name),
      tx.pure(props.description),
      tx.pure(props.url),
    ],
  });
};

/**
 * NFTを移転するためのメソッド
 */
export const moveCallTransferNft = async (props: {
  tx: TransactionBlock,
  id: string,
  toAddress: string
}) => {
  const { tx } = props;
  // モジュール名と関数を指定
  const moduleName = "dev_nft";
  const methodName = "transfer";

  console.log("tx:", props.id);
  console.log("toAddress:", props.toAddress);

  tx.moveCall({
    target: `${NFT_PACKAGE_ID}::${moduleName}::${methodName}`,
    arguments: [
      tx.object(props.id),
      tx.object(props.toAddress),
    ],
  });
};