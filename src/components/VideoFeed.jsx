import { useRef, useEffect, useState } from "react";
import VideoCard from "./VideoCard";

function VideoFeed({ videos }) {
  const feedRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const scrollToVideo = (index, smooth = true) => {
    const container = feedRef.current;
    if (!container) return;

    if (!smooth) {
      container.style.scrollBehavior = "auto";
      container.style.scrollSnapType = "none";
      container.scrollTop = index * container.clientHeight;
      // Force reflow
      void container.offsetHeight;
      container.style.scrollBehavior = "";
      container.style.scrollSnapType = "y mandatory";
    } else {
      container.children[index].scrollIntoView({ behavior: "smooth" });
    }
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "ArrowDown") {
        e.preventDefault();
        const next = (currentIndex + 1) % videos.length;
        if (currentIndex === videos.length - 1) {
          scrollToVideo(0, false);
        } else {
          scrollToVideo(next, true);
        }
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        const prev = (currentIndex - 1 + videos.length) % videos.length;
        if (currentIndex === 0) {
          scrollToVideo(videos.length - 1, false);
        } else {
          scrollToVideo(prev, true);
        }
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
      if (currentIndex === videos.length - 1) {
        scrollToVideo(0, false);
      } else {
        scrollToVideo(next, true);
      }
    } else if (deltaY > 50) {
      // Swipe down → previous video
      const prev = (currentIndex - 1 + videos.length) % videos.length;
      if (currentIndex === 0) {
        scrollToVideo(videos.length - 1, false);
      } else {
        scrollToVideo(prev, true);
      }
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleScroll = (e) => {
    const container = e.target;
    if (!container) return;
    const index = Math.round(container.scrollTop / container.clientHeight);
    if (currentIndex !== index) {
      setCurrentIndex(index);
    }
  };

  const handleWheel = (e) => {
    const container = feedRef.current;
    if (!container) return;
    
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
    const isAtTop = container.scrollTop <= 0;

    if (e.deltaY > 0 && isAtBottom) {
      e.preventDefault();
      scrollToVideo(0, false);
    } else if (e.deltaY < 0 && isAtTop) {
      e.preventDefault();
      scrollToVideo(videos.length - 1, false);
    }
  };

  return (
    <div
      ref={feedRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onScroll={handleScroll}
      onWheel={handleWheel}
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
        <VideoCard 
          key={video.id} 
          video={video} 
          isMuted={isMuted} 
          toggleMute={toggleMute} 
        />
      ))}
    </div>
  );
}

export default VideoFeed;