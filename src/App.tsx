import Sidebar from "./components/Sidebar";
import BlobPreview from "./components/BlobPreview";

function App() {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Sidebar />
      <BlobPreview />
    </div>
  );
}

export default App;
