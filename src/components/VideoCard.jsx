function VideoCard({ video }) {
  return (
    <div style={{
      height: "100vh",
      scrollSnapAlign: "start",
      background: "#111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "20px",
    }}>
      {video.user.name}
    </div>
  );
}

export default VideoCard;