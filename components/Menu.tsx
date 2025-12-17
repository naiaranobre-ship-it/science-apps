import React from 'react';
import { AppView } from '../types';
import { Flower, Sprout, Sun, MessageCircleQuestion } from 'lucide-react';

interface MenuProps {
  onNavigate: (view: AppView) => void;
}

const Menu: React.FC<MenuProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold text-pomegranate-700 text-center mb-2 drop-shadow-sm">
        Da Flor ao Fruto 🌿
      </h1>
      <p className="text-xl text-pomegranate-900 mb-6 font-semibold">A Mágica da Romã</p>
      
      {/* Grid Layout for 4 items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl place-items-stretch">
        <button
          onClick={() => onNavigate(AppView.LIFECYCLE)}
          className="bg-leaf-300 hover:bg-leaf-500 text-green-900 p-6 rounded-3xl shadow-lg transform transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center min-h-[160px]"
        >
          <Sprout size={56} className="mb-3" />
          <span className="text-2xl font-bold text-center">Como Cresce?</span>
        </button>

        <button
          onClick={() => onNavigate(AppView.PARTS)}
          className="bg-pomegranate-300 hover:bg-pomegranate-500 text-red-900 p-6 rounded-3xl shadow-lg transform transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center min-h-[160px]"
        >
          <Flower size={56} className="mb-3" />
          <span className="text-2xl font-bold text-center">O Que Tem Dentro?</span>
        </button>

        <button
          onClick={() => onNavigate(AppView.NEEDS)}
          className="bg-yellow-200 hover:bg-yellow-400 text-yellow-900 p-6 rounded-3xl shadow-lg transform transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center min-h-[160px]"
        >
          <Sun size={56} className="mb-3" />
          <span className="text-2xl font-bold text-center">Vamos Cuidar!</span>
        </button>

        <button
          onClick={() => onNavigate(AppView.QUESTIONS)}
          className="bg-purple-200 hover:bg-purple-400 text-purple-900 p-6 rounded-3xl shadow-lg transform transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center min-h-[160px]"
        >
          <MessageCircleQuestion size={56} className="mb-3" />
          <span className="text-2xl font-bold text-center">Minhas Perguntas</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;