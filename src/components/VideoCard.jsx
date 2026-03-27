import { useRef, useEffect, useState } from "react";
import ActionBar from "./ActionBar";
import ProgressBar from "./ProgressBar";
import MusicDisc from "./MusicDisc";

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const lastTapRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.8 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTap = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 400;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleDoubleTap(e);
      lastTapRef.current = 0; // Reset to prevent triple-tap firing double-tap twice
    } else {
      lastTapRef.current = now;
      setTimeout(() => {
        // If no second tap happened within the window
        if (lastTapRef.current === now) {
          togglePlayPause();
        }
      }, DOUBLE_TAP_DELAY);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    setShowIcon(true);
    setTimeout(() => setShowIcon(false), 1000);
  };

  const handleDoubleTap = (e) => {
    setLiked(true);
    
    // Get coordinates relative to container
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now(), x, y };
    setHearts((prev) => [...prev, newHeart]);

    // Remove heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleTap}
      style={{
        height: "100dvh",
        width: "100%",
        scrollSnapAlign: "start",
        position: "relative",
        background: "#000",
        cursor: "pointer",
        flexShrink: 0,
        overflow: "hidden"
      }}
    >
      <style>
        {`
          @keyframes heart-burst {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            15% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.9; }
            30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -150%) scale(1.5); opacity: 0; }
          }
        `}
      </style>

      <video
        ref={videoRef}
        src={video.url}
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Floating Hearts for Double Tap */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: "absolute",
            left: heart.x,
            top: heart.y,
            fontSize: "80px",
            color: "#ff0050",
            pointerEvents: "none",
            zIndex: 100,
            animation: "heart-burst 1s ease-out forwards",
            filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))"
          }}
        >
          ❤️
        </div>
      ))}

      {/* Play/Pause Icon */}
      {showIcon && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "60px",
          pointerEvents: "none",
          zIndex: 10,
        }}>
          {isPlaying ? "▶️" : "⏸️"}
        </div>
      )}

      {/* Sound Toggle */}
      <button
        onClick={toggleMute}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "rgba(0,0,0,0.5)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "18px",
          cursor: "pointer",
          color: "white",
          zIndex: 10,
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* User Info */}
      <div style={{
        position: "absolute",
        bottom: "80px",
        left: "12px",
        color: "white",
        zIndex: 10,
      }}>
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>
          @{video.user.name}
        </p>
        <div style={{ fontSize: "14px", opacity: 0.9, maxWidth: "250px" }}>
          <p style={{
            margin: 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "unset" : 2,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}>
            {video.description}
          </p>
          {!isExpanded && video.description.length > 50 && (
            <span 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              style={{ fontWeight: "bold", cursor: "pointer", display: "inline-block", marginTop: "4px" }}
            >
              ... more
            </span>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <ActionBar video={video} liked={liked} setLiked={setLiked} />

      {/* Progress Bar */}
      <ProgressBar videoRef={videoRef} />

      {/* Music Disc */}
      <MusicDisc isPlaying={isPlaying} />
    </div>
  );
}

export default VideoCard;