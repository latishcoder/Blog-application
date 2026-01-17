import { Heart } from "lucide-react";

/**
 * Props type
 */
interface LikeButtonProps {
  likes: number;
  onClick: () => void;
  isLiked?: boolean;
  disabled?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  likes,
  onClick,
  isLiked = false,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
        isLiked
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <Heart
        size={16}
        className={`transition-transform duration-200 ${
          isLiked ? "fill-current scale-110" : ""
        }`}
      />
      <span className="text-sm font-medium">{likes}</span>
    </button>
  );
};

export default LikeButton;
