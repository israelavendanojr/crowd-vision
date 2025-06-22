import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  riskLevel: string;
  riskTrend: string;
  summary: string;
}

const getRiskColor = (level: string) => {
  switch (level.toUpperCase()) {
    case 'LOW': return {
      bg: 'bg-green-900/20',
      text: 'text-green-400'
    };
    case 'MEDIUM': return {
      bg: 'bg-yellow-900/20',
      text: 'text-yellow-400'
    };
    case 'HIGH': return {
      bg: 'bg-red-900/20',
      text: 'text-red-400'
    };
    default: return {
      bg: 'bg-gray-700/20',
      text: 'text-gray-400'
    };
  }
};

export const RiskAssessment: React.FC<Props> = ({ riskLevel, riskTrend, summary }) => {
  const riskColor = getRiskColor(riskLevel);
  return (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-600 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
    <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
      <AlertTriangle className="w-5 h-5 text-yellow-400" />
      Risk Assessment
    </h3>
    <div className="space-y-3">
      <div className="p-3 bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-300">{summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`text-center p-3 rounded-lg ${riskColor.bg}`}>
          <div className={`text-lg font-bold ${riskColor.text}`}>
            {riskLevel}
          </div>
          <div className="text-xs text-gray-300">Risk Level</div>
        </div>
        <div className="text-center p-3 bg-gray-800 rounded-lg">
          <div className="text-lg font-bold text-gray-300">{riskTrend}</div>
          <div className="text-xs text-gray-300">Trend</div>
        </div>
      </div>
    </div>
    </div>
  );
};
