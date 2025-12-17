import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { LifecycleStage } from '../types';
import { generateKidsRhyme } from '../services/geminiService';

// Componente visual personalizado para a Romã
const PomegranateGraphic = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl filter overflow-visible">
    {/* Coroa (Cálice) */}
    <path 
      d="M 75 35 L 100 10 L 125 35 L 115 55 L 85 55 Z" 
      fill="#b91c1c" 
    />
    {/* Corpo (Pericarpo) */}
    <circle 
      cx="100" cy="115" r="75" 
      fill="#ef4444" 
    />
    {/* Brilho para dar volume */}
    <ellipse cx="135" cy="80" rx="15" ry="10" fill="white" fillOpacity="0.3" transform="rotate(-45 135 80)" />
    {/* Detalhe de sombra */}
    <path d="M 100 190 Q 140 190 160 150" stroke="#7f1d1d" strokeWidth="4" fill="none" opacity="0.2" strokeLinecap="round"/>
  </svg>
);

const stages: LifecycleStage[] = [
  { id: 1, title: 'O Broto', description: 'Tudo começa pequeno!', imageEmoji: '🌱', color: 'bg-green-200' },
  { id: 2, title: 'A Flor', description: 'Linda e vermelha!', imageEmoji: '🌺', color: 'bg-red-200' },
  { id: 3, title: 'Fruto Verde', description: 'Crescendo forte!', imageEmoji: '🍈', color: 'bg-green-400' },
  { id: 4, title: 'Romã Madura', description: 'Pronta para comer!', imageEmoji: 'CUSTOM_POMEGRANATE', color: 'bg-red-500' },
];

interface LifecycleProps {
  onBack: () => void;
}

const Lifecycle: React.FC<LifecycleProps> = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [rhyme, setRhyme] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const currentStage = stages[step];

  useEffect(() => {
    // Generate a rhyme when reaching the final stage
    if (step === stages.length - 1 && !rhyme) {
      setLoading(true);
      generateKidsRhyme('O ciclo da romã completou e a fruta madura chegou').then((text) => {
        setRhyme(text);
        setLoading(false);
      });
    }
  }, [step, rhyme]);

  const handleNext = () => {
    if (step < stages.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className={`h-full w-full flex flex-col p-4 transition-colors duration-500 ${currentStage.color}`}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
          <Home size={32} className="text-gray-700" />
        </button>
        <h2 className="text-3xl font-bold text-gray-800 bg-white/50 px-6 py-2 rounded-full">
           Linha do Tempo
        </h2>
        <div className="w-12"></div> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Monocle Frame Effect */}
        <div className="relative bg-black rounded-full p-2 w-72 h-72 md:w-96 md:h-96 shadow-2xl border-8 border-gray-800 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 rounded-full pointer-events-none z-10 animate-pulse"></div>
          
          <div className="animate-bounce-slow transform transition-all duration-500 flex items-center justify-center">
            {currentStage.imageEmoji === 'CUSTOM_POMEGRANATE' ? (
               <div className="w-48 h-48 md:w-64 md:h-64">
                 <PomegranateGraphic />
               </div>
            ) : (
               <div className="text-[150px] md:text-[200px]">
                 {currentStage.imageEmoji}
               </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center bg-white/80 p-6 rounded-3xl shadow-lg max-w-md">
          <h3 className="text-4xl font-bold text-pomegranate-900 mb-2">{currentStage.title}</h3>
          <p className="text-2xl text-gray-700">{currentStage.description}</p>
          
          {step === stages.length - 1 && (
            <div className="mt-4 p-4 bg-yellow-100 rounded-xl border-2 border-yellow-300">
              <p className="text-lg text-yellow-800 font-bold italic">
                {loading ? "Escrevendo poesia..." : rhyme}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-8 mb-8">
        <button 
          onClick={handlePrev} 
          disabled={step === 0}
          className={`p-6 rounded-full shadow-lg transition-all ${step === 0 ? 'bg-gray-300 opacity-50' : 'bg-white hover:scale-110 text-pomegranate-700'}`}
        >
          <ArrowLeft size={48} />
        </button>
        <button 
          onClick={handleNext} 
          disabled={step === stages.length - 1}
          className={`p-6 rounded-full shadow-lg transition-all ${step === stages.length - 1 ? 'bg-gray-300 opacity-50' : 'bg-white hover:scale-110 text-pomegranate-700'}`}
        >
          <ArrowRight size={48} />
        </button>
      </div>
    </div>
  );
};

export default Lifecycle;