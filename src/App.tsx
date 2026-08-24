import { useState } from "react";
import Sidebar from "./components/Sidebar";
import BlobPreview from "./components/BlobPreview";
import CodeModal from "./components/CodeModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { generateRandomBlob } from "./hooks/useBlob";
import type { BlobStyle } from "./hooks/useBlob";
import { Settings } from "lucide-react";

function App() {
  const [blobStyle, setBlobStyle] = useState<BlobStyle>(generateRandomBlob);
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage<boolean>(
    "blobmaker:sidebarOpen",
    true,
  );
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const randomize = () => setBlobStyle(generateRandomBlob());
  const reset = () => setBlobStyle(generateRandomBlob()); // Replace with default later

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      <BlobPreview blobStyle={blobStyle} />

      {isSidebarOpen ? (
        <Sidebar
          onClose={closeSidebar}
          onRandomize={randomize}
          onReset={reset}
          onGetCode={() => setIsCodeModalOpen(true)}
        />
      ) : (
        <button
          onClick={openSidebar}
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 shadow-lg transition-all"
          aria-label="Open controls"
        >
          <Settings className="w-5 h-5" />
        </button>
      )}

      {isCodeModalOpen && (
        <CodeModal
          blobStyle={blobStyle}
          onClose={() => setIsCodeModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
