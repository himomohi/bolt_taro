import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface TarotReadingProps {
  reading: string;
}

const TarotReading: React.FC<TarotReadingProps> = ({ reading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 bg-white bg-opacity-10 rounded-lg p-6 shadow-lg"
    >
      <h3 className="text-2xl font-semibold mb-4">타로 해석 결과</h3>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{reading}</ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default TarotReading;