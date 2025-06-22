import React, { useState } from "react";

interface DetectionPoint {
  x: number;
  y: number;
  confidence: number;
}

interface VideoPlayerProps {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate: () => void;
  heatmapData?: DetectionPoint[];
  showHeatmap?: boolean; // optional external control
  gridX?: number;
  gridY?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  videoRef,
  onTimeUpdate,
  heatmapData = [],
  showHeatmap = false,
  gridX = 4,
  gridY = 4,
}) => {
  const [showZones, setShowZones] = useState(false);
  const [internalShowHeatmap, setInternalShowHeatmap] = useState(showHeatmap);

  // Grid lines
  const verticals = Array.from({ length: gridX - 1 }, (_, i) => ((i + 1) / gridX) * 100);
  const horizontals = Array.from({ length: gridY - 1 }, (_, i) => ((i + 1) / gridY) * 100);

  // Normalize detection point to % for positioning
  const normalizedPoints = heatmapData.map((point) => ({
    x: ((point.x + 50) / 1920) * 100,
    y: ((point.y + 50) / 1022) * 100,
    confidence: point.confidence,
  }));

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Video Feed</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              showZones
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-blue-700 hover:text-white"
            }`}
            onClick={() => setShowZones((v) => !v)}
          >
            {showZones ? "Hide Zones" : "Show Zones"}
          </button>
          <button
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              internalShowHeatmap
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-red-700 hover:text-white"
            }`}
            onClick={() => setInternalShowHeatmap((v) => !v)}
          >
            {internalShowHeatmap ? "Hide Heatmap" : "Show Heatmap"}
          </button>
        </div>
      </div>

      <div className="relative w-full" style={{ height: "360px" }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          src={src}
          onTimeUpdate={onTimeUpdate}
        />

        {showZones && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {verticals.map((left, i) => (
              <div key={`v-${i}`} className="absolute top-0 bottom-0 w-0.5 bg-blue-400 opacity-70" style={{ left: `${left}%` }} />
            ))}
            {horizontals.map((top, i) => (
              <div key={`h-${i}`} className="absolute left-0 right-0 h-0.5 bg-blue-400 opacity-70" style={{ top: `${top}%` }} />
            ))}
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
              )),
            )}
          </div>
        )}

        {internalShowHeatmap && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {normalizedPoints.map((point, i) => (
              <div
                key={`detection-${i}`}
                className="absolute rounded-full bg-red-500"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: "6px",
                  height: "6px",
                  opacity: Math.max(0.6, point.confidence),
                }}
              />
            ))}
            <div className="absolute top-4 right-4 bg-black/70 rounded p-2 text-xs text-white">
              <div className="font-semibold mb-1">Person Detections</div>
              <div className="text-gray-300">{normalizedPoints.length} detections found</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
