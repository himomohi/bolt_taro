import React from 'react';
import { motion } from 'framer-motion';

interface TarotCardProps {
  id: number;
  name: string;
  image: string;
  selected: boolean;
  onSelect: (id: number) => void;
  index: number;
  totalCards: number;
}

const TarotCard: React.FC<TarotCardProps> = ({ id, name, image, selected, onSelect, index, totalCards }) => {
  const angle = (index - (totalCards - 1) / 2) * 3;
  const translateY = Math.abs(angle) * 1.5;

  return (
    <motion.div
      className={`absolute left-1/2 bottom-0 w-24 h-36 sm:w-32 sm:h-48 cursor-pointer ${
        selected ? 'z-10' : 'z-0'
      }`}
      style={{
        transformOrigin: 'bottom center',
      }}
      initial={{ rotate: angle, translateY: translateY, translateX: '-50%' }}
      animate={{ 
        rotate: selected ? 0 : angle, 
        translateY: selected ? -50 : translateY,
        translateX: '-50%',
        zIndex: selected ? 10 : 0,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(id)}
    >
      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-opacity-90 bg-purple-700 absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
          <div className="w-16 h-24 sm:w-20 sm:h-28 border-4 border-yellow-300 rounded"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TarotCard;