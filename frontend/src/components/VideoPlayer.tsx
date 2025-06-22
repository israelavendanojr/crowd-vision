import React, { useState, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate: () => void;
  gridX?: number;
  gridY?: number;
}

interface DetectionPoint {
  x: number;
  y: number;
  confidence: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  videoRef,
  onTimeUpdate,
  gridX = 4,
  gridY = 4,
}) => {
  const [showZones, setShowZones] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [detectionData, setDetectionData] = useState<DetectionPoint[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // For overlay: create arrays for grid lines
  const verticals = Array.from(
    { length: gridX - 1 },
    (_, i) => ((i + 1) / gridX) * 100,
  );
  const horizontals = Array.from(
    { length: gridY - 1 },
    (_, i) => ((i + 1) / gridY) * 100,
  );

  // Load detection data from file
  useEffect(() => {
    const loadDetectionData = async () => {
      setDataLoading(true);
      try {
        const response = await fetch("/coordinates/frame_0000_0ms.txt");
        const textData = await response.text();

        const parsedData: DetectionPoint[] = [];
        const lines = textData.split("\n");

        for (const line of lines) {
          // Parse lines like: "  Class: person, x: 263, y: 91, confidence: 0.29"
          const match = line.match(
            /Class: person, x: (\d+), y: (\d+), confidence: ([\d.]+)/,
          );
          if (match) {
            parsedData.push({
              x: parseInt(match[1]),
              y: parseInt(match[2]),
              confidence: parseFloat(match[3]),
            });
          }
        }

        setDetectionData(parsedData);
      } catch (error) {
        console.error("Error loading detection data:", error);
        // Fallback to empty array if file can't be loaded
        setDetectionData([]);
      } finally {
        setDataLoading(false);
      }
    };

    loadDetectionData();
  }, []);

  // Generate individual blips for each detection point
  const generateHeatmapData = () => {
    if (detectionData.length === 0) return [];

    // Offset values (in pixels) to move points down and right
    const xOffset = 50;
    const yOffset = 50;

    return detectionData.map((point) => ({
      // Normalize coordinates to video player dimensions (assuming 1920x1080 source)
      x: ((point.x + xOffset) / 1920) * 100,
      y: ((point.y + yOffset) / 1022) * 100,
      confidence: point.confidence,
    }));
  };

  const heatmapData = generateHeatmapData();

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
              dataLoading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : showHeatmap
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-red-700 hover:text-white"
            }`}
            onClick={() => !dataLoading && setShowHeatmap((v) => !v)}
            disabled={dataLoading}
          >
            {dataLoading
              ? "Loading..."
              : showHeatmap
                ? "Hide Heatmap"
                : "Show Heatmap"}
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
              )),
            )}
          </div>
        )}
        {showHeatmap && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {heatmapData.map((point, i) => (
              <div
                key={`detection-${i}`}
                className="absolute rounded-full bg-red-500"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: "6px",
                  height: "6px",
                  opacity: Math.max(0.6, point.confidence), // Use confidence for opacity
                }}
              />
            ))}
            {/* Detection info */}
            <div className="absolute top-4 right-4 bg-black/70 rounded p-2 text-xs text-white">
              <div className="font-semibold mb-1">Person Detections</div>
              <div className="text-gray-300">
                {heatmapData.length} detections found
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
