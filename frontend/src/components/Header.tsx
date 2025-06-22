import React from 'react';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CrowdData } from '../types';

export const Header: React.FC<{ data: CrowdData; className?: string }> = ({ data, className = '' }) => {
  if (!data) return null; // 👈 Prevent crash while loading

  const getRiskColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'LOW': return 'text-green-400 bg-green-900/20 dark:text-green-400 dark:bg-green-900/20';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-900/20 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'HIGH': return 'text-red-400 bg-red-900/20 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toUpperCase()) {
      case 'INCREASING': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'DECREASING': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'STABLE': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="mb-2">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          CrowdVision
        </h1>
        <p className="text-sm text-gray-400 mt-1">AI Crowd Safety Analysis Tool</p>
      </div>
      <div className="flex items-center gap-4">
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(data.risk_level)}`}>
          {data.risk_level} RISK
        </div>
        <div className="flex items-center gap-1">
          {getTrendIcon(data.risk_trend)}
          <span className="text-sm text-gray-400">{data.risk_trend}</span>
        </div>
      </div>
    </div>
  );
};
