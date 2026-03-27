function MusicDisc({ isPlaying }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      right: "12px",
      zIndex: 10,
    }}>
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "repeating-radial-gradient(circle, #222 0%, #111 10%, #222 20%)",
        border: "4px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "rotate 3s linear infinite",
        animationPlayState: isPlaying ? "running" : "paused",
        boxShadow: "0 0 10px rgba(0,0,0,0.8)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle record grooves or center circle */}
        <div style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #555"
        }}>
          <span style={{ fontSize: "14px", filter: "brightness(2)" }}>🎵</span>
        </div>
      </div>
    </div>
  );
}

export default MusicDisc;
