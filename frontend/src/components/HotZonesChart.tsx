import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { CrowdData } from '../types';

interface Props {
  data: CrowdData[];
}

export const HotZonesChart: React.FC<Props> = ({ data }) => {
  // Count frequency of each zone being a hot zone
  const zoneFrequency = data.reduce((acc, frame) => {
    frame.hot_zones.forEach(zone => {
      acc[zone] = (acc[zone] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Convert to chart data format
  const chartData = Object.entries(zoneFrequency)
    .map(([zone, count]) => ({
      zone,
      count,
      percentage: Math.round((count / data.length) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  // Color scheme for bars
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 font-semibold">{`Zone: ${label}`}</p>
          <p className="text-red-400">{`Hot Zone Count: ${data.count}`}</p>
          <p className="text-gray-300">{`Frequency: ${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
      <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-red-400" />
        Hot Zone Frequency
      </h3>
      
      {chartData.length > 0 ? (
        <>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="zone" 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Statistics summary */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-red-400 font-semibold">Most Active Zone</div>
              <div className="text-gray-300">{chartData[0]?.zone || 'N/A'}</div>
              <div className="text-xs text-gray-400">
                {chartData[0]?.count || 0} times ({chartData[0]?.percentage || 0}%)
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-orange-400 font-semibold">Total Zones</div>
              <div className="text-gray-300">{chartData.length}</div>
              <div className="text-xs text-gray-400">
                Across {data.length} frames
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">No hot zone data available</p>
        </div>
      )}
    </div>
  );
};