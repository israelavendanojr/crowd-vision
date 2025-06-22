import React from 'react';
import { MapPin } from 'lucide-react';

interface Props {
  zones: string[];
}

export const HotZones: React.FC<Props> = ({ zones }) => {
  if (!Array.isArray(zones)) return null; // or show a placeholder

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
      <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-red-400" />
        Hot Zones
      </h3>
      <div className="flex flex-wrap gap-2">
        {zones.map((zone, index) => (
          <span key={index} className="px-3 py-1 bg-red-900/20 text-red-400 rounded-full text-sm font-medium">
            {zone}
          </span>
        ))}
      </div>
    </div>
  );
};
