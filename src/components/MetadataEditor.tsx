import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Download, AlertTriangle, X } from 'lucide-react';
import { Button } from './Button';

interface MetadataEditorProps {
    onClear: () => void;
    onDownload: () => void;
    isProcessing: boolean;
}

export const MetadataEditor: React.FC<MetadataEditorProps> = ({
    onClear,
    onDownload,
    isProcessing,
}) => {
    const [showClearWarning, setShowClearWarning] = useState(false);

    const handleClearClick = () => {
        setShowClearWarning(true);
    };

    const handleConfirmClear = () => {
        setShowClearWarning(false);
        onClear();
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-3 justify-end"
            >
                <Button
                    variant="secondary"
                    onClick={handleClearClick}
                    disabled={isProcessing}
                    className="flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    Clear Metadata
                </Button>

                <Button
                    variant="primary"
                    onClick={onDownload}
                    disabled={isProcessing}
                    className="flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Download
                </Button>
            </motion.div>

            <AnimatePresence>
                {showClearWarning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setShowClearWarning(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-effect-strong rounded-3xl p-8 max-w-md w-full mx-4"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 rounded-full bg-yellow-500/20">
                                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2 text-white">
                                        Clear All Metadata?
                                    </h3>
                                    <p className="text-white/70">
                                        This action will remove all metadata from your file. This cannot be undone.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowClearWarning(false)}
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
                                <p className="text-sm text-yellow-200/90">
                                    <strong>Note:</strong> The original file will not be modified. You'll download a new version without metadata.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="ghost"
                                    onClick={() => setShowClearWarning(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={handleConfirmClear}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear Metadata
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
