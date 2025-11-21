import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

class FFmpegService {
  private ffmpeg: FFmpeg | null = null;
  private loaded = false;

  async load(): Promise<void> {
    if (this.loaded) return;

    this.ffmpeg = new FFmpeg();
    
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    
    await this.ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    this.loaded = true;
  }

  getInstance(): FFmpeg {
    if (!this.ffmpeg) {
      throw new Error('FFmpeg not loaded. Call load() first.');
    }
    return this.ffmpeg;
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}

export const ffmpegService = new FFmpegService();
