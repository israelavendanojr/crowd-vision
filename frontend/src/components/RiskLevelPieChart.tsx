import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert } from 'lucide-react';
import { CrowdData } from '../types';

interface Props {
  data: CrowdData[];
}

export const RiskLevelPieChart: React.FC<Props> = ({ data }) => {
  const levelCounts = data.reduce((acc, frame) => {
    acc[frame.risk_level] = (acc[frame.risk_level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(levelCounts).map(([level, count]) => ({
    level,
    count,
    percentage: Math.round((count / data.length) * 100),
  }));

  const COLORS: Record<string, string> = {
    LOW: '#22c55e',
    MEDIUM: '#eab308',
    HIGH: '#ef4444',
    UNKNOWN: '#6b7280',
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.[0]) {
      const d = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 font-semibold">{d.level} RISK</p>
          <p className="text-red-400">{`Frames: ${d.count}`}</p>
          <p className="text-gray-300">{`Proportion: ${d.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-red-400" />
        Risk Level Distribution
      </h3>

      {chartData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="level"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ level, percentage }) => `${level} (${percentage}%)`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.level] || COLORS.UNKNOWN} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">No risk level data available</p>
        </div>
      )}
    </div>
  );
};
