import React from 'react';
import { motion } from 'framer-motion';

interface SelectedCardsProps {
  selectedCards: { id: number; name: string; image: string }[];
  showImages: boolean;
}

const SelectedCards: React.FC<SelectedCardsProps> = ({ selectedCards, showImages }) => {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {selectedCards.map((card, index) => (
        <motion.div
          key={card.id}
          className="w-24 h-36 sm:w-32 sm:h-48 bg-purple-700 rounded-lg shadow-lg overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: showImages ? 180 : 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="w-full h-full relative">
            <div className="absolute w-full h-full backface-hidden">
              <div className="w-full h-full border-4 border-yellow-300 rounded-lg"></div>
            </div>
            <div className="absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
              <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1">
                {card.name}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SelectedCards;