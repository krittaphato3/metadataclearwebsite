import React from 'react';
import { FileImage } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                        <FileImage className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text">
                        Metadata Editor
                    </h1>
                </div>
                <p className="text-white/60 text-lg ml-14">
                    View, edit, and remove metadata from your images and videos
                </p>
            </div>
        </header>
    );
};
