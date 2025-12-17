import React, { useState } from 'react';
import { AppView } from './types';
import Menu from './components/Menu';
import Lifecycle from './components/Lifecycle';
import NeedsGame from './components/NeedsGame';
import PartsExploration from './components/PartsExploration';
import QuestionsView from './components/QuestionsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
  };

  const goHome = () => {
    setCurrentView(AppView.HOME);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Menu onNavigate={navigateTo} />;
      case AppView.LIFECYCLE:
        return <Lifecycle onBack={goHome} />;
      case AppView.NEEDS:
        return <NeedsGame onBack={goHome} />;
      case AppView.PARTS:
        return <PartsExploration onBack={goHome} />;
      case AppView.QUESTIONS:
        return <QuestionsView onBack={goHome} />;
      default:
        return <Menu onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#FEF3C7] overflow-hidden flex flex-col">
       {/* Decorative Background Elements */}
       <div className="fixed top-0 left-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50 -translate-x-10 -translate-y-10 pointer-events-none"></div>
       <div className="fixed bottom-0 right-0 w-64 h-64 bg-red-200 rounded-full blur-3xl opacity-50 translate-x-10 translate-y-10 pointer-events-none"></div>
       
      <main className="flex-1 relative max-w-5xl mx-auto w-full h-screen md:h-auto md:min-h-screen">
        {renderView()}
      </main>

      {/* Footer for Science Fair context */}
      <footer className="w-full text-center p-4 text-pomegranate-900/60 text-xs md:text-sm absolute bottom-0 md:relative z-20 bg-white/30 md:bg-transparent backdrop-blur-sm md:backdrop-filter-none">
         <p className="font-semibold text-sm md:text-base">Projeto Feira de Ciências: A Romã do Nosso Quintal</p>
         <p>Estudante pesquisador: Thierry Nobre Souza - Orientadora: Naiara dos Santos Nobre</p>
      </footer>
    </div>
  );
};

export default App;