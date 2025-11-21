import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Dropzone } from './components/Dropzone';
import { MetadataViewer } from './components/MetadataViewer';
import { MetadataEditor } from './components/MetadataEditor';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import {
  extractImageMetadata,
  extractVideoMetadata,
  clearImageMetadata,
  clearVideoMetadata,
  type MetadataEntry,
} from './utils/metadataService';
import { isImageFile, isVideoFile, formatFileSize, downloadFile } from './utils/fileHelpers';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<MetadataEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsProcessing(true);
    setProcessingMessage('Extracting metadata...');

    try {
      let result;
      if (isImageFile(selectedFile)) {
        result = await extractImageMetadata(selectedFile);
      } else if (isVideoFile(selectedFile)) {
        result = await extractVideoMetadata(selectedFile);
      } else {
        throw new Error('Unsupported file type');
      }

      setMetadata(result.entries);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearMetadata = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProcessingMessage('Clearing metadata...');

    try {
      let blob;
      if (isImageFile(file)) {
        blob = await clearImageMetadata(file);
      } else if (isVideoFile(file)) {
        blob = await clearVideoMetadata(file);
      } else {
        throw new Error('Unsupported file type');
      }

      const filename = file.name.replace(/(\.[^.]+)$/, '_no_metadata$1');
      downloadFile(blob, filename);
    } catch (error) {
      console.error('Error clearing metadata:', error);
      alert('Error clearing metadata. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!file) return;
    downloadFile(file, file.name);
  };

  const handleReset = () => {
    setFile(null);
    setMetadata([]);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pb-12">
        {!file ? (
          <Dropzone onFileSelect={handleFileSelect} isProcessing={isProcessing} />
        ) : (
          <div className="space-y-6">
            <MetadataViewer
              metadata={metadata}
              fileName={file.name}
              fileSize={formatFileSize(file.size)}
            />

            <MetadataEditor
              onClear={handleClearMetadata}
              onDownload={handleDownload}
              isProcessing={isProcessing}
            />

            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                Upload a different file
              </button>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {isProcessing && <ProcessingOverlay message={processingMessage} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
