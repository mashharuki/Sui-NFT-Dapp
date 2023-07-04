import ConnectWalletButton from './../ConnectWalletButton';


/**
 * Header コンポーネント
 * @returns 
 */
const Header = () => {

  return (
    <div className="header-container">
      <header>
        <div className="left">
          <p className="title">🐶 Sample Sui Dapp</p>
        </div>
        <div className="right">
          <ConnectWalletButton/>
        </div>
      </header>
    </div>
  );
};

export default Header;