import React from 'react';
import { Flag } from 'lucide-react';

interface Props {
  flags: string[];
}

const getFlagColor = (flag: string): string => {
  if (flag.includes('EMERGENCY') || flag.includes('CRITICAL')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  if (flag.includes('WARNING') || flag.includes('RISK')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
};

export const FlagsPanel: React.FC<Props> = ({ flags }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Flag className="w-5 h-5" />
      System Flags
    </h3>
    <div className="space-y-2">
      {flags.map((flag, index) => (
        <div key={index} className={`px-3 py-2 rounded-lg text-sm font-medium ${getFlagColor(flag)}`}>
          {flag.replace(/_/g, ' ')}
        </div>
      ))}
    </div>
  </div>
);
