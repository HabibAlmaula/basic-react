import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h3 className="text-xl mb-4">{message}</h3>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
