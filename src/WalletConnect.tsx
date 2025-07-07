import React from "react";
import { ethers } from "ethers";

interface Props {
  onConnect: (address: string) => void;
}

const WalletConnect: React.FC<Props> = ({ onConnect }) => {
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      onConnect(accounts[0]);
    } catch (err) {
      console.error("Connection Error:", err);
    }
  };

  return (
    <div className="wallet-connect">
      <button className="btn" onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  );
};

export default WalletConnect;
