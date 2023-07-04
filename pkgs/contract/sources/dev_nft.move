
/**
 * Simple NFT Contract
 */
module nft::dev_nft {
    use sui::url::{Self, Url};
    use std::string;
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// A NFT that can be minted by anybody
    struct DevNFT has key, store {
        id: UID,
        /// Name for the token
        name: string::String,
        /// Description of the token
        description: string::String,
        /// URL for the token
        url: Url,
    }

    /// Mint Event 
    struct MintNFTEvent has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: string::String,
    }

    /// Transfer Evnet
    struct TransfertNFTEvent has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // from address
        from: address,
        // to address
        to: address,
    }

    /// Create a new dev_nft
    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        // create DevNFT Object
        let nft = DevNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url)
        };
        // get sender info
        let sender = tx_context::sender(ctx);
        // emit event
        event::emit(MintNFTEvent {
            object_id: object::uid_to_inner(&nft.id),
            creator: sender,
            name: nft.name,
        });
        // transfer nft to sender
        transfer::public_transfer(nft, sender);
    }

    /// transfer method
    public entry fun transfer(
        nft: DevNFT, 
        recipient: address, 
        _: &mut TxContext
    ) {
        // transfer NFT Object
        transfer::public_transfer(nft, recipient)
    }

    /// Update the `description` of `nft` to `new_description`
    public entry fun update_description(
        nft: &mut DevNFT,
        new_description: vector<u8>,
    ) {
        nft.description = string::utf8(new_description)
    }

    /// Permanently delete `nft`
    public entry fun burn(nft: DevNFT) {
        let DevNFT { id, name: _, description: _, url: _ } = nft;
        // delete NFT
        object::delete(id)
    }

    /// Get the NFT's `name`
    public fun name(nft: &DevNFT): &string::String {
        &nft.name
    }

    /// Get the NFT's `description`
    public fun description(nft: &DevNFT): &string::String {
        &nft.description
    }

    /// Get the NFT's `url`
    public fun url(nft: &DevNFT): &Url {
        &nft.url
    }
}

#[test_only]
module nft::dev_nftTests {
    use nft::dev_nft::{Self, DevNFT};
    use sui::test_scenario as ts;
    use sui::transfer;
    use std::string;

    #[test]
    fun mint_transfer_update() {
        let addr1 = @0xA;
        let addr2 = @0xB;
        // create the NFT
        let scenario = ts::begin(addr1);

        {
            dev_nft::mint(
              b"test", 
              b"a test", 
              b"https://www.sui.io", 
              ts::ctx(&mut scenario)
            )
        };
        // send it from A to B
        ts::next_tx(&mut scenario, addr1);
        
        {
            let nft = ts::take_from_sender<DevNFT>(&mut scenario);
            transfer::public_transfer(nft, addr2);
        };
        // update its description
        ts::next_tx(&mut scenario, addr2);
        {
            let nft = ts::take_from_sender<DevNFT>(&mut scenario);
            dev_nft::update_description(&mut nft, b"a new description") ;
            assert!(*string::bytes(dev_nft::description(&nft)) == b"a new description", 0);
            ts::return_to_sender(&mut scenario, nft);
        };
        // burn it
        ts::next_tx(&mut scenario, addr2);
        {
            let nft = ts::take_from_sender<DevNFT>(&mut scenario);
            dev_nft::burn(nft)
        };
        ts::end(scenario);
    }
}