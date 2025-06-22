import React, { useState } from 'react';

interface VideoPlayerProps {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate: () => void;
  gridX?: number;
  gridY?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  videoRef,
  onTimeUpdate,
  gridX = 4,
  gridY = 4,
}) => {
  const [showZones, setShowZones] = useState(false);

  // For overlay: create arrays for grid lines
  const verticals = Array.from({ length: gridX - 1 }, (_, i) => ((i + 1) / gridX) * 100);
  const horizontals = Array.from({ length: gridY - 1 }, (_, i) => ((i + 1) / gridY) * 100);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Live Feed</h2>
        <button
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            showZones
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-200 hover:bg-blue-700 hover:text-white'
          }`}
          onClick={() => setShowZones((v) => !v)}
        >
          {showZones ? 'Hide Zones' : 'Show Zones'}
        </button>
      </div>
      <div className="relative w-full" style={{ height: '360px' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          src={src}
          onTimeUpdate={onTimeUpdate}
        />
        {showZones && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Vertical grid lines */}
            {verticals.map((left, i) => (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-0.5 bg-blue-400 opacity-70"
                style={{ left: `${left}%` }}
              />
            ))}
            {/* Horizontal grid lines */}
            {horizontals.map((top, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-0.5 bg-blue-400 opacity-70"
                style={{ top: `${top}%` }}
              />
            ))}
            {/* Zone labels */}
            {Array.from({ length: gridY }).map((_, row) =>
              Array.from({ length: gridX }).map((_, col) => (
                <div
                  key={`zone-${row}-${col}`}
                  className="absolute text-xs text-blue-200 bg-blue-900/70 px-1 rounded pointer-events-none select-none"
                  style={{
                    left: `calc(${(col / gridX) * 100}% + 8px)`,
                    top: `calc(${(row / gridY) * 100}% + 8px)`,
                  }}
                >
                  {`${row}:${col}`}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
