import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProcessingOverlayProps {
  message: string;
  progress?: number;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ 
  message, 
  progress 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-effect-strong rounded-3xl p-8 max-w-md w-full mx-4"
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="mb-6"
          >
            <Loader2 className="w-16 h-16 text-primary-400" />
          </motion.div>

          <h3 className="text-2xl font-bold mb-2 gradient-text">{message}</h3>
          
          {progress !== undefined && (
            <div className="w-full mt-4">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {progress === undefined && (
            <div className="w-full mt-4">
              <div className="progress-bar h-2" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
