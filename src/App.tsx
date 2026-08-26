import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoadingScreen } from "./pages/LoadingScreen";
import { AppEditor } from "./pages/AppEditor";
import { TemplatesPage } from "./pages/TemplatesPage";
import { DocsPage } from "./pages/DocsPage";

/** Top-level route table for the site: marketing/landing, the loader
 * transition, the main editor, the template gallery and docs. */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/loading" element={<LoadingScreen />} />
      <Route path="/app" element={<AppEditor />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  );
}
