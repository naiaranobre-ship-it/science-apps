import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { generateKidsRhyme } from '../services/geminiService';

interface PartsExplorationProps {
  onBack: () => void;
}

const PartsExploration: React.FC<PartsExplorationProps> = ({ onBack }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [fact, setFact] = useState<string>("Toque na romã!");

  const handlePartClick = async (part: string, description: string) => {
    setSelectedPart(part);
    setFact("Pensando...");
    const rhyme = await generateKidsRhyme(`a parte da romã chamada ${part}. ${description}`);
    setFact(rhyme);
  };

  return (
    <div className="h-full w-full flex flex-col p-4 bg-orange-50">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
          <Home size={32} className="text-gray-700" />
        </button>
        <h2 className="text-3xl font-bold text-pomegranate-900">Por Dentro</h2>
        <div className="w-12"></div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
        
        {/* Interactive SVG Representation */}
        <div className="relative w-72 h-72 md:w-96 md:h-96">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                {/* Crown */}
                <path 
                    d="M 85 10 L 100 25 L 115 10 L 110 30 L 90 30 Z" 
                    fill="#b91c1c" 
                    className="cursor-pointer hover:fill-red-500 transition-colors"
                    onClick={() => handlePartClick("Coroa", "Parece uma coroa de rei em cima da fruta.")}
                />
                
                {/* Skin/Shell - Main Body */}
                <circle 
                    cx="100" cy="110" r="80" 
                    fill="#ef4444" 
                    className="cursor-pointer hover:fill-red-400 transition-colors"
                    onClick={() => handlePartClick("Casca", "É dura e protege as sementes.")}
                />
                
                {/* Cutout showing seeds */}
                <path 
                    d="M 100 110 L 140 160 A 80 80 0 0 0 170 110 Z" 
                    fill="#7f1d1d" 
                />
                <circle cx="120" cy="120" r="5" fill="pink" className="animate-pulse" />
                <circle cx="130" cy="130" r="6" fill="pink" className="animate-pulse delay-75" />
                <circle cx="115" cy="140" r="5" fill="pink" className="animate-pulse delay-150" />
                
                 {/* Invisible Hit Area for Seeds */}
                <path 
                    d="M 100 110 L 140 160 A 80 80 0 0 0 170 110 Z" 
                    fill="transparent" 
                    className="cursor-pointer"
                    onClick={() => handlePartClick("Sementes", "São doces e vermelhas, chamadas arilos.")}
                />
            </svg>
            <div className="absolute top-0 right-0 animate-bounce text-2xl">👆 Toque!</div>
        </div>

        {/* Info Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl max-w-sm w-full border-4 border-pomegranate-100">
            <h3 className="text-2xl font-bold text-pomegranate-700 mb-4 text-center">
                {selectedPart || "Escolha uma parte"}
            </h3>
            <p className="text-xl text-gray-600 text-center leading-relaxed">
                {fact}
            </p>
        </div>

      </div>
    </div>
  );
};

export default PartsExploration;