interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
