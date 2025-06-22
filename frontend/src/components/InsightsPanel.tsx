import React from 'react';
import { Eye } from 'lucide-react';

interface Props {
  insights: string;
  protocol: string;
}

export const InsightsPanel: React.FC<Props> = ({ insights, protocol }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
    <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
      <Eye className="w-5 h-5 text-blue-400" />
      Insights
    </h3>
    <p className="text-sm text-gray-300 mb-4">{insights}</p>
    <div className="p-3 bg-blue-900 rounded-lg">
      <h4 className="font-semibold text-blue-300 mb-2">Recommended Protocol:</h4>
      <p className="text-sm text-blue-300">{protocol}</p>
    </div>
  </div>
);
