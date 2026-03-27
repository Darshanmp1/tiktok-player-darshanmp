import { useEffect, useState } from "react";

function ProgressBar({ videoRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [videoRef]);

  return (
    <div style={{
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      height: "4px",
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 10,
    }}>
      <div style={{
        width: `${progress}%`,
        height: "100%",
        background: "#ffffff",
        transition: "width 0.1s linear",
      }} />
    </div>
  );
}

export default ProgressBar;
