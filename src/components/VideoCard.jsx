import { useRef, useEffect, useState } from "react";
import ActionBar from "./ActionBar";
import ProgressBar from "./ProgressBar";
import MusicDisc from "./MusicDisc";
import UserInfo from "./UserInfo";

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const tapTimeoutRef = useRef(null);
  const longPressTimeoutRef = useRef(null);
  const isLongPressingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [isHolding, setIsHolding] = useState(false);

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

  const handlePointerDown = (e) => {
    isLongPressingRef.current = false;
    longPressTimeoutRef.current = setTimeout(() => {
      isLongPressingRef.current = true;
      setIsHolding(true);
      videoRef.current.pause();
      setIsPlaying(false);
    }, 500);
  };

  const handlePointerUp = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
    if (isLongPressingRef.current) {
      setIsHolding(false);
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTap = (e) => {
    // If it was a long press, don't trigger normal tap logic
    if (isLongPressingRef.current) {
      isLongPressingRef.current = false;
      return;
    }

    if (e.detail === 2) {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
        tapTimeoutRef.current = null;
      }
      handleDoubleTap(e);
    } else if (e.detail === 1) {
      tapTimeoutRef.current = setTimeout(() => {
        togglePlayPause();
        tapTimeoutRef.current = null;
      }, 300);
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
    setTimeout(() => setShowIcon(false), 800);
  };

  const handleDoubleTap = (e) => {
    setLiked(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Math.random(), x, y };
    setHearts((prev) => [...prev, newHeart]);

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
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleTap}
      style={{
        height: "100dvh",
        width: "100%",
        scrollSnapAlign: "start",
        position: "relative",
        background: "#000",
        cursor: "pointer",
        flexShrink: 0,
        overflow: "hidden",
        touchAction: "none" // Prevent default touch behaviors like scrolling while holding
      }}
    >
      <style>
        {`
          @keyframes heart-burst {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            15% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.9; }
            30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            45% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            100% { transform: translate(-50%, -150%) scale(1.4); opacity: 0; }
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

      {/* Long Press Hold Indicator */}
      {isHolding && (
        <div style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "12px 24px",
          borderRadius: "20px",
          fontSize: "18px",
          fontWeight: "bold",
          zIndex: 100,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span style={{ fontSize: "24px" }}>⏸️</span> Paused
        </div>
      )}

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
            animation: "heart-burst 0.8s ease-out forwards",
            filter: "drop-shadow(0 0 10px rgba(0,0,0,0.8))"
          }}
        >
          ❤️
        </div>
      ))}

      {/* Play/Pause Icon */}
      {showIcon && !isHolding && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "60px",
          pointerEvents: "none",
          zIndex: 10,
          background: "rgba(0,0,0,0.3)",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
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
      <UserInfo video={video} />

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
