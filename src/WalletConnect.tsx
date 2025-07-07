import React from "react";
import { ethers } from "ethers";

interface Props {
  onConnect: (address: string) => void;
}

const WalletConnect: React.FC<Props> = ({ onConnect }) => {
  const connectWallet = async () => {
    console.log("🔘 Connect Wallet button clicked");

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        alert("❗ MetaMask not found. Please install it.");
        return;
      }

      // Request account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts && accounts.length > 0) {
        console.log("✅ Connected account:", accounts[0]);
        onConnect(accounts[0]);
      } else {
        alert("❌ No accounts found. Please check MetaMask.");
      }
    } catch (err: any) {
      console.error("❌ Wallet connection error:", err);

      if (err.code === 4001) {
        alert("❌ Connection rejected by user.");
      } else {
        alert("❌ Failed to connect wallet. See console for details.");
      }
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

