import { useRef, useEffect, useState } from "react";
import VideoCard from "./VideoCard";

function VideoFeed({ videos }) {
  const feedRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const scrollToVideo = (index, smooth = true) => {
    const container = feedRef.current;
    if (!container || !container.children[index]) return;

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
    
    // Map DOM index (1 to videos.length) back to reel index (0 to videos.length-1)
    if (index >= 1 && index <= videos.length) {
      setCurrentIndex(index - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "ArrowDown") {
        e.preventDefault();
        // Scroll to next (current + 1 + 1 for clone offset)
        scrollToVideo(currentIndex + 2, true);
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        // Scroll to prev (current - 1 + 1 for clone offset)
        scrollToVideo(currentIndex, true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, videos.length]);

  // Initial scroll to first video (index 1)
  useEffect(() => {
    if (feedRef.current && videos.length > 0) {
      scrollToVideo(1, false);
    }
  }, []);

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
      scrollToVideo(currentIndex + 2, true);
    } else if (deltaY > 50) {
      // Swipe down → previous video
      scrollToVideo(currentIndex, true);
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleScroll = (e) => {
    const container = e.target;
    if (!container) return;
    
    const scrollPos = container.scrollTop / container.clientHeight;
    const index = Math.round(scrollPos);

    // Seamless Wrap Logic: 
    // If we've settled on the end-clone (last video + 1), jump back to real video 1
    if (Math.abs(scrollPos - (videos.length + 1)) < 0.01) {
      scrollToVideo(1, false);
      return;
    }
    
    // If we've settled on the start-clone (index 0), jump back to real video 5
    if (Math.abs(scrollPos - 0) < 0.01) {
      scrollToVideo(videos.length, false);
      return;
    }

    // Map DOM index back to reel index (0 to videos.length-1)
    const reelIndex = index - 1;
    if (currentIndex !== reelIndex && reelIndex >= 0 && reelIndex < videos.length) {
      setCurrentIndex(reelIndex);
    }
  };

  const handleWheel = (e) => {
    // Rely on native snapping and handleScroll for wrapping logic
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
      {/* Clone of last video for seamless upward wrap */}
      {videos.length > 0 && (
        <VideoCard 
          key="start-clone" 
          video={videos[videos.length - 1]} 
          isMuted={isMuted} 
          toggleMute={toggleMute} 
          onNext={() => scrollToVideo(currentIndex + 2, true)}
        />
      )}

      {videos.map((video, idx) => (
        <VideoCard 
          key={video.id} 
          video={video} 
          isMuted={isMuted} 
          toggleMute={toggleMute} 
          onNext={() => scrollToVideo(currentIndex + 2, true)}
        />
      ))}

      {/* Clone of first video for seamless downward wrap */}
      {videos.length > 0 && (
        <VideoCard 
          key="end-clone" 
          video={videos[0]} 
          isMuted={isMuted} 
          toggleMute={toggleMute} 
          onNext={() => scrollToVideo(currentIndex + 2, true)}
        />
      )}
    </div>
  );
}

export default VideoFeed;