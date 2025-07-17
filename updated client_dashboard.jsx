export function ClientDashboardPage() {
  const [section, setSection] = React.useState("freelancers");

  const renderContent = () => {
    if (section === "freelancers") {
      return (
        <>
          <div className='success-text' style={{ fontSize: '2rem', marginBottom: '24px' }}>Available Freelancers</div>
          <ul className='freelancer-list'>
            {["0xA1B2c3D4e5F678901234567890abcdef12345678", "0xB2C3d4E5f678901234567890abcdef1234567890", "0xC3D4e5F678901234567890abcdef1234567890ab", "0xD4E5f678901234567890abcdef1234567890abcd"].map(address => (
              <li key={address}>
                <a href={`project_request.html?address=${address}`}>{address}</a>
              </li>
            ))}
          </ul>
        </>
      );
    } else if (section === "sent") {
      return (
        <>
          <h2>Sent Requests</h2>
          <table className="dashboard-table">
            <thead>
              <tr><th>Title</th><th>Freelancer</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>Logo Design</td><td>0xA1B2...5678</td><td>Pending</td></tr>
              <tr><td>Website Build</td><td>0xB2C3...7890</td><td>Declined</td></tr>
              <tr><td>App UI</td><td>0xC3D4...90ab</td><td>Received</td></tr>
            </tbody>
          </table>
        </>
      );
    } else if (section === "received") {
      return (
        <>
          <h2>Projects Received</h2>
          {["Logo Design", "App UI"].map((title, idx) => (
            <div className="project-card" key={idx}>
              <div><b>Title:</b> {title}</div>
              <div><b>From:</b> 0x{idx === 0 ? 'A1B2...5678' : 'C3D4...90ab'}</div>
              <div><b>Work:</b> <a href="#" style={{ color: '#ffd600' }}>View File</a></div>
              <button className="approve-btn" onClick={() => window.location.href = 'project_approved.html'}>Approve</button>
              <button className="feedback-btn">Give Feedback</button>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src="logo.png" alt="DigiGig Logo" />
        </div>
        <div className="sidebar-option" onClick={() => setSection("freelancers")}>Available Freelancers</div>
        <div className="sidebar-option" onClick={() => setSection("sent")}>Sent Requests</div>
        <div className="sidebar-option" onClick={() => setSection("received")}>Projects Received</div>
      </div>
      <div className="main-content">
        <div className="digigig-glow-box">
          <img src="logo.png" alt="DigiGig Logo" className="digigig-logo" />
          <span className="digigig-title">DigiGig</span>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
