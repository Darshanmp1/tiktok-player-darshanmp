import VideoFeed from "./components/VideoFeed";
import videos from "./data/videos";

function App() {
  return (
    <div style={{
      maxWidth: "430px",
      height: "100vh",
      margin: "0 auto",
      background: "#000",
      position: "relative",
      overflow: "hidden",
    }}>
      <VideoFeed videos={videos} />
    </div>
  );
}

export default App;