import { useState } from "react";
import Sidebar from "./components/Sidebar";
import BlobPreview from "./components/BlobPreview";
import type { BlobStyle, } from "./hooks/useBlob";
import {generateRandomBlob} from './hooks/useBlob'

function App() {
  const [blobStyle, setBlobStyle] = useState<BlobStyle>(generateRandomBlob);

  const randomize = () => setBlobStyle(generateRandomBlob());

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* Full‑screen blob preview */}
      <BlobPreview blobStyle={blobStyle} />

      {/* Floating sidebar – top right */}
      <Sidebar onRandomize={randomize} />
    </div>
  );
}

export default App;
