import React from 'react';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CrowdData } from '../types';

export const Header: React.FC<{ data: CrowdData }> = ({ data }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-600 bg-green-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'INCREASING': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'DECREASING': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'STABLE': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Crowd Danger Detector</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600">{new Date(data.time_stamp).toLocaleString()}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(data.risk_level)}`}>
          {data.risk_level} RISK
        </div>
        <div className="flex items-center gap-1">
          {getTrendIcon(data.risk_trend)}
          <span className="text-sm text-gray-600">{data.risk_trend}</span>
        </div>
      </div>
    </div>
  );
};
