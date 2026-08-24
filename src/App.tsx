import { useState } from "react";
import Sidebar from "./components/Sidebar";
import BlobPreview from "./components/BlobPreview";
import { generateRandomBlob } from "./hooks/useBlob";
import type {BlobStyle} from './hooks/useBlob'

function App() {
  const [blobStyle, setBlobStyle] = useState<BlobStyle>(generateRandomBlob);

  const randomize = () => setBlobStyle(generateRandomBlob());

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Sidebar onRandomize={randomize} />
      <BlobPreview blobStyle={blobStyle} />
    </div>
  );
}

export default App;
