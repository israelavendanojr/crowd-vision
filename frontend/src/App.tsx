import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, AlertTriangle, TrendingUp, TrendingDown, Minus, Clock, MapPin, Flag, Eye } from 'lucide-react';

// Type definitions
interface CrowdData {
  time_stamp: string;
  image: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  risk_trend: 'INCREASING' | 'DECREASING' | 'STABLE';
  hot_zones: string[];
  summary: string;
  insights: string;
  protocol: string;
  flags: string[];
}

const App: React.FC = () => {
  // Sample data - replace with your actual data
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const intervalRef = useRef(null);

  // Sample data structure
  const sampleData = [
    {
      time_stamp: "2024-06-21T14:30:00Z",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZyYW1lIDEgLSBMb3cgUmlzazwvdGV4dD48L3N2Zz4=",
      risk_level: "LOW",
      risk_trend: "STABLE",
      hot_zones: ["Zone A", "Zone C"],
      summary: "Crowd density is within normal parameters. No immediate safety concerns detected.",
      insights: "Peak traffic expected in 15-20 minutes based on historical patterns.",
      protocol: "Continue standard monitoring procedures.",
      flags: ["NORMAL_OPERATIONS"]
    },
    {
      time_stamp: "2024-06-21T14:31:00Z",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2NkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZyYW1lIDIgLSBNZWRpdW0gUmlzazwvdGV4dD48L3N2Zz4=",
      risk_level: "MEDIUM",
      risk_trend: "INCREASING",
      hot_zones: ["Zone A", "Zone B", "Zone D"],
      summary: "Crowd density increasing in multiple zones. Elevated attention required.",
      insights: "Bottleneck formation detected near main entrance. Consider crowd flow management.",
      protocol: "Deploy additional personnel to Zone A and B. Monitor closely.",
      flags: ["CROWD_BUILDUP", "BOTTLENECK_DETECTED"]
    },
    {
      time_stamp: "2024-06-21T14:32:00Z",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZyYW1lIDMgLSBIaWdoIFJpc2s8L3RleHQ+PC9zdmc+",
      risk_level: "HIGH",
      risk_trend: "INCREASING",
      hot_zones: ["Zone A", "Zone B", "Zone C", "Zone D"],
      summary: "CRITICAL: Dangerous crowd density levels detected. Immediate intervention required.",
      insights: "Crowd crush risk in Zone A. Emergency exits may become inaccessible.",
      protocol: "EMERGENCY PROTOCOL ACTIVATED. Initiate crowd dispersal procedures immediately.",
      flags: ["EMERGENCY", "CROWD_CRUSH_RISK", "EXIT_BLOCKAGE"]
    }
  ];

  const currentData: CrowdData = sampleData[currentFrame] || sampleData[0];

  // Playback controls
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % sampleData.length);
      }, 1000 / playbackSpeed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, playbackSpeed, sampleData.length]);

  const togglePlayback = () => setIsPlaying(!isPlaying);
  const nextFrame = () => setCurrentFrame(prev => (prev + 1) % sampleData.length);
  const prevFrame = () => setCurrentFrame(prev => (prev - 1 + sampleData.length) % sampleData.length);

  const getRiskColor = (level: string): string => {
    switch (level) {
      case 'LOW': return 'text-green-600 bg-green-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string): JSX.Element => {
    switch (trend) {
      case 'INCREASING': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'DECREASING': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'STABLE': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getFlagColor = (flag: string): string => {
    if (flag.includes('EMERGENCY') || flag.includes('CRITICAL')) return 'bg-red-100 text-red-800';
    if (flag.includes('WARNING') || flag.includes('RISK')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crowd Danger Detector</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">
                {new Date(currentData.time_stamp).toLocaleString()}
              </span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(currentData.risk_level)}`}>
              {currentData.risk_level} RISK
            </div>
            <div className="flex items-center gap-1">
              {getTrendIcon(currentData.risk_trend)}
              <span className="text-sm text-gray-600">{currentData.risk_trend}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Frame */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Live Feed</h2>
                <div className="relative">
                  <img 
                    src={currentData.image} 
                    alt={`Frame ${currentFrame + 1}`}
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    Frame {currentFrame + 1} / {sampleData.length}
                  </div>
                </div>
              </div>

              {/* Timeline Controls */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevFrame}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={togglePlayback}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={nextFrame}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Speed:</span>
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={1}>1x</option>
                      <option value={2}>2x</option>
                      <option value={4}>4x</option>
                    </select>
                  </div>
                </div>

                {/* Timeline Scrubber */}
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={sampleData.length - 1}
                    value={currentFrame}
                    onChange={(e) => setCurrentFrame(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Start</span>
                    <span>End</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Panel */}
          <div className="space-y-6">
            {/* Risk Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Assessment
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{currentData.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{currentData.risk_level}</div>
                    <div className="text-xs text-gray-600">Risk Level</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-600">{currentData.risk_trend}</div>
                    <div className="text-xs text-gray-600">Trend</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hot Zones */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Hot Zones
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentData.hot_zones.map((zone, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Insights
              </h3>
              <p className="text-sm text-gray-700 mb-4">{currentData.insights}</p>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Recommended Protocol:</h4>
                <p className="text-sm text-blue-700">{currentData.protocol}</p>
              </div>
            </div>

            {/* Flags */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Flag className="w-5 h-5" />
                System Flags
              </h3>
              <div className="space-y-2">
                {currentData.flags.map((flag, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${getFlagColor(flag)}`}
                  >
                    {flag.replace(/_/g, ' ')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;