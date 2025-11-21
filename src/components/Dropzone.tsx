import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, FileVideo } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect, isProcessing }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
    },
    multiple: false,
    disabled: isProcessing,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        {...getRootProps()}
        className={cn(
          'relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer',
          isDragActive
            ? 'border-primary-400 bg-primary-500/10 scale-105'
            : 'border-white/20 hover:border-white/40 hover:bg-white/5',
          isProcessing && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        
        <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
          <motion.div
            animate={{
              y: isDragActive ? -10 : 0,
              scale: isDragActive ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            {isDragActive ? (
              <div className="relative">
                <Upload className="w-20 h-20 text-primary-400" />
                <motion.div
                  className="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            ) : (
              <div className="flex gap-4">
                <FileImage className="w-16 h-16 text-accent-400" />
                <FileVideo className="w-16 h-16 text-primary-400" />
              </div>
            )}
          </motion.div>

          <h2 className="text-3xl font-bold mb-3 gradient-text">
            {isDragActive ? 'Drop it here!' : 'Upload Your Media'}
          </h2>
          
          <p className="text-white/60 text-center max-w-md mb-6">
            Drag and drop your image or video file here, or click to browse
          </p>

          <div className="flex gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1">
              <FileImage className="w-4 h-4" />
              PNG, JPG, GIF, WebP
            </span>
            <span className="flex items-center gap-1">
              <FileVideo className="w-4 h-4" />
              MP4, MOV, AVI, MKV
            </span>
          </div>
        </div>

        {/* Animated background effect */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 animate-pulse-slow" />
        </div>
      </div>
    </motion.div>
  );
};
