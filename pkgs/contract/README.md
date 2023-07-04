# NFT コントラクト

## 動かし方

- コントラクトのビルド

  ```bash
  sui move build
  ```

- コントラクトのテスト

  ```bash
  sui move test
  ```

- コントラクトのデプロイ

  ```bash
  sui client publish --gas-budget 100000000 --skip-dependency-verification
  ```

  実行結果

  ```bash
  ----- Transaction Digest ----
  ABZ45dyxTA75bKzERmEYqgnGEToUybqiYhZo6H2tK6xv
  ----- Transaction Data ----
  Transaction Signature: [Signature(Ed25519SuiSignature(Ed25519SuiSignature([0, 210, 21, 212, 221, 119, 28, 241, 195, 192, 177, 222, 172, 125, 5, 156, 76, 242, 247, 58, 95, 100, 7, 23, 72, 196, 175, 48, 69, 246, 45, 251, 226, 52, 219, 201, 87, 234, 32, 82, 143, 240, 149, 39, 65, 104, 236, 90, 152, 193, 213, 201, 205, 211, 194, 71, 84, 46, 76, 162, 2, 217, 229, 254, 10, 19, 58, 137, 24, 202, 202, 254, 19, 82, 34, 113, 42, 133, 155, 80, 206, 244, 231, 141, 180, 102, 82, 137, 126, 137, 230, 188, 142, 240, 144, 200, 129])))]
  Transaction Kind : Programmable
  Inputs: [Pure(SuiPureValue { value_type: Some(Address), value: "0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02" })]
  Commands: [
    Publish(<modules>,0x0000000000000000000000000000000000000000000000000000000000000001,0x0000000000000000000000000000000000000000000000000000000000000002),
    TransferObjects([Result(0)],Input(0)),
  ]

  Sender: 0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02
  Gas Payment: Object ID: 0x1515d5d5176fd35e923450163770abf44a7bd979ba59cce2779d1d0d04b75329, version: 0x42624e, digest: Aat6yh6qmhY6FzPsv6Wq37U21q5xCuvBxTSMbZ1EPHhy
  Gas Owner: 0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02
  Gas Price: 1000
  Gas Budget: 100000000

  ----- Transaction Effects ----
  Status : Success
  Created Objects:
    - ID: 0x414c39a799b14ef1a4dc400bb98846eca7a42bb77f2a59fc503516a198e9f30f , Owner: Account Address ( 0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02 )
    - ID: 0xc67af7a8c787d95c0d4ce650cbd46022cdb6b917faa0ee1020b2fb4719c95858 , Owner: Immutable
  Mutated Objects:
    - ID: 0x1515d5d5176fd35e923450163770abf44a7bd979ba59cce2779d1d0d04b75329 , Owner: Account Address ( 0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02 )

  ----- Events ----
  Array []
  ----- Object changes ----
  Array [
      Object {
          "type": String("mutated"),
          "sender": String("0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02"),
          "owner": Object {
              "AddressOwner": String("0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02"),
          },
          "objectType": String("0x2::coin::Coin<0x2::sui::SUI>"),
          "objectId": String("0x1515d5d5176fd35e923450163770abf44a7bd979ba59cce2779d1d0d04b75329"),
          "version": String("4350543"),
          "previousVersion": String("4350542"),
          "digest": String("9fEN9Sy32nqP9x89m4TYNuVKoX3HsMe1rNDRwM1rse9s"),
      },
      Object {
          "type": String("created"),
          "sender": String("0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02"),
          "owner": Object {
              "AddressOwner": String("0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02"),
          },
          "objectType": String("0x2::package::UpgradeCap"),
          "objectId": String("0x414c39a799b14ef1a4dc400bb98846eca7a42bb77f2a59fc503516a198e9f30f"),
          "version": String("4350543"),
          "digest": String("5PTavakaeJn4LtLkZftJfgETyUQNsqUUncvHw9fMgDbr"),
      },
      Object {
          "type": String("published"),
          "packageId": String("0xc67af7a8c787d95c0d4ce650cbd46022cdb6b917faa0ee1020b2fb4719c95858"),
          "version": String("1"),
          "digest": String("GbR6kc6nKpc9LVJGKXAd6Qu8EQxSsdj7KZCCcU9eKaUJ"),
          "modules": Array [
              String("dev_nft"),
          ],
      },
  ]
  ----- Balance changes ----
  Array [
      Object {
          "owner": Object {
              "AddressOwner": String("0x6c1aa061d0495b71eefd97e7d0a1cef0092f5c64d1b751decdc7b5ad0d039c02"),
          },
          "coinType": String("0x2::sui::SUI"),
          "amount": String("-11718280"),
      },
  ]
  ```

  エクスプローラー上のデータ

  - パッケージ ID
    [0xc67af7a8c787d95c0d4ce650cbd46022cdb6b917faa0ee1020b2fb4719c95858](https://suiscan.com/object/0xc67af7a8c787d95c0d4ce650cbd46022cdb6b917faa0ee1020b2fb4719c95858?network=testnet)

  - オブジェクト ID
    [0x414c39a799b14ef1a4dc400bb98846eca7a42bb77f2a59fc503516a198e9f30f](https://suiscan.com/object/0x414c39a799b14ef1a4dc400bb98846eca7a42bb77f2a59fc503516a198e9f30f?network=testnet)
