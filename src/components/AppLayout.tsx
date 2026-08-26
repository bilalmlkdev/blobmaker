import { ReactNode } from "react";
import { cn } from "../lib/classNames";

interface AppLayoutProps {
  header: ReactNode;
  leftPanel: ReactNode;
  centerContent: ReactNode;
  rightPanel: ReactNode;
  toast?: ReactNode;
  modal?: ReactNode;
}

/**
 * Main application layout with three-panel structure
 */
export function AppLayout({
  header,
  leftPanel,
  centerContent,
  rightPanel,
  toast,
  modal,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Header */}
      {header}

      {/* Main content area */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-12 lg:flex-row lg:items-start lg:gap-8">
        {/* Left panel */}
        <aside className="w-full shrink-0 lg:w-72">{leftPanel}</aside>

        {/* Center content */}
        <div className="flex flex-1 items-center justify-center">{centerContent}</div>

        {/* Right panel */}
        <aside className="w-full shrink-0 lg:w-80">{rightPanel}</aside>
      </main>

      {/* Toast notification */}
      {toast}

      {/* Modal overlay */}
      {modal}
    </div>
  );
}
