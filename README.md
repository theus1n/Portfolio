# Terminal Portfolio

A modern, terminal-inspired portfolio web app built with Vite and React.

## Features

- Terminal-style UI with custom prompt and command input
- Social links with icons and keyboard accessibility
- SpotlightCard for featured projects (bottom right)
- Responsive, accessible, and visually consistent design
- Custom commands: `aboutme`, `social`, `email`, `history`, `help`, `clear`
- Always-focused input for seamless terminal experience

## Demo

![screenshot](./portfolio/public/vite.svg)

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Open your browser at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Building for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
portfolio/
  src/
    App.tsx         # Main React component (terminal UI)
    App.css         # Styles for terminal and global UI
    blocks/Components/SpotlightCard/SpotlightCard.tsx  # SpotlightCard component
  public/           # Static assets
  index.html        # App entry point
  package.json      # Project metadata and scripts
  vite.config.ts    # Vite configuration
```

## Customization
- Edit `src/App.tsx` to change commands, social links, or terminal behavior.
- Update the SpotlightCard content for your own featured project.
- Adjust styles in `src/App.css` for further theming.

## License

MIT

---

Built by [theus1n](https://github.com/theus1n)
