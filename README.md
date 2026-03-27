# TikTok-Style Vertical Video Player

A TikTok-style vertical video player built with **React 18** and **Vite**. Features smooth scroll-snap navigation, gesture controls, and a premium dark UI — all without any external libraries.

![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

### Core
- **Vertical Video Feed** — Full-screen portrait videos with scroll-snap navigation
- **Auto-play / Auto-pause** — Only the visible video plays (IntersectionObserver)
- **Tap to Play/Pause** — Single tap toggles playback with icon overlay
- **Mute/Unmute** — Sound toggle button (top-right)
- **Progress Bar** — Real-time playback progress at the bottom

### Interactions
- **Double-tap to Like** — ❤️ heart burst animation at tap position
- **Long-press to Pause** — Hold 500ms to pause with overlay, release to resume
- **Follow Button** — Toggleable +/✓ button on user avatar
- **Action Bar** — Like, Comment, Bookmark, Share with animated states

### Navigation
- **Scroll Snap** — Smooth vertical snap between videos
- **Arrow Keys** — Up/Down arrow keys to navigate videos
- **Space Bar** — Toggle play/pause (prevents default scroll)
- **Swipe Gestures** — Touch swipe up/down for mobile navigation

### Polish
- **K/M Count Formatting** — Large numbers display as 1.2K, 5.6K, 12K etc.
- **Hashtag Highlighting** — #hashtags render in TikTok teal (#69C9D0)
- **Caption Truncation** — 2-line limit with expandable "... more"
- **Music Disc** — Spinning vinyl animation (pauses with video)
- **Skeleton Loader** — Shimmer effect during video buffering
- **Dark/Light Mode** — Theme toggle with localStorage persistence
- **Responsive Layout** — Centered 420px column on desktop, full-width on mobile

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework (functional components + hooks only) |
| Vite 5 | Build tool and dev server |
| HTML5 `<video>` | Native video playback (no external libraries) |
| CSS-in-JS (inline) | All styling via React inline styles |
| CSS @keyframes | Animations (heart burst, shimmer, spin) |
| IntersectionObserver | Viewport-based auto-play/pause |
| localStorage | Theme persistence |

## Project Structure

```
src/
├── App.jsx              # Root component + dark mode toggle
├── main.jsx             # React entry point
├── index.css            # Global resets + scrollbar hiding
├── utils.js             # formatCount() utility
├── data/
│   └── videos.js        # Video data (URLs, user info, counts)
└── components/
    ├── VideoFeed.jsx     # Scrollable feed container + keyboard/swipe nav
    ├── VideoCard.jsx     # Individual video player + gesture handlers
    ├── ActionBar.jsx     # Like/Comment/Bookmark/Share buttons
    ├── UserInfo.jsx      # Avatar, follow button, caption with hashtags
    ├── ProgressBar.jsx   # Real-time playback progress
    └── MusicDisc.jsx     # Spinning vinyl disc animation
```

## Design Decisions

- **No external libraries** — All gestures, animations, and state management use vanilla React + browser APIs
- **Component decomposition** — Each UI concern is its own focused component
- **useRef for DOM** — Video elements and timers use refs, not state
- **Proper cleanup** — All event listeners and observers are cleaned up in useEffect return functions
- **Promise handling** — All `.play()` calls wrapped with `.catch()` to handle autoplay policy rejections
