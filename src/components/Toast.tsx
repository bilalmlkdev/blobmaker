import { ReactNode } from "react";
import { Z_INDEX } from "../constants/ui";

interface ToastProps {
  message: ReactNode;
}

/**
 * Toast notification component
 */
export function Toast({ message }: ToastProps) {
  return (
    <div
      role="status"
      className={`fixed bottom-6 left-1/2 z-${Z_INDEX.toast} -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-lg animate-pop-in`}
    >
      {message}
    </div>
  );
}
