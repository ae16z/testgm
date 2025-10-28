// components/DailyGM.js (Inti Interaksi DApp)
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // atau wagmi
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

const DailyGM = ({ contractAddress, tokenAddress }) => {
  const [isConnected, setIsConnected] = useState(false); // Harus diambil dari konteks wallet
  const [isReady, setIsReady] = useState(false); // Apakah pengguna bisa GM hari ini
  const [nextGmTime, setNextGmTime] = useState(null); // Waktu GM berikutnya
  const [lastGmTime, setLastGmTime] = useState(null); // Waktu GM terakhir
  const [userAddress, setUserAddress] = useState(null); // Harus diambil dari konteks wallet
  const [isGmPending, setIsGmPending] = useState(false);
  const [gmResult, setGmResult] = useState(null); // Hasil GM (jumlah token, dll)

  // Contoh fungsi untuk memeriksa status GM pengguna
  const checkUserStatus = async () => {
    if (!isConnected || !userAddress) return;

    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, ABI, signer);
      // const userData = await contract.getUserData(userAddress);
      // setLastGmTime(userData.lastGmTime);
      // setIsReady(userData.isReadyForGm); // Misalnya fungsi di kontrak
      // setNextGmTime(userData.nextGmTime);
    } catch (error) {
      console.error("Error checking user status:", error);
      // Tampilkan pesan error ke pengguna
    }
  };

  // Contoh fungsi untuk melakukan GM
  const handleGm = async () => {
    if (!isConnected || !isReady || isGmPending) return;

    setIsGmPending(true);
    setGmResult(null);

    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, ABI, signer);
      // const tx = await contract.dailyGm(); // Panggil fungsi di kontrak
      // await tx.wait(); // Tunggu konfirmasi
      // console.log("GM successful!");
      // setGmResult({ success: true, tokensReceived: "..." }); // Ambil data dari event atau state
      // checkUserStatus(); // Perbarui status setelah GM
    } catch (error) {
      console.error("Error performing GM:", error);
      setGmResult({ success: false, error: error.message || "GM failed." });
    } finally {
      setIsGmPending(false);
    }
  };

  // Panggil checkUserStatus saat komponen dimuat dan jika koneksi berubah
  useEffect(() => {
    checkUserStatus();
  }, [isConnected, userAddress]); // Dependensi penting

  // Fungsi untuk format waktu (contoh sederhana)
  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Daily GM</h2>

      {/* Status GM */}
      <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
        <h3 className="font-semibold mb-2 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" /> Status Anda
        </h3>
        {lastGmTime ? (
          <p className="text-sm mb-1">GM Terakhir: {formatTime(lastGmTime)}</p>
        ) : (
          <p className="text-sm mb-1">Anda belum pernah GM.</p>
        )}
        {isReady ? (
          <p className="text-green-600 font-medium flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Siap untuk GM!</p>
        ) : (
          <p className="text-orange-600 font-medium flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> Belum waktunya. Next GM: {nextGmTime ? formatTime(nextGmTime) : "..."}</p>
        )}
      </div>

      {/* Tombol GM */}
      <div className="text-center mb-6">
        <button
          onClick={handleGm}
          disabled={!isReady || isGmPending || !isConnected}
          className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-colors ${
            isReady && !isGmPending && isConnected
              ? 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isGmPending ? 'Processing...' : 'GM!'}
        </button>
      </div>

      {/* Hasil GM */}
      {gmResult && (
        <div className={`p-4 rounded-lg mb-6 ${gmResult.success ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          {gmResult.success ? (
            <p className="font-medium">GM berhasil! Anda menerima token.</p> // Tambahkan detail token di sini
          ) : (
            <p className="font-medium">GM gagal: {gmResult.error}</p>
          )}
        </div>
      )}

      {/* Info Distribusi */}
      <div className="mt-8 p-4 rounded-lg bg-gray-100 border border-gray-200">
        <h3 className="font-semibold mb-2">Struktur Distribusi (Contoh)</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Staking Pool: 40%</li>
          <li>Treasury (Testnet EOA): 20%</li>
          <li>Burnvault: 25%</li>
          <li>EOA Penerima: 15%</li>
        </ul>
        <p className="text-xs mt-2 text-gray-600">*Detail distribusi sesuai smart contract.</p>
      </div>
    </div>
  );
};

export default DailyGM;
