// App.js (Struktur Utama)
import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react'; // atau ikon lain dari lucide-react
import { ConnectButton } from '@rainbow-me/rainbowkit'; // Contoh untuk koneksi wallet
import Home from './components/Home';
import DailyGM from './components/DailyGM';
import Stats from './components/Stats';
import Docs from './components/Docs';
import './App.css'; // atau Tailwind

// Konstanta Kontrak (Bisa juga dari file konfigurasi)
const DAILY_GM_CONTRACT_ADDRESS = "0x..."; // Alamat kontrak Anda di Base
const BASE_CHAIN_ID = 8453; // Chain ID untuk Base Mainnet
const TOKEN_ADDRESS = "0x..."; // Alamat token GM Anda (jika ada)

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentChainId, setCurrentChainId] = useState(null);

  // Cek koneksi wallet dan chain saat aplikasi dimuat
  useEffect(() => {
    // Implementasi pengecekan koneksi wallet dan chain
    // Misalnya, dengan ethers.js/wagmi
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const accounts = await provider.listAccounts();
    // const network = await provider.getNetwork();
    // setIsWalletConnected(accounts.length > 0);
    // setCurrentAccount(accounts[0]);
    // setCurrentChainId(network.chainId);
    // ... (logika pengecekan detail)
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'daily-gm':
        // Pastikan wallet terhubung dan di Base
        if (!isWalletConnected || currentChainId !== BASE_CHAIN_ID) {
          return <div className="p-6 text-center">
            <p className="text-lg mb-4">Silakan hubungkan wallet Anda ke Base Network untuk menggunakan Daily GM.</p>
            <ConnectButton /> {/* Ganti dengan logika koneksi dan switch chain Anda */}
          </div>;
        }
        return <DailyGM contractAddress={DAILY_GM_CONTRACT_ADDRESS} tokenAddress={TOKEN_ADDRESS} />;
      case 'stats':
        return <Stats contractAddress={DAILY_GM_CONTRACT_ADDRESS} tokenAddress={TOKEN_ADDRESS} />;
      case 'docs':
        return <Docs />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900`}>
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">GM</span>
            </div>
            <h1 className="font-bold text-xl">Daily GM on Base</h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              {['home', 'daily-gm', 'stats', 'docs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`capitalize font-medium transition-colors ${
                    activeTab === tab ? 'text-yellow-300 border-b-2 border-yellow-300' : 'hover:text-blue-200'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </nav>
            <ConnectButton /> {/* Ganti dengan komponen koneksi wallet Anda */}
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Daily GM. Proyek Fundingless.</p>
          {/* Tambahkan link sosial, docs, dll di sini */}
        </div>
      </footer>
    </div>
  );
}

export default App;
