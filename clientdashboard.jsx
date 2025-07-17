import { useState } from "react";
import { ethers } from "ethers";

export default function ClientDashboard({ contract }) {
  const [metadataURI, setMetadataURI] = useState("");
  const [submissionURI, setSubmissionURI] = useState("");
  const [projectId, setProjectId] = useState("");

  const createProject = async () => {
    const dev = prompt("Enter developer address:");
    const tx = await contract.createProjectRequest(dev, metadataURI, { value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Project Created");
  };

  const verifyWork = async () => {
    const tx = await contract.verifyWork(projectId);
    await tx.wait();
    alert("Work Verified & Payment Sent!");
  };

  return (
    <div>
      <h3>Client Dashboard</h3>

      <input placeholder="Metadata URI" onChange={(e) => setMetadataURI(e.target.value)} />
      <button onClick={createProject}>Create Project</button>

      <br /><br />
      <input placeholder="Project ID" onChange={(e) => setProjectId(e.target.value)} />
      <button onClick={verifyWork}>Verify Work & Release Payment</button>
    </div>
  );
}

