import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  riskLevel: string;
  riskTrend: string;
  summary: string;
}

export const RiskAssessment: React.FC<Props> = ({ riskLevel, riskTrend, summary }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <AlertTriangle className="w-5 h-5" />
      Risk Assessment
    </h3>
    <div className="space-y-3">
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-200">{summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-300">{riskLevel}</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">Risk Level</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-lg font-bold text-gray-600 dark:text-gray-200">{riskTrend}</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">Trend</div>
        </div>
      </div>
    </div>
  </div>
);
