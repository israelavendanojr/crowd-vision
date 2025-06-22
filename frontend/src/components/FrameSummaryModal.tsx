// src/components/FrameSummaryModal.tsx
import React from 'react';
import { Dialog } from '@headlessui/react';

interface FrameSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
}

export const FrameSummaryModal: React.FC<FrameSummaryModalProps> = ({ isOpen, onClose, summary }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-800 text-white rounded-lg max-w-xl w-full p-6 shadow-lg border border-blue-500">
          <Dialog.Title className="text-lg font-bold mb-4">Frame Summary</Dialog.Title>
          <p className="text-sm whitespace-pre-line">{summary}</p>
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
