import { useRef, useEffect, useState } from "react";
import VideoCard from "./VideoCard";

function VideoFeed({ videos }) {
  const feedRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(null);

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

  // Swipe gesture navigation
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartY.current = null;

    if (deltaY < -50) {
      // Swipe up → next video
      const next = (currentIndex + 1) % videos.length;
      setCurrentIndex(next);
      feedRef.current.children[next].scrollIntoView({ behavior: "smooth" });
    } else if (deltaY > 50) {
      // Swipe down → previous video
      const prev = (currentIndex - 1 + videos.length) % videos.length;
      setCurrentIndex(prev);
      feedRef.current.children[prev].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={feedRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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