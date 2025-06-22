import React from 'react';
import { Eye } from 'lucide-react';

interface Props {
  insights: string;
  protocol: string;
}

export const InsightsPanel: React.FC<Props> = ({ insights, protocol }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Eye className="w-5 h-5" />
      Insights
    </h3>
    <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">{insights}</p>
    <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Recommended Protocol:</h4>
      <p className="text-sm text-blue-700 dark:text-blue-200">{protocol}</p>
    </div>
  </div>
);
