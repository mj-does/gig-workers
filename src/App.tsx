import React, { useState } from "react";
import WalletConnect from "./WalletConnect";
import "./styles.css";
import { motion } from "framer-motion";

function App() {
  const [userAddress, setUserAddress] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("❗ Please select a file first.");
      return;
    }

    setUploadStatus("🔄 Uploading to IPFS via Pinata...");
    setProgress(30);

    const apiKey = "8315d344557d0dbad55d";
    const secretApiKey =
      "d62e67b3a1c0a2714057dbb025f03452e71efd630596d098183d3d838ee9f32b";

    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          pinata_api_key: apiKey,
          pinata_secret_api_key: secretApiKey,
        },
      });

      setProgress(70);

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
      setUploadStatus(`✅ File uploaded! Access: ${ipfsUrl}`);
      setProgress(100);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("❌ Upload failed. Check your credentials.");
      setProgress(0);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">● LICERIA & CO.</div>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Upload</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </nav>
      </header>

      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-text">
          <h1>DigiGig: Proof-of-Work for Freelancers</h1>
          <p>
            Upload, verify, and showcase your freelance journey using blockchain
            technology.
          </p>
          <button className="btn" onClick={() => setStarted(true)}>
            Get Started
          </button>
        </div>
        <div className="hero-img">
          <img
            src="/digigig.png"
            alt="DigiGig Logo"
            style={{
              width: "300px",
              borderRadius: "20px",
              boxShadow: "0 0 20px rgba(255,255,0,0.3)",
            }}
          />
        </div>
      </motion.section>

      {started && (
        <motion.section
          className="start-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 style={{ textAlign: "center", color: "yellow" }}>
            🔗 Connect Your Wallet
          </h2>
          <p
            style={{
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
              color: "#ccc",
            }}
          >
            Connect your Web3 wallet to verify your identity and proceed with
            uploading proof of work.
          </p>
          <WalletConnect onConnect={setUserAddress} />
          {userAddress && (
            <motion.div
              className="wallet-confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ✅ Wallet connected:{" "}
              <span className="wallet-id">{userAddress}</span>
            </motion.div>
          )}
        </motion.section>
      )}

      {started && userAddress && (
        <motion.section
          className="upload"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h2>Upload Proof of Work</h2>
          <p>Accepted formats: PDF, PNG, JPG</p>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
          <button
            className="btn"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload to IPFS
          </button>
          {progress > 0 && (
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {uploadStatus && <p className="status">{uploadStatus}</p>}
        </motion.section>
      )}

      {/* Always visible - What is DigiGig */}
      <motion.section
        className="about boxed-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <h2>What is DigiGig?</h2>
        <div className="box">
          <p>
            DigiGig is a decentralized platform for freelancers to prove their
            work authenticity. Upload deliverables, store them on IPFS, and
            build a verified on-chain portfolio that’s yours forever — no
            central authority, no compromise.
          </p>
        </div>
      </motion.section>

      {/* Always visible - Key Features */}
      <motion.section
        className="features"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <h2>✨ Key Features</h2>
        <div className="feature-cards">
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>🔐 SoulBound NFTs</h3>
            <p>
              Immutable, non-transferable credentials proving your
              contributions.
            </p>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>🌐 IPFS Storage</h3>
            <p>Decentralized file uploads using secure gateways like Pinata.</p>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>🧾 Professional Identity</h3>
            <p>Establish a blockchain-based digital resume & reputation.</p>
          </motion.div>
        </div>
      </motion.section>

      <footer className="footer">
        &copy; 2025 DigiGig by Liceria & Co. | Empowering Freelancers on Web3.
      </footer>
    </div>
  );
}

export default App;
