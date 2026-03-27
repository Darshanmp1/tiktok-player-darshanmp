import VideoFeed from "./components/VideoFeed";
import videos from "./data/videos";

function App() {
  return (
    <div style={{
      width: "100%",
      height: "100dvh",
      background: "#000",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
    }}>
      <VideoFeed videos={videos} />
    </div>
  );
}

export default App;