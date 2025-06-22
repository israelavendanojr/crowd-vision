import React, { useEffect, useRef, useState } from 'react';
import { CrowdData } from './types';
import { Header } from './components/Header';
import { VideoPlayer } from './components/VideoPlayer';
import { TimelineControls } from './components/TimelineControls';
import { RiskAssessment } from './components/RiskAssessment';
import { HotZones } from './components/HotZones';
import { InsightsPanel } from './components/InsightsPanel';
import { FlagsPanel } from './components/FlagsPanel';
import { RiskTrendChart } from './components/RiskTrendChart';
import { HotZonesChart } from './components/HotZonesChart';

const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Extend the imported CrowdData type with frame_summary
  type ExtendedCrowdData = CrowdData & {
    frame_summary?: string;
  };

  const sampleData: ExtendedCrowdData[] = [
    {
      time_stamp: "2024-06-21T14:30:00Z",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZyYW1lIDEgLSBMb3cgUmlzazwvdGV4dD48L3N2Zz4=",
      risk_level: "LOW",
      risk_trend: "STABLE",
      hot_zones: ["Zone A", "Zone C"],
      summary: "Crowd density is within normal parameters. No immediate safety concerns detected.",
      insights: "Peak traffic expected in 15–20 minutes based on historical patterns.",
      protocol: "Continue standard monitoring procedures.",
      flags: ["NORMAL_OPERATIONS"],
      frame_summary: "Initial frame shows minimal crowd activity with even distribution. Entry points are clear, and the main concourse has light foot traffic. No signs of congestion or bottlenecks detected. Security personnel are visible and positioned at key locations. The environment appears calm and well-managed."
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
      flags: ["CROWD_BUILDUP", "BOTTLENECK_DETECTED"],
      frame_summary: "Noticeable increase in crowd density, particularly near the main entrance. Zone A shows signs of congestion with reduced movement speed. Security personnel are redirecting foot traffic to less crowded areas. The eastern corridor is becoming congested as visitors enter in large groups. Staff are actively monitoring the situation and implementing crowd control measures."
    },
    {
      time_stamp: "2024-06-21T14:32:00Z",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVlMmVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZyYW1lIDMgLSBIaWdoIFJpc2s8L3RleHQ+PC9zdmc=",
      risk_level: "HIGH",
      risk_trend: "INCREASING",
      hot_zones: ["Zone A", "Zone B", "Zone C", "Zone D"],
      summary: "CRITICAL: Dangerous crowd density levels detected. Immediate intervention required.",
      insights: "Crowd crush risk in Zone A. Emergency exits may become inaccessible.",
      protocol: "EMERGENCY PROTOCOL ACTIVATED. Initiate crowd dispersal procedures immediately.",
      flags: ["EMERGENCY", "CROWD_CRUSH_RISK", "EXIT_BLOCKAGE"],
      frame_summary: "CRITICAL SITUATION: Severe overcrowding detected in multiple zones. Zone A shows signs of crowd crush risk with extremely limited movement. Emergency exits are becoming blocked by the crowd. Security personnel are implementing emergency protocols. Immediate action required to prevent dangerous conditions. Evacuation procedures have been initiated. Crowd control barriers are being deployed to manage flow and prevent further congestion."
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-gray-200">
      <div className="max-w-7xl mx-auto">
        <Header data={currentData} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Video Player and Frame Analysis */}
          <div className="lg:col-span-2 bg-gray-700 rounded-lg shadow-lg p-6 border border-gray-600 transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-blue-500/50 flex flex-col">
            <div className="flex-grow-0">
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
            {/* Frame Analysis */}
            <div className="mt-4 pt-4 border-t border-gray-600/50 w-full text-center flex flex-col flex-grow min-h-0">
              <h3 className="text-base font-medium text-gray-100 mb-3">Frame Analysis</h3>
              <div className="text-gray-300 leading-relaxed space-y-2 overflow-y-auto pr-2 flex-grow">
                {currentData.frame_summary ? (
                  currentData.frame_summary.split('. ').map((sentence, i, arr) => 
                    sentence ? (
                      <p key={i} className="w-full">
                        {sentence.trim()}{i < arr.length - 1 ? '.' : ''}
                      </p>
                    ) : null
                  )
                ) : "No analysis available for this frame."}
              </div>
            </div>
          </div>

          {/* Right Column - Status Panels */}
          <div className="space-y-6">
            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <RiskAssessment
                riskLevel={currentData.risk_level}
                riskTrend={currentData.risk_trend}
                summary={currentData.summary}
              />
            </div>
            
            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <HotZones zones={currentData.hot_zones} />
            </div>
            
            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <InsightsPanel insights={currentData.insights} protocol={currentData.protocol} />
            </div>
            
            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <FlagsPanel flags={currentData.flags} />
            </div>
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-blue-500/50">
            <RiskTrendChart data={sampleData} currentFrame={currentFrame} />
          </div>
          
          <div className="transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-blue-500/50">
            <HotZonesChart data={sampleData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;