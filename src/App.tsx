import { useState } from "react";
import Sidebar from "./components/Sidebar";
import BlobPreview from "./components/BlobPreview";
import CodeModal from "./components/CodeModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useBlob } from "./hooks/useBlob";
import { Settings } from "lucide-react";

function App() {
  const {
    blobStyle,
    shape,
    displaySettings,
    setDisplaySettings,
    animationSettings,
    setAnimationSettings,
    effectSettings,
    setEffectSettings,
    colorSettings,
    setColorSettings,
    is3D,
    toggle3D,
    randomize,
    reset,
  } = useBlob();
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage<boolean>(
    "blobmaker:sidebarOpen",
    true,
  );
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      <BlobPreview
        blobStyle={blobStyle}
        shape={shape}
        morphIntensity={displaySettings.morphIntensity}
        animationSettings={animationSettings}
        effectSettings={effectSettings}
        is3D={is3D}
      />

      {isSidebarOpen ? (
        <Sidebar
          onClose={closeSidebar}
          onRandomize={randomize}
          onReset={reset}
          onGetCode={() => setIsCodeModalOpen(true)}
          displaySettings={displaySettings}
          onDisplaySettingsChange={setDisplaySettings}
          animationSettings={animationSettings}
          onAnimationSettingsChange={setAnimationSettings}
          effectSettings={effectSettings}
          onEffectSettingsChange={setEffectSettings}
          colorSettings={colorSettings}
          onColorSettingsChange={setColorSettings}
          is3D={is3D}
          onToggle3D={toggle3D}
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
