import React from 'react';
import { motion } from 'framer-motion';

interface ResultScreenProps {
  score: number;
  onReplay: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, onReplay }) => {
  return (
    <div className='flex justify-center items-center'>
    <div className="absolute top-0 w-full max-w-xs h-screen mx-auto bg-cover bg-center">
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Game Over
        </motion.h1>
        <motion.p
          className="text-lg mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Your Score: {score}
        </motion.p>
        <motion.button
          onClick={onReplay}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Replay Game
        </motion.button>
      </motion.div>
    </div>
    </div>
  );
};

export default ResultScreen;