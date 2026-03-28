import { useEffect, useState, useRef } from "react";

function ProgressBar({ videoRef }) {
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const progressBarRef = useRef(null);
  
  // Use refs for drag state to avoid stale closures and state sync issues
  const isDragging = useRef(false);
  const wasPlaying = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Don't update visual position from timeupdate while actively dragging
      if (!isDragging.current && video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        setProgress(percentage);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [videoRef]);

  const seekToPosition = (clientX) => {
    const bar = progressBarRef.current;
    if (!bar || !videoRef.current || !videoRef.current.duration) return;

    const rect = bar.getBoundingClientRect();
    const width = rect.width;
    const x = Math.max(0, Math.min(clientX - rect.left, width));
    const percentage = x / width;
    
    // Update visual state immediately
    setProgress(percentage * 100);
    
    // Update video time
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    // Prevent scrolling on mobile during drag
    if (e.type === 'touchmove') e.preventDefault();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    seekToPosition(clientX);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    document.removeEventListener("mousemove", handlePointerMove);
    document.removeEventListener("mouseup", handlePointerUp);
    document.removeEventListener("touchmove", handlePointerMove);
    document.removeEventListener("touchend", handlePointerUp);

    if (wasPlaying.current && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (videoRef.current) {
      wasPlaying.current = !videoRef.current.paused;
    }
    
    isDragging.current = true;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    seekToPosition(clientX);

    // Attach to document so dragging outside the bar still works
    document.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("mouseup", handlePointerUp);
    document.addEventListener("touchmove", handlePointerMove, { passive: false });
    document.addEventListener("touchend", handlePointerUp);
  };

  // Cleanup in case component unmounts while dragging
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", handlePointerUp);
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("touchend", handlePointerUp);
    };
  }, []);

  return (
    <div 
      ref={progressBarRef}
      onPointerDown={handlePointerDown}
      onPointerUp={(e) => {
        e.stopPropagation();
        handlePointerUp();
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        handlePointerUp();
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        handlePointerUp();
      }}
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        height: isHovering || isDragging.current ? "8px" : "4px",
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
        transition: isDragging.current ? "none" : "width 0.1s linear"
      }}>
        {/* Seek Thumb / Dot */}
        {(isHovering || isDragging.current) && (
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
