import React, { useState, useRef, useEffect } from 'react';
import { Home, Trash2 } from 'lucide-react';

interface PaintGameProps {
  onBack: () => void;
}

const PaintGame: React.FC<PaintGameProps> = ({ onBack }) => {
  const [splotches, setSplotches] = useState<{x: number, y: number, size: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    // Prevent scrolling on touch
    // e.preventDefault(); // Can create issues with React synth events, handled by style usually.

    let clientX, clientY;
    if ('touches' in e) {
       clientX = e.touches[0].clientX;
       clientY = e.touches[0].clientY;
    } else {
       clientX = (e as React.MouseEvent).clientX;
       clientY = (e as React.MouseEvent).clientY;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newSplotch = {
      x,
      y,
      size: Math.random() * 30 + 40 // Random size between 40 and 70
    };

    setSplotches([...splotches, newSplotch]);
    
    // Play sound effect (simulated)
    // In a real app we'd use Audio()
  };

  return (
    <div className="h-full w-full flex flex-col p-4 bg-white">
       <div className="flex justify-between items-center mb-2">
        <button onClick={onBack} className="bg-gray-100 p-3 rounded-full shadow-md hover:bg-gray-200">
          <Home size={32} className="text-gray-700" />
        </button>
        <h2 className="text-2xl font-bold text-pomegranate-700">Esmague as Sementes!</h2>
        <button onClick={() => setSplotches([])} className="bg-gray-100 p-3 rounded-full shadow-md hover:bg-gray-200">
          <Trash2 size={32} className="text-gray-700" />
        </button>
      </div>

      <div className="flex-1 relative bg-gray-50 border-4 border-dashed border-gray-300 rounded-3xl overflow-hidden touch-none"
           ref={containerRef}
           onMouseDown={handleTap}
           onTouchStart={handleTap}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <span className="text-4xl text-gray-400">Toque na tela para pintar</span>
        </div>

        {splotches.map((splotch, index) => (
          <div
            key={index}
            className="absolute rounded-full animate-wiggle opacity-80"
            style={{
              left: splotch.x - splotch.size / 2,
              top: splotch.y - splotch.size / 2,
              width: splotch.size,
              height: splotch.size,
              backgroundColor: '#be123c', // Pomegranate juice color
              filter: 'blur(2px)',
              transform: `scale(${Math.random() * 0.5 + 0.8})`
            }}
          >
            {/* Glossy reflection */}
            <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white opacity-40 rounded-full"></div>
          </div>
        ))}
      </div>
       <div className="mt-4 text-center">
            <p className="text-lg text-gray-600">
                Sementes estouradas: <span className="font-bold text-2xl">{splotches.length}</span>
            </p>
       </div>
    </div>
  );
};

export default PaintGame;