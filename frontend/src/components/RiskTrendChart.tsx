import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { ExtendedCrowdData } from '../types'; // Make sure this type includes time_stamp and risk_level, etc.

interface Props {
  data: ExtendedCrowdData[];
  currentFrame: number;
}

const getRiskValue = (level: string): number => {
  switch (level?.toUpperCase()) {
    case 'LOW': return 1;
    case 'MEDIUM': return 2;
    case 'HIGH': return 3;
    default: return 0;
  }
};

const getRiskColor = (value: number): string => {
  switch (value) {
    case 1: return '#10b981'; // green
    case 2: return '#f59e0b'; // yellow
    case 3: return '#ef4444'; // red
    default: return '#6b7280'; // gray
  }
};

export const RiskTrendChart: React.FC<Props> = ({ data, currentFrame }) => {
  const chartData = data.map((item, index) => ({
    frame: index + 1,
    risk: getRiskValue(item.risk_level),
    riskLevel: item.risk_level,
    timestamp: item.time_stamp,
    isCurrentFrame: index === currentFrame,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300">{`Frame: ${label}`}</p>
          <p className="text-gray-300">{`Time: ${data.timestamp}`}</p>
          <p className={`font-semibold ${
            data.riskLevel?.toUpperCase() === 'LOW' ? 'text-green-400' :
            data.riskLevel?.toUpperCase() === 'MEDIUM' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {`Risk Level: ${data.riskLevel}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isCurrentFrame) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#9ca3af"
          stroke="#fff"
          strokeWidth={2}
          className="animate-pulse"
        />
      );
    }
    return (
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="#9ca3af"
      />
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-400" />
        Risk Level Over Time
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="frame" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 3.5]}
              ticks={[1, 2, 3]}
              tickFormatter={(value) => {
                switch (value) {
                  case 1: return 'LOW';
                  case 2: return 'MEDIUM';
                  case 3: return 'HIGH';
                  default: return '';
                }
              }}
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="risk" 
              stroke="#3b82f6"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-300">Low Risk</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-300">Medium Risk</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-300">High Risk</span>
        </div>
      </div>
    </div>
  );
};
