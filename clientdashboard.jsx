import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ProjectEscrow from "./abis/ProjectEscrow.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export default function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [projectId, setProjectId] = useState("");
  const [project, setProject] = useState(null);
  const [role, setRole] = useState("");
  const [metadataURI, setMetadataURI] = useState("");
  const [submissionURI, setSubmissionURI] = useState("");

  useEffect(() => {
    const connect = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ProjectEscrow.abi, signer);
        setContract(contractInstance);
      }
    };
    connect();
  }, []);

  const fetchProject = async () => {
    const p = await contract.getProject(projectId);
    setProject(p);

    if (account.toLowerCase() === p.client.toLowerCase()) setRole("client");
    else if (account.toLowerCase() === p.developer.toLowerCase()) setRole("developer");
    else setRole("guest");
  };

  const createProject = async () => {
    const devAddress = prompt("Developer address?");
    const tx = await contract.createProjectRequest(devAddress, metadataURI, { value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Project Created");
  };

  const acceptProject = async () => {
    const tx = await contract.acceptProject(projectId);
    await tx.wait();
    fetchProject();
  };

  const submitWork = async () => {
    const tx = await contract.submitWork(projectId, submissionURI);
    await tx.wait();
    fetchProject();
  };

  const verifyWork = async () => {
    const tx = await contract.verifyWork(projectId);
    await tx.wait();
    fetchProject();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Connected: {account}</h2>

      <div>
        <h3>Create Project (Client)</h3>
        <input placeholder="Metadata URI" value={metadataURI} onChange={(e) => setMetadataURI(e.target.value)} />
        <button onClick={createProject}>Create Project</button>
      </div>

      <div>
        <h3>Fetch Project</h3>
        <input placeholder="Project ID" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
        <button onClick={fetchProject}>Load Project</button>
      </div>

      {role && (
        <div>
          <h3>Role: {role}</h3>
          <p>Current Status: {project && project.status.toString()}</p>

          {role === "developer" && project && project.status === 0 && (
            <button onClick={acceptProject}>Accept Project</button>
          )}

          {role === "developer" && project && project.status === 1 && (
            <>
              <input placeholder="Submission URI" value={submissionURI} onChange={(e) => setSubmissionURI(e.target.value)} />
              <button onClick={submitWork}>Submit Work</button>
            </>
          )}

          {role === "client" && project && project.status === 2 && (
            <button onClick={verifyWork}>Verify & Pay Developer</button>
          )}
        </div>
      )}
    </div>
  );
}
