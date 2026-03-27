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
        background: "linear-gradient(#333, #111)",
        border: "10px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "rotate 3s linear infinite",
        animationPlayState: isPlaying ? "running" : "paused",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}>
        <span style={{ fontSize: "20px" }}>🎵</span>
      </div>
    </div>
  );
}

export default MusicDisc;
