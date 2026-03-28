import { useState } from "react";
import { formatCount } from "../utils";

function ActionBar({ video, liked, setLiked }) {
  const [commentCount, setCommentCount] = useState(0);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleComment = (e) => {
    e.stopPropagation();
    setCommentCount((prev) => prev + 1);
    setIsCommenting(true);
    setTimeout(() => setIsCommenting(false), 200);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

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
        onClick={handleComment}
      >
        <span style={{ 
          fontSize: "28px", 
          filter: "brightness(0) invert(1)",
          transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isCommenting ? "scale(1.2)" : "scale(1)",
        }}>💬</span>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          {formatCount(video.comments + commentCount)}
        </span>
      </div>

      {/* Bookmark Button */}
      <div 
        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        onClick={handleBookmark}
      >
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill={isBookmarked ? "white" : "none"} 
          stroke="white" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), fill 0.2s ease",
            transform: isBookmarked ? "scale(1.1)" : "scale(1)"
          }}
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <span style={{ fontSize: "12px", color: "white", marginTop: "4px" }}>
          {isBookmarked ? 1 : 0}
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
