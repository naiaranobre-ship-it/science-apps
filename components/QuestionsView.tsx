import React, { useState } from 'react';
import { Home, HelpCircle, X, MessageCircle } from 'lucide-react';
import { generateChildAnswer } from '../services/geminiService';

interface QuestionsViewProps {
  onBack: () => void;
}

const questionsList = [
  "Por que a romã tem tantas sementinhas?",
  "Quem colocou todas essas sementes lá dentro?",
  "A romã já nasce cheia ou ela vai enchendo aos poucos?",
  "Por que a romã é vermelha por dentro?",
  "Será que cada semente pode virar uma outra árvore?",
  "Por que a casca da romã é tão dura?",
  "A romã sente cócegas quando a gente abre?",
  "Quem foi a primeira pessoa que comeu uma romã?",
  "A romã cresce mais no calor ou no frio?",
  "Por que o suco da romã mancha tudo?",
  "A romã tem cheiro?",
  "Se a romã cair no chão, ela machuca?",
  "Os passarinhos gostam de romã também?",
  "A romã tem filhotes?",
  "Por que a romã parece uma coroa em cima?",
  "Se eu plantar uma sementinha hoje, em quanto tempo nasce uma romã?",
  "A romã dorme quando está na árvore?",
  "A romã é uma fruta feliz?",
  "Será que a romã conversa com as outras frutas?",
  "Por que a romã não tem caroço grande, só vários pequenos?"
];

const QuestionsView: React.FC<QuestionsViewProps> = ({ onBack }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionClick = async (question: string) => {
    setSelectedQuestion(question);
    setAnswer(null);
    setLoading(true);

    const generatedAnswer = await generateChildAnswer(question);
    setAnswer(generatedAnswer);
    setLoading(false);
  };

  const closeOverlay = () => {
    setSelectedQuestion(null);
    setAnswer(null);
  };

  return (
    <div className="h-full w-full flex flex-col p-4 bg-purple-100 relative">
      <div className="flex justify-between items-center mb-4 z-10">
        <button onClick={onBack} className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
          <Home size={32} className="text-gray-700" />
        </button>
        <h2 className="text-3xl font-bold text-purple-900">Minhas Perguntas</h2>
        <div className="w-12"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {questionsList.map((q, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(q)}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all transform hover:scale-[1.02] text-left flex items-start group"
            >
              <div className="bg-purple-200 p-2 rounded-full mr-4 group-hover:bg-purple-300 transition-colors shrink-0">
                <HelpCircle size={24} className="text-purple-700" />
              </div>
              <span className="text-lg text-purple-900 font-medium leading-tight">{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Answer Overlay */}
      {selectedQuestion && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-bounce-slow">
            <button 
              onClick={closeOverlay}
              className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            >
              <X size={24} className="text-gray-600" />
            </button>
            
            <h3 className="text-xl font-bold text-purple-900 mb-4 pr-8">{selectedQuestion}</h3>
            
            <div className="bg-purple-50 p-6 rounded-2xl">
              {loading ? (
                <div className="flex items-center justify-center space-x-2 text-purple-600">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-150"></div>
                </div>
              ) : (
                <p className="text-xl md:text-2xl text-purple-800 font-medium leading-relaxed">
                  {answer}
                </p>
              )}
            </div>
            
            <p className="text-center text-gray-400 mt-4 text-sm">Toque fora para fechar</p>
          </div>
          <div className="absolute inset-0 -z-10" onClick={closeOverlay}></div>
        </div>
      )}
    </div>
  );
};

export default QuestionsView;