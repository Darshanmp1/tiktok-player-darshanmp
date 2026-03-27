import { useRef, useEffect, useState } from "react";
import ActionBar from "./ActionBar";
import ProgressBar from "./ProgressBar";
import MusicDisc from "./MusicDisc";
import UserInfo from "./UserInfo";

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const tapTimeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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
    if (e.detail === 2) {
      // Double tap detected via native detail
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
        tapTimeoutRef.current = null;
      }
      handleDoubleTap(e);
    } else if (e.detail === 1) {
      // Single tap - wait for a potential second tap
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
      {showIcon && (
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
