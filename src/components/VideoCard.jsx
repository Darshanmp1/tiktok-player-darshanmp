import { useRef, useEffect, useState } from "react";

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // IntersectionObserver — autoplay/pause based on visibility
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

  // Tap to play/pause
  const handleTap = () => {
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

  // Sound toggle
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
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        background: "#000",
        cursor: "pointer",
      }}
    >
      {/* Video Element */}
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
        }}
      />

      {/* Play/Pause Icon Overlay */}
      {showIcon && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "60px",
          opacity: showIcon ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
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

      {/* Username bottom left */}
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
        <p style={{ fontSize: "14px", opacity: 0.9, maxWidth: "250px" }}>
          {video.description}
        </p>
      </div>

    </div>
  );
}

export default VideoCard;