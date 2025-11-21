import ExifReader from 'exifreader';

export interface MetadataEntry {
    key: string;
    value: string;
    description?: string;
}

export interface ProcessedMetadata {
    entries: MetadataEntry[];
    raw: Record<string, any>;
}

export const extractImageMetadata = async (file: File): Promise<ProcessedMetadata> => {
    try {
        const tags = await ExifReader.load(file);

        const entries: MetadataEntry[] = [];
        const raw: Record<string, any> = {};

        Object.entries(tags).forEach(([key, value]) => {
            if (value && typeof value === 'object' && 'description' in value) {
                entries.push({
                    key,
                    value: value.description as string,
                    description: value.description as string,
                });
                raw[key] = value.description;
            }
        });

        return { entries, raw };
    } catch (error) {
        console.error('Error extracting image metadata:', error);
        return { entries: [], raw: {} };
    }
};

export const extractVideoMetadata = async (file: File): Promise<ProcessedMetadata> => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        const url = URL.createObjectURL(file);

        video.onloadedmetadata = () => {
            const entries: MetadataEntry[] = [];
            const raw: Record<string, any> = {};

            // Duration
            if (video.duration && isFinite(video.duration)) {
                const duration = formatDuration(video.duration);
                entries.push({ key: 'Duration', value: duration });
                raw['Duration'] = duration;
            }

            // Dimensions
            if (video.videoWidth && video.videoHeight) {
                const dimensions = `${video.videoWidth}x${video.videoHeight}`;
                entries.push({ key: 'Dimensions', value: dimensions });
                raw['Dimensions'] = dimensions;
            }

            // File size
            const fileSize = formatFileSize(file.size);
            entries.push({ key: 'File Size', value: fileSize });
            raw['File Size'] = fileSize;

            // File type
            entries.push({ key: 'File Type', value: file.type });
            raw['File Type'] = file.type;

            // Last modified
            const lastModified = new Date(file.lastModified).toLocaleString();
            entries.push({ key: 'Last Modified', value: lastModified });
            raw['Last Modified'] = lastModified;

            URL.revokeObjectURL(url);
            resolve({ entries, raw });
        };

        video.onerror = () => {
            URL.revokeObjectURL(url);
            console.error('Error loading video metadata');
            resolve({ entries: [], raw: {} });
        };

        video.src = url;
    });
};

// Helper function to format duration
const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const clearImageMetadata = async (file: File): Promise<Blob> => {
    // For images, we'll create a canvas and export without metadata
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                URL.revokeObjectURL(url);
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Could not create blob'));
                }
            }, file.type);
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Could not load image'));
        };

        img.src = url;
    });
};

export const clearVideoMetadata = async (file: File): Promise<Blob> => {
    // Note: Clearing video metadata without re-encoding requires FFmpeg
    // which is too slow for browser use. We'll inform the user instead.
    console.warn('Video metadata clearing requires video re-encoding which is not supported in the browser for performance reasons.');

    // Return the original file - user can use desktop tools like FFmpeg or HandBrake for this
    return file;
};

export const editImageMetadata = async (
    file: File,
    metadata: Record<string, string>
): Promise<Blob> => {
    // Note: Editing EXIF data in browser is complex and limited
    // For now, we'll return the original file
    // In a production app, you'd use a library like piexifjs
    console.warn('Image metadata editing not fully implemented');
    return file;
};

export const editVideoMetadata = async (
    file: File,
    metadata: Record<string, string>
): Promise<Blob> => {
    // Note: Editing video metadata requires FFmpeg which is too slow for browser use
    console.warn('Video metadata editing not supported in browser');
    return file;
};
