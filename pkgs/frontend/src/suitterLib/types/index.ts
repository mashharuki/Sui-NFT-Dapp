
/// NFT型の定義
export type NFTType = {
  data: {
    objectId: string,
    content: {
      fields: {
        name: string,
        description: string,
        url: string,
      }
    }
  }
}
