# Website Editor

A modern, interactive website editor that allows users to create and customize web content using a visual interface. Build responsive layouts with rows and columns, and populate them with text and media content.

## Features

- **Visual Layout Builder**: Create and manage rows and columns for page layout
- **Multiple Content Types**:
  - Text (with Markdown support)
  - Images (with alt text for accessibility)
  - Video (prepared for future implementation)
- **Content Customization**: Adjust text alignment and styling
- **Real-Time Preview**: See your changes as you make them
- **Persistent Storage**: Automatically saves your work to localStorage

## Tech Stack

- React for component-based UI architecture
- TypeScript for type safety
- Zustand for lightweight state management
- Markdown for rich text editing

## Getting Started

### Prerequisites
- Node.js v14 or higher

### Installation
1. Install dependencies
```bash
npm install
```

2. Start the development server
```bash
npm start
```

## Usage Guide

### Creating Your Layout
1. **Add Rows**: Use the "Add Row" button in the Page section
2. **Add Columns**: Select a row, then use the "Add Column" button in the Row section
3. **Select Elements**: Click on any row or column to edit its properties

### Working with Content
1. **Choose Content Type**: Select a column and choose from Text or Image types
2. **Edit Content**: 
   - For text: Enter your content with Markdown formatting
   - For images: Provide an image URL and alt text for accessibility

### Text Formatting
- Use Markdown syntax for formatting:
  - `# Heading` for headers
  - `**bold**` for bold text
  - `*italic*` for italic text
  - And more standard Markdown features

### Alignment Options
- Choose left, center, or right alignment for text content

## Architecture

The application is built with a scalable architecture using:

### Key Design Patterns

- **Discriminated Unions**: Type-safe content modeling ensures each content type only has relevant properties
- **Component-Based Design**: Modular UI components for easier maintenance
- **Type Guards**: Ensures proper typing and behavior for different content types
- **Efficient State Updates**: Optimized state management to minimize unnecessary re-renders

### Project Structure

```
src/
├── features/
│   └── page-editor/
│       ├── store/         # State management using Zustand
│       ├── types/         # TypeScript type definitions with discriminated unions
│       └── ui/            # UI components organized by feature
├── shared/
│   ├── constant/         # Shared application constants
│   ├── icons/            # SVG icon components
│   └── ui/               # Reusable UI components
```

## Roadmap

- Drag and drop functionality for easier content arrangement
- Support for video content
- Ability to reorder rows and columns
- Export to HTML/CSS
- Additional content types and formatting options

