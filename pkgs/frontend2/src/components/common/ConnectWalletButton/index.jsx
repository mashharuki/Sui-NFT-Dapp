import { ConnectButton, useWalletKit,  } from "@mysten/wallet-kit";
import { formatAddress } from '@mysten/sui.js';
import './../../../styles/App.css';

/**
 * connect Wallet button Component
 */
function ConnectWalletButton() {
    const { currentAccount, connect } = useWalletKit();
  
    return (
      <>
        {currentAccount !== null ? (
          <ConnectButton
            connectText={"Connect Wallet"}
            connectedText={`Connected: ${formatAddress(currentAccount.address)}`}
          />
        ) : (
          <div className="connect-wallet-container">
            <button 
              className="cta-button connect-wallet-button"
              onClick={() => connect("Sui Wallet")} 
            >
              Connect Wallet
            </button>
          </div>
        )}
      </>
    );
}

export default ConnectWalletButton;