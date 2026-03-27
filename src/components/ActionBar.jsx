import { useState } from "react";

function ActionBar({ video }) {
  const [liked, setLiked] = useState(false);

  return (
    <div style={{
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      zIndex: 10,
    }}>
      {/* Like Button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={() => setLiked(!liked)}>
        <span style={{ 
          fontSize: "28px", 
          transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: liked ? "scale(1.2)" : "scale(1)",
          color: liked ? "#ff0050" : "white"
        }}>
          {liked ? "❤️" : "🤍"}
        </span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          {video.likes + (liked ? 1 : 0)}
        </span>
      </div>

      {/* Comment Button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <span style={{ fontSize: "28px" }}>💬</span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          {video.comments}
        </span>
      </div>

      {/* Bookmark Button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <span style={{ fontSize: "28px" }}>🔖</span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          0
        </span>
      </div>

      {/* Share Button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <span style={{ fontSize: "28px" }}>➦</span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          {video.shares}
        </span>
      </div>
    </div>
  );
}

export default ActionBar;
