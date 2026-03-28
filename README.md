# TikTok-Style Vertical Video Player

Hey! Welcome to my TikTok-style vertical video player built with **React** and **Vite**. I wanted to build a smooth, immersive scrolling experience with all the native gesture controls and a premium dark UI—all completely from scratch without relying on heavy external video libraries.

![React](https://img.shields.io/badge/React-18%2B-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![License](https://img.shields.io/badge/License-MIT-green)

### Important Links
- **Demo Video**: [Watch Demo](https://drive.google.com/file/d/1lYccogIAiUQZOIYU6K2xvQPq6p6p3vQB/view?usp=sharing)
- **Live App**: [coming soon — will add after Vercel deployment]
- **GitHub**: [Darshanmp1/tiktok-player-darshanmp](https://github.com/Darshanmp1/tiktok-player-darshanmp)

---

## Quick Start

Want to run it locally? It takes less than a minute:

```bash
git clone https://github.com/Darshanmp1/tiktok-player-darshanmp.git
cd tiktok-player-darshanmp
npm install
npm run dev
```

Then just open [http://localhost:5173](http://localhost:5173) in your browser.

---

## What's Inside?

### 🎬 Core Features
- **Vertical Video Feed** — Full-screen portrait player with native scroll-snap navigation.
- **Smart Auto-Play** — Uses `IntersectionObserver` to only play the video you're actually looking at, pausing the rest.
- **Minimum 5 Videos** — Comes pre-loaded with mock data so you can test it immediately.
- **True Infinite Loop** — You can keep scrolling forever. It seamlessly wraps the videos around without any jarring jumps.
- **Tap to Play/Pause** — Tap anywhere on the video to play or pause, complete with a quick fading playback icon overlay.
- **Progress Bar** — A real-time timeline at the bottom showing how much of the video is left.
- **Like, Comment, Share** — A fully hooked-up action bar (likes actually increment/decrement the counter dynamically).
- **User Info Block** — Cleanly displays the creator's username and their caption at the bottom left.
- **Smart Captions** — Captions cleanly truncate after 2 lines to save space.
- **Spinning Vinyl** — A classic spinning music disc in the bottom right corner that actually stops when the video pauses.
- **Mute/Unmute** — Simple button at the top to toggle sound.

### ✨ Bonus Features
- **Double-Tap to Like** — Just like the real app, double-tap anywhere to spawn an animated ❤️ right where your finger landed.
- **Follow Button** — The user's avatar has a little `+` button that turns into a checkmark when clicked.
- **Long-Press to Pause** — Click and hold the screen to peek at the video cleanly paused without UI interruptions.
- **Skeleton Loading** — While a video buffers, you'll see a cool pulsing shimmer effect.
- **Responsive Design** — Looks exactly like a mobile app on desktop (capped at 420px width), but takes over the whole screen gracefully on actual mobile devices.
- **Dark & Light Mode** — Because every good app needs a dark mode! Toggles instantly from the top menu.
- **Keyboard Friendly** — You can navigate the feed using the `Up`/`Down` arrows and hit `Space` to pause.

### 🚀 Extra Fun Details
Because I wanted this to feel really polished, I went slightly beyond the original requirements and added a few extras:
- **Seekable Timeline** — You can grab the progress bar and drag it to scrub through the video seamlessly.
- **Auto-Advance** — When a video finishes naturally, the player automatically scrolls down to the next one for you.
- **Interactive UI Updates** — The comment icon fills in solid white when you tap it.
- **Inline Caption Expand** — Clicking "...more" or "...less" works fluidly inline with the text.
- **Custom Swipe Gestures** — I wrote custom touch-event logic to make flicking between videos feel super snappy on mobile.
- **Formatted Numbers** — Views and likes read cleanly as `5.6K` or `1.2M` instead of raw long numbers.
- **Hashtag Styling** — Any `#hashtag` in the caption automatically highlights in TikTok's signature teal color.

---

## Tech Stack & How It Was Built

I kept the stack lean on purpose. The goal was performance and clean React fundamentals over relying on "magic" third-party packages.

| Tech | Why I chose it |
|---|---|
| **React 18**| Built entirely with pure functional components and Hooks (`useState`, `useEffect`, `useRef`). |
| **Vite** | For insanely fast startup times and HMR during development. |
| **Native `<video>`** | Handled natively by HTML5 to keep bundle sizes tiny and let the device hardware do the heavy lifting. |
| **IntersectionObserver** | Much better for performance than listening to raw `onScroll` events to figure out what video is currently visible. |
| **Vanilla CSS** | All styling and keyframe animations (like the floating hearts) are done natively without huge UI libraries. |

### The Component Tree
To keep the codebase maintainable, everything is strictly separated by its job:
```
src/
├── App.jsx              # The main wrapper and theme provider
├── index.css            # Global resets and hiding scrollbars globally
├── data/
│   └── videos.js        # Our mock database (video URLs, usernames, stats)
└── components/
    ├── VideoFeed.jsx     # The brain: handles scrolling, the infinite loop clones, and keyboard nav
    ├── VideoCard.jsx     # The player: holds the actual <video> tag and reads your taps/gestures
    ├── ActionBar.jsx     # Just the buttons on the right side
    ├── UserInfo.jsx      # Just the text block and avatar on the left
    ├── ProgressBar.jsx   # Dedicated component to handle scrubbing math and UI
    └── MusicDisc.jsx     # Independent spinning animation component
```

### Note on Git History
I tried to keep a very clean, disciplined Git history during this project. Instead of dumping massive batches of unrelated code into a single save, I wrote atomic commits. Every feature (like adding the progress bar) or bug fix has its own clear commit label so the project's evolution is easy to track.

---

## Adding Your Own Videos
Want to test it with your own clips? It's super easy:
1. Drop any `.mp4` file into the `/public/videos/` folder (e.g., `my-cat.mp4`).
2. Open `/src/data/videos.js`.
3. Add a new block into the array mimicking the others. Just point the `url` to `"/videos/my-cat.mp4"`.
4. Refresh, and it will immediately show up in the feed!

---

## Known Limitations
*I want to be fully transparent about what this current version handles and what it doesn't:*
1. **No Real Backend Yet**: Likes, comments, and follow states are just saved in local React state right now. If you refresh the page, they reset. A real backend (like Firebase or Node/Express) would be needed to permanently save this data across sessions.
2. **Browser Autoplay Rules**: Browsers (especially Safari and Chrome) get very strict about letting videos play automatically with sound. To prevent the app from breaking on load, videos start muted by default until you interact with the page.
3. **Local File Loading**: Currently, the videos are loaded directly as raw files. A true production app would stream them progressively in chunks (like HLS `.m3u8` feeds) from a super-fast CDN to save bandwidth, rather than forcing the browser to load the entire `.mp4` at once.
