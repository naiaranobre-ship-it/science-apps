import React, { useState, useEffect } from 'react';
import { Home, CloudRain, Sun, Shovel, RefreshCcw } from 'lucide-react';
import { generateKidsRhyme } from '../services/geminiService';

interface NeedsGameProps {
  onBack: () => void;
}

// Miniatura da Romã
const MiniPomegranate = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`drop-shadow-md ${className || 'w-16 h-16'}`}>
       <path d="M 35 25 L 50 10 L 65 25 L 60 35 L 40 35 Z" fill="#b91c1c" />
       <circle cx="50" cy="60" r="35" fill="#ef4444" />
       <circle cx="65" cy="50" r="5" fill="white" fillOpacity="0.3" />
    </svg>
);

const NeedsGame: React.FC<NeedsGameProps> = ({ onBack }) => {
  const [hasWater, setHasWater] = useState(false);
  const [hasSun, setHasSun] = useState(false);
  const [hasSoil, setHasSoil] = useState(false);
  const [message, setMessage] = useState<string>("A planta precisa de ajuda!");

  const isComplete = hasWater && hasSun && hasSoil;

  useEffect(() => {
    if (isComplete) {
       generateKidsRhyme("A romã cresceu forte com sol, água e terra").then(setMessage);
    }
  }, [isComplete]);

  const reset = () => {
    setHasWater(false);
    setHasSun(false);
    setHasSoil(false);
    setMessage("A planta precisa de ajuda!");
  };

  return (
    <div className="h-full w-full flex flex-col p-4 bg-sky-200 relative overflow-hidden">
      <div className="flex justify-between items-center z-10">
        <button onClick={onBack} className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
          <Home size={32} className="text-gray-700" />
        </button>
        <button onClick={reset} className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
          <RefreshCcw size={32} className="text-gray-700" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="text-center bg-white/90 p-4 rounded-2xl shadow-lg mb-8 max-w-lg">
          <h2 className="text-2xl font-bold text-blue-900">{message}</h2>
        </div>

        {/* The Plant Visualization */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-end justify-center">
            {/* Soil Base */}
            <div className={`absolute bottom-0 w-full h-8 bg-amber-800 rounded-full transition-all duration-1000 ${hasSoil ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}></div>
            
            {/* Trunk */}
            <div className={`absolute bottom-4 w-6 bg-amber-900 transition-all duration-1000 ${hasSoil ? 'h-32' : 'h-0'}`}></div>

            {/* Leaves */}
            <div className={`absolute bottom-24 transition-all duration-1000 ${isComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <span className="text-9xl filter drop-shadow-xl">🌳</span>
            </div>
             <div className={`absolute bottom-24 transition-all duration-1000 delay-500 ${isComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className="absolute -right-4 -top-4 animate-bounce">
                    <MiniPomegranate className="w-16 h-16" />
                </div>
                <div className="absolute -left-6 top-4 animate-bounce-slow">
                    <MiniPomegranate className="w-16 h-16" />
                </div>
            </div>

            {/* Sun Visualization */}
            <div className={`absolute -top-20 -right-20 transition-all duration-1000 ${hasSun ? 'scale-100 opacity-100 rotate-180' : 'scale-0 opacity-0'}`}>
                <span className="text-8xl">☀️</span>
            </div>
             {/* Rain Visualization */}
             <div className={`absolute -top-20 -left-20 transition-all duration-1000 ${hasWater ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <span className="text-8xl">🌧️</span>
            </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl z-10 mt-4">
        <div className="flex justify-around gap-4">
          <button 
            onClick={() => setHasSoil(true)}
            disabled={hasSoil}
            className={`flex flex-col items-center p-4 rounded-2xl transition-all transform ${hasSoil ? 'bg-green-200 scale-95 opacity-50' : 'bg-amber-100 hover:scale-110 hover:bg-amber-200'}`}
          >
            <div className="bg-amber-700 text-white p-3 rounded-full mb-2">
                <Shovel size={32} />
            </div>
            <span className="font-bold text-amber-900">Terra</span>
          </button>

          <button 
            onClick={() => setHasSun(true)}
            disabled={hasSun}
            className={`flex flex-col items-center p-4 rounded-2xl transition-all transform ${hasSun ? 'bg-green-200 scale-95 opacity-50' : 'bg-yellow-100 hover:scale-110 hover:bg-yellow-200'}`}
          >
             <div className="bg-yellow-500 text-white p-3 rounded-full mb-2">
                <Sun size={32} />
            </div>
            <span className="font-bold text-yellow-900">Sol</span>
          </button>

          <button 
            onClick={() => setHasWater(true)}
            disabled={hasWater}
            className={`flex flex-col items-center p-4 rounded-2xl transition-all transform ${hasWater ? 'bg-green-200 scale-95 opacity-50' : 'bg-blue-100 hover:scale-110 hover:bg-blue-200'}`}
          >
             <div className="bg-blue-500 text-white p-3 rounded-full mb-2">
                <CloudRain size={32} />
            </div>
            <span className="font-bold text-blue-900">Água</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedsGame;