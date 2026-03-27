import { useState, useEffect } from "react";
import VideoFeed from "./components/VideoFeed";
import videos from "./data/videos";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("tiktok-theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("tiktok-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        background: theme === "dark" ? "#000" : "#f5f5f5",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        transition: "background 0.3s ease",
      }}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          zIndex: 1000,
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "20px",
          padding: "8px 16px",
          cursor: "pointer",
          fontSize: "14px",
          backdropFilter: "blur(4px)",
        }}
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      <VideoFeed videos={videos} />
    </div>
  );
}

export default App;