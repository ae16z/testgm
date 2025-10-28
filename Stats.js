// components/Stats.js (Menampilkan data on-chain)
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // atau wagmi

const Stats = ({ contractAddress, tokenAddress }) => {
  const [totalGms, setTotalGms] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTokensDistributed, setTotalTokensDistributed] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org'); // atau RPC Base Anda
      // const contract = new ethers.Contract(contractAddress, ABI, provider);
      // setTotalGms(await contract.getTotalGms());
      // setTotalUsers(await contract.getTotalUsers());
      // setTotalTokensDistributed(ethers.utils.formatUnits(await contract.getTotalTokensDistributed(), decimals)); // Ganti 'decimals' dengan nilai token Anda
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [contractAddress]);

  if (isLoading) {
    return <div className="text-center py-10">Loading statistics...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total GMs</h3>
          <p className="text-3xl font-bold text-blue-600">{totalGms}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{totalUsers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Tokens Distributed</h3>
          <p className="text-3xl font-bold text-purple-600">{totalTokensDistributed}</p>
        </div>
      </div>
      {/* Tambahkan lebih banyak statistik di sini */}
    </div>
  );
};

export default Stats;
