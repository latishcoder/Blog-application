import { useEffect, useState } from "react";

/**
 * Props type
 */
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
  duration = 4500,
}) => {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    // Auto close after duration
    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => prev - 100 / (duration / 60));
    }, 60);

    return () => {
      clearTimeout(closeTimer);
      clearInterval(interval);
    };
  }, [onClose, duration]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
      <div
        className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg min-w-[260px]`}
      >
        <p className="font-medium">{message}</p>

        <div className="mt-2 h-1 bg-white/30 rounded">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${Math.max(progress, 0)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
