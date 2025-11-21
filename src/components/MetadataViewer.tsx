import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info } from 'lucide-react';
import { Card } from './Card';
import { type MetadataEntry } from '../utils/metadataService';

interface MetadataViewerProps {
    metadata: MetadataEntry[];
    fileName: string;
    fileSize: string;
}

export const MetadataViewer: React.FC<MetadataViewerProps> = ({
    metadata,
    fileName,
    fileSize,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card className="overflow-hidden">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary-500/20">
                            <Info className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Metadata Information</h3>
                            <p className="text-sm text-white/60">
                                {fileName} • {fileSize}
                            </p>
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-6 h-6 text-white/60" />
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-6 pt-6 border-t border-white/10">
                                {metadata.length === 0 ? (
                                    <div className="text-center py-8 text-white/40">
                                        <Info className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No metadata found in this file</p>
                                    </div>
                                ) : (
                                    <div className="max-h-96 overflow-y-auto scrollbar-hide">
                                        <table className="w-full">
                                            <thead className="sticky top-0 bg-slate-900/80 backdrop-blur-sm">
                                                <tr className="border-b border-white/10">
                                                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/80">
                                                        Property
                                                    </th>
                                                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/80">
                                                        Value
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {metadata.map((entry, index) => (
                                                    <motion.tr
                                                        key={entry.key}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                                    >
                                                        <td className="py-3 px-4 text-sm font-medium text-white/90">
                                                            {entry.key}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-white/70 font-mono">
                                                            {entry.value}
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    );
};
