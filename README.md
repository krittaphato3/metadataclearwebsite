# Metadata Editor

A privacy-focused, client-side web application built to view and clear metadata (EXIF, technical info) from images and videos. Built with modern web technologies for high performance and a smooth user experience.

![Project Banner](https://via.placeholder.com/1280x640.png?text=Metadata+Editor+Preview)

## 🚀 Features

- **Drag & Drop Interface**: Intuitive file upload area supporting various media formats.
  - **Images**: JPG, PNG, GIF, WebP.
  - **Videos**: MP4, MOV, AVI, MKV.
- **Detailed Metadata Analysis**: Instantly extracts and displays hidden file information using `exifreader`.
- **Privacy First**: All processing happens entirely in the browser. Your files are **never** uploaded to any server.
- **Metadata Stripping**:
  - **Images**: Re-processes images via Canvas API to strip EXIF/IPTC data.
  - **Videos**: View technical specifications (duration, dimensions, codecs).
- **Modern UI**: Sleek glassmorphism aesthetics using Tailwind CSS and smooth animations with Framer Motion.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & `clsx`/`tailwind-merge`
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Getting Started

This project uses [Bun](https://bun.sh) for dependency management and script execution.

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/krittaphato3/metadataclearwebsite.git](https://github.com/krittaphato3/metadataclearwebsite.git)
   cd metadataclearwebsite
