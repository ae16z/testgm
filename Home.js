// components/Home.js (Beranda)
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Daily GM on Base</h1>
      <p className="text-lg mb-8 text-gray-700">
        Prove that impact is possible without significant funding. Daily GM is a simple ritual with structured tokenomics.
      </p>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">How it Works</h2>
        <ol className="list-decimal pl-6 text-left space-y-2 text-gray-700">
          <li>Connect your wallet to Base Network.</li>
          <li>Perform your "GM" action once per day.</li>
          <li>Receive tokens based on the structured distribution.</li>
          <li>Participate in natural competition and community growth.</li>
        </ol>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Fundingless Project</h2>
        <p className="mb-6">
          This project operates without significant initial funding, relying on community participation and token mechanics.
        </p>
        <button
          onClick={() => window.location.hash = '#daily-gm'} // Atau gunakan routing React Router
          className="px-6 py-3 bg-white text-blue-600 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto"
        >
          Start Your Daily GM <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Home;
