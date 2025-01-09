import React from "react";
import { RxCross1 } from "react-icons/rx";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4">
        <div className="mb-10 flex justify-between items-center">
          <h3 className="text-lg font-medium">
            Are you sure you want to delete?
          </h3>
          <button
            onClick={onClose}
          >
            <RxCross1 />
          </button>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-[#adadaf] bg-white text-gray-700 hover:bg-gray-200 text-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-[#ff3500] text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
