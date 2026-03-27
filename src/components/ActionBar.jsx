import { formatCount } from "../utils";

function ActionBar({ video, liked, setLiked }) {
  return (
    <div style={{
      position: "absolute",
      right: "18px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      zIndex: 10,
    }}>
      {/* Like Button */}
      <div 
        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} 
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
      >
        <span style={{ 
          fontSize: "28px", 
          transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: liked ? "scale(1.2)" : "scale(1)",
          color: liked ? "#ff0050" : "white",
          filter: liked ? "none" : "brightness(0) invert(1)",
        }}>
          {liked ? "❤️" : "🤍"}
        </span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          {formatCount(video.likes + (liked ? 1 : 0))}
        </span>
      </div>

      {/* Comment Button */}
      <div 
        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span style={{ fontSize: "28px", filter: "brightness(0) invert(1)" }}>💬</span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          {formatCount(video.comments)}
        </span>
      </div>

      {/* Bookmark Button */}
      <div 
        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span style={{ fontSize: "28px", filter: "brightness(0) invert(1)" }}>🔖</span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          0
        </span>
      </div>

      {/* Share Button */}
      <div 
        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span style={{ fontSize: "28px", filter: "brightness(0) invert(1)" }}>➦</span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          {formatCount(video.shares)}
        </span>
      </div>
    </div>
  );
}

export default ActionBar;
