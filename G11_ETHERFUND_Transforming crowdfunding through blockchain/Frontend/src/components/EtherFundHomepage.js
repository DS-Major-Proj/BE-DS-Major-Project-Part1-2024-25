import React, { useState, useEffect } from "react";
import {
  FaEthereum,
  FaSearch,
  FaWallet,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom"; // Use `useNavigate` instead of `useHistory`
import "./EtherFundHomepage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EtherFundHomepage = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: Math.random() > 0.5 ? "contribution" : "update",
        campaign: `Campaign ${Math.floor(Math.random() * 100) + 1}`,
        amount: Math.floor(Math.random() * 10000) / 100,
      };
      setRecentActivities((prev) => [newActivity, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletConnected(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const campaigns = [
    {
      id: 1,
      title: "Green Energy Initiative",
      description: "Funding sustainable energy projects across developing nations.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
      progress: 75,
    },
    {
      id: 2,
      title: "Educational Tech for All",
      description: "Bringing cutting-edge technology to underprivileged schools.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      progress: 40,
    },
    {
      id: 3,
      title: "Ocean Cleanup Innovation",
      description: "Developing advanced technologies to clean our oceans.",
      image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d",
      progress: 60,
    },
    {
      id: 4,
      title: "Wildlife Conservation",
      description: "Protect endangered species through innovative conservation methods.",
      image: "https://protectallwildlifeblog.wordpress.com/wp-content/uploads/2020/10/cropped-world-wildlife-day.jpg",
      progress: 50,
    },
    {
      id: 5,
      title: "Medical Research Fund",
      description: "Support groundbreaking research for life-threatening diseases.",
      image: "https://dimensions-uk.org/wp-content/uploads/woman-3187087.jpg",
      progress: 35,
    },
    {
      id: 6,
      title: "Water for All",
      description: "Providing clean drinking water to remote communities.",
      image: "https://ceowatermandate.org/wp-content/uploads/2019/02/WWD2019_News_UN-Waterwebsite_vs1_4Jan2019.jpg",
      progress: 80,
    },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Funding Raised (ETH)",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="homepage-container">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section" onClick={() => navigate("/")}>
            <FaEthereum className="logo-icon" />
            <h1 className="logo-text">EtherFund</h1>
          </div>
          <nav className="nav">
            <ul className="nav-links">
              <li><a href="#">Campaigns</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li>
                <button
                  onClick={() => navigate("/createcampaign")}
                  className="create-campaign-button"
                >
                  Create Campaign
                </button>
              </li>
            </ul>
          </nav>
          <div className="search-section">
            <input type="text" placeholder="Search campaigns" className="search-input" />
            <FaSearch className="search-icon" />
          </div>
          <div className="auth-buttons">
            <button onClick={() => navigate("/login")} className="auth-button">Login</button>
            <button onClick={() => navigate("/signup")} className="auth-button">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Campaign Showcase Section */}
      <section className="featured-campaigns-section">
        <h2 className="section-title">Featured Campaigns</h2>
        <div className="campaigns-grid">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="campaign-card"
              onClick={() => navigate(`/campaign/${campaign.id}`, { state: { campaign } })}
            >
              <img src={campaign.image} alt={campaign.title} className="campaign-image" />
              <div className="campaign-content">
                <h3 className="campaign-title">{campaign.title}</h3>
                <p className="campaign-description">{campaign.description}</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${campaign.progress}%` }}></div>
                </div>
                <div className="campaign-footer">
                  <span>{campaign.progress}% Funded</span>
                  <button className="support-button">Support</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MetaMask Integration Section */}
      <section className="wallet-section">
        <h2 className="section-title">Connect Your Wallet</h2>
        <p className="wallet-description">
          Securely participate in crowdfunding campaigns by connecting your MetaMask wallet.
        </p>
        <button onClick={connectWallet} className="wallet-button">
          <FaWallet className="wallet-icon" />
          {walletConnected ? "Wallet Connected" : "Connect MetaMask"}
        </button>
      </section>

      {/* Real-Time Monitoring Section */}
      <section className="live-activity-section">
        <h2 className="section-title">Live Activity Feed</h2>
        <ul className="activity-list">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="activity-item">
              <div className="activity-info">
                <span>{activity.campaign}</span>
                <span className={`activity-type ${activity.type === "contribution" ? "contribution" : "update"}`}>
                  {activity.type === "contribution" ? `${activity.amount} ETH` : "Update"}
                </span>
              </div>
              <p className="activity-detail">{activity.type === "contribution" ? "just contributed!" : "has updated their campaign."}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Chart Section */}  
      <center>
         <section className="chart-section">
        <h2 className="section-title">Funding Trends</h2>
        <Line data={chartData} />
      </section>
      </center>


      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>EtherFund is a decentralized crowdfunding platform that empowers individuals to support meaningful projects using cryptocurrency.</p>
          
          <div className="social-links">
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>

          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Contact Us</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EtherFund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EtherFundHomepage;
