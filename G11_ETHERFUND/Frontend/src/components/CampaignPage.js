// CampaignPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const campaignsData = {
  'green-energy-initiative': {
    title: "Green Energy Initiative",
    description: "Funding sustainable energy projects across developing nations. Your contribution helps in building renewable energy sources to combat climate change.",
    balance: "5.25 ETH ($14,050.05)",
    target: "20 ETH ($52,700.20)",
    minContribution: "0.01 ETH ($27.50)",
    numberOfRequests: 8,
    numberOfApprovers: 5,
  },
  'education-tech-for-all': {
    title: "Education Tech for All",
    description: "Providing affordable educational technology to students in underserved communities. Help us bridge the digital divide.",
    balance: "4.00 ETH ($10,600.00)",
    target: "15 ETH ($39,750.00)",
    minContribution: "0.005 ETH ($13.75)",
    numberOfRequests: 10,
    numberOfApprovers: 6,
  },
  'ocean-cleanup-innovation': {
    title: "Ocean Cleanup Innovation",
    description: "Supporting innovative solutions to reduce plastic pollution in our oceans. Join us in making a difference!",
    balance: "3.75 ETH ($9,800.00)",
    target: "12 ETH ($31,500.00)",
    minContribution: "0.002 ETH ($5.50)",
    numberOfRequests: 7,
    numberOfApprovers: 4,
  },
  'wildlife-conservation': {
    title: "Wildlife Conservation",
    description: "Protecting endangered species and their habitats through education and action. Your help can save lives.",
    balance: "6.10 ETH ($16,150.00)",
    target: "25 ETH ($65,000.00)",
    minContribution: "0.01 ETH ($27.50)",
    numberOfRequests: 9,
    numberOfApprovers: 7,
  },
  'medical-research-fund': {
    title: "Medical Research Fund",
    description: "Funding critical research in the medical field to find cures and improve healthcare worldwide.",
    balance: "7.30 ETH ($19,000.00)",
    target: "30 ETH ($78,000.00)",
    minContribution: "0.01 ETH ($27.50)",
    numberOfRequests: 15,
    numberOfApprovers: 10,
  },
  'water-for-all': {
    title: "Water for All",
    description: "Providing clean drinking water to communities in need. Help us build sustainable water solutions.",
    balance: "5.90 ETH ($15,400.00)",
    target: "18 ETH ($46,800.00)",
    minContribution: "0.005 ETH ($13.75)",
    numberOfRequests: 6,
    numberOfApprovers: 5,
  },
};

const CampaignPage = () => {
  const { campaignId } = useParams();
  const campaign = campaignsData[campaignId];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
          <p className="text-gray-500 mt-2">{campaign.description}</p>
        </header>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-900 text-sm mb-2">
            <strong>Campaign Balance: </strong> {campaign.balance} / Target: {campaign.target}
          </p>
          <p className="text-gray-500 text-xs">Minimum Contribution: {campaign.minContribution}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Contribute Now!</h2>
          <form className="flex flex-col">
            <input
              type="text"
              placeholder="Amount in Ether you want to contribute"
              className="p-3 border rounded mb-3 text-gray-900"
            />
            <button
              type="submit"
              className="p-3 bg-green-500 text-white font-semibold rounded"
            >
              Connect Wallet to Contribute
            </button>
          </form>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm">
            <p><strong>Number of Requests: </strong> {campaign.numberOfRequests}</p>
            <p><strong>Number of Approvers: </strong> {campaign.numberOfApprovers}</p>
          </div>
          <a
            href="https://rinkeby.etherscan.io"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Rinkeby Etherscan
          </a>
        </div>

        <div className="mt-4">
          <button className="w-full p-3 bg-green-600 text-white font-semibold rounded">
            View Withdrawal Requests
          </button>
        </div>
      </div>

      <footer className="mt-8 text-gray-500 text-sm text-center">
        Made with 💚 by the Campaign Team
      </footer>
    </div>
  );
};

export default CampaignPage;
