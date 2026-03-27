import { useRef, useEffect, useState } from "react";
import VideoCard from "./VideoCard";

function VideoFeed({ videos }) {
  const feedRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "ArrowDown") {
        e.preventDefault();
        const next = (currentIndex + 1) % videos.length;
        setCurrentIndex(next);
        feedRef.current.children[next].scrollIntoView({ behavior: "smooth" });
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        const prev = (currentIndex - 1 + videos.length) % videos.length;
        setCurrentIndex(prev);
        feedRef.current.children[prev].scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, videos.length]);

  return (
    <div
      ref={feedRef}
      style={{
        height: "100dvh",
        width: "100%",
        maxWidth: "420px",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        background: "#000",
      }}
    >
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoFeed;