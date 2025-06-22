import React, { useEffect, useRef, useState } from 'react';
import { CrowdData } from './types';
import { Header } from './components/Header';
import { VideoPlayer } from './components/VideoPlayer';
import { TimelineControls } from './components/TimelineControls';
import { RiskAssessment } from './components/RiskAssessment';
import { HotZones } from './components/HotZones';
import { InsightsPanel } from './components/InsightsPanel';
import { FlagsPanel } from './components/FlagsPanel';

const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const sampleData: CrowdData[] = [
  {
    time_stamp: "2024-06-21T14:30:00Z",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZyYW1lIDEgLSBMb3cgUmlzazwvdGV4dD48L3N2Zz4=",
    risk_level: "LOW",
    risk_trend: "STABLE",
    hot_zones: ["Zone A", "Zone C"],
    summary: "Crowd density is within normal parameters. No immediate safety concerns detected.",
    insights: "Peak traffic expected in 15–20 minutes based on historical patterns.",
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

  const currentData = sampleData[currentFrame];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % sampleData.length);
      }, 1000 / playbackSpeed);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isPlaying, playbackSpeed]);

  return (
    <div className="min-h-screen bg-gray-950 dark:bg-gray-950 p-6 text-gray-100 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <Header data={currentData} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <VideoPlayer src={currentData.image} frame={currentFrame} total={sampleData.length} />
            <TimelineControls
              isPlaying={isPlaying}
              onToggle={() => setIsPlaying(!isPlaying)}
              onNext={() => setCurrentFrame((prev) => (prev + 1) % sampleData.length)}
              onPrev={() => setCurrentFrame((prev) => (prev - 1 + sampleData.length) % sampleData.length)}
              speed={playbackSpeed}
              setSpeed={setPlaybackSpeed}
              currentFrame={currentFrame}
              totalFrames={sampleData.length}
              setFrame={setCurrentFrame}
            />
          </div>

          <RiskAssessment
            riskLevel={currentData.risk_level}
            riskTrend={currentData.risk_trend}
            summary={currentData.summary}
          />
          <HotZones zones={currentData.hot_zones} />
          <InsightsPanel insights={currentData.insights} protocol={currentData.protocol} />
          <FlagsPanel flags={currentData.flags} />
        </div>
      </div>
    </div>
  );
};

export default App;
