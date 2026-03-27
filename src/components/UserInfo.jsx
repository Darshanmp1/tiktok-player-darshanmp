import { useState } from "react";

function UserInfo({ video }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const renderCaption = (text) => {
    return text.split(" ").map((word, i) => {
      if (word.startsWith("#")) {
        return (
          <span
            key={i}
            onClick={(e) => e.stopPropagation()}
            style={{ color: "#69C9D0", cursor: "pointer" }}
          >
            {word}{" "}
          </span>
        );
      }
      return <span key={i}>{word} </span>;
    });
  };

  return (
    <div style={{
      position: "absolute",
      bottom: "80px",
      left: "12px",
      color: "white",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}>
      {/* Avatar and Follow Button */}
      <div style={{ position: "relative", width: "50px", height: "50px", marginBottom: "4px" }}>
        <img 
          src={video.user.avatar} 
          alt={video.user.name} 
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px solid white",
            objectFit: "cover"
          }}
        />
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsFollowing(!isFollowing);
          }}
          style={{
            position: "absolute",
            bottom: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: isFollowing ? "#ff0050" : "white",
            border: isFollowing ? "none" : "1px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isFollowing ? "white" : "#ff0050",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          {isFollowing ? "✓" : "+"}
        </div>
      </div>

      {/* Username */}
      <p style={{ fontWeight: "bold", fontSize: "16px", margin: 0 }}>
        @{video.user.name}
      </p>

      {/* Caption/Description with Hashtag Highlighting */}
      <div style={{ fontSize: "14px", opacity: 0.9, maxWidth: "250px" }}>
        <p style={{
          margin: 0,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: isExpanded ? "unset" : 2,
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
        }}>
          {renderCaption(video.description)}
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
  );
}

export default UserInfo;
