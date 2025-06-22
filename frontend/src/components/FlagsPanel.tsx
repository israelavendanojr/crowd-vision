import React from 'react';
import { Flag } from 'lucide-react';

interface Props {
  flags: string[];
}

const getFlagColor = (flag: string): string => {
  if (flag.includes('EMERGENCY') || flag.includes('CRITICAL')) return 'bg-red-900/20 text-red-400';
  if (flag.includes('WARNING') || flag.includes('RISK')) return 'bg-yellow-900/20 text-yellow-400';
  return 'bg-blue-900/20 text-blue-400';
};

export const FlagsPanel: React.FC<Props> = ({ flags }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
    <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
      <Flag className="w-5 h-5 text-purple-400" />
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
