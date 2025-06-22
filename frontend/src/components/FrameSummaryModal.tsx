// src/components/FrameSummaryModal.tsx
import React from 'react';
import { Dialog } from '@headlessui/react';
import ReactMarkdown from 'react-markdown';

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
        <Dialog.Panel
          className="bg-gray-800 text-white rounded-lg w-full max-w-4xl p-8 shadow-lg border border-blue-500 max-h-[80vh] flex flex-col"
        >
          <Dialog.Title className="text-lg font-bold mb-3">Frame Summary</Dialog.Title>
          <div className="overflow-y-auto text-sm whitespace-pre-line flex-1 pr-1">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
          <div className="mt-4 text-right">
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
