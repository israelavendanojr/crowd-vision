import React from 'react';
import { MapPin } from 'lucide-react';

interface Props {
  zones: string[];
}

export const HotZones: React.FC<Props> = ({ zones }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <MapPin className="w-5 h-5" />
      Hot Zones
    </h3>
    <div className="flex flex-wrap gap-2">
      {zones.map((zone, index) => (
        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-sm font-medium">
          {zone}
        </span>
      ))}
    </div>
  </div>
);
