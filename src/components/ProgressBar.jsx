import { useEffect, useState, useRef } from "react";

function ProgressBar({ videoRef }) {
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Don't update visual position from timeupdate while actively dragging
      if (!isDragging && video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        setProgress(percentage);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [videoRef, isDragging]);

  const seekToPosition = (clientX) => {
    const bar = progressBarRef.current;
    if (!bar || !videoRef.current || !videoRef.current.duration) return;

    const rect = bar.getBoundingClientRect();
    const width = rect.width;
    const x = Math.max(0, Math.min(clientX - rect.left, width));
    const percentage = x / width;
    
    // Update visual state immediately for a smooth experience
    setProgress(percentage * 100);
    
    // Update video time
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const video = videoRef.current;
    if (video) {
      wasPlayingRef.current = !video.paused;
      video.pause();
    }
    
    setIsDragging(true);
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    seekToPosition(clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDragging) {
        // Prevent scrolling on mobile during drag
        if (e.type === 'touchmove') e.preventDefault();
        const clientX = e.clientX ?? e.touches?.[0]?.clientX;
        seekToPosition(clientX);
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        if (wasPlayingRef.current && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("touchmove", handlePointerMove, { passive: false });
      window.addEventListener("touchend", handlePointerUp);
    }

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={progressBarRef}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        height: isHovering || isDragging ? "8px" : "4px",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 100,
        cursor: "pointer",
        transition: "height 0.15s ease",
        display: "flex",
        alignItems: "flex-end",
        touchAction: "none"
      }}
    >
      <div style={{
        width: `${progress}%`,
        height: "100%",
        background: "#ffffff",
        position: "relative",
        transition: isDragging ? "none" : "width 0.1s linear"
      }}>
        {/* Seek Thumb / Dot */}
        {(isHovering || isDragging) && (
          <div style={{
            position: "absolute",
            right: "-6px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#ffffff",
            boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            zIndex: 101,
          }} />
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
