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
  const [videoTime, setVideoTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Extend the imported CrowdData type with frame_summary
  type ExtendedCrowdData = CrowdData & {
    frame_summary?: string;
  };

  const sampleData: ExtendedCrowdData[] = [
    {
      time_stamp: "2024-06-21T14:30:00Z",
      image: "http://localhost:5001/video/test_video_4k.mp4", // <-- update this line
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
      time_stamp: "2024-06-21T14:30:23Z",
      image: "./backend/data/test_video_4k.mp4",
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
      time_stamp: "2024-06-21T14:30:46Z",
      image: "./backend/data/test_video_4k.mp4",
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

  // Parse time_stamps to seconds (relative to video start)
  const frameTimes = sampleData.map(d => new Date(d.time_stamp).getTime() / 1000);
  const videoStart = frameTimes[0];
  const relativeFrameTimes = frameTimes.map(t => t - videoStart);

  // Find the closest frame for the current video time
  useEffect(() => {
    const idx = relativeFrameTimes.findIndex((t, i) =>
      videoTime >= t && (i === relativeFrameTimes.length - 1 || videoTime < relativeFrameTimes[i + 1])
    );
    if (idx !== -1 && idx !== currentFrame) setCurrentFrame(idx);
  }, [videoTime, relativeFrameTimes, currentFrame]);

  // Handler for video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoTime(videoRef.current.currentTime);
    }
  };

  // Timeline event indicators (as percentages)
  const eventPercents = relativeFrameTimes.map(t => (t / (relativeFrameTimes[relativeFrameTimes.length - 1])) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-gray-200">
      <div className="max-w-7xl mx-auto">
        <Header data={sampleData[currentFrame]} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-gray-700 rounded-lg shadow-lg p-4 border border-gray-600 transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-blue-500/50">
              <VideoPlayer
                src="/video/test_video_4k.mp4"
                videoRef={videoRef}
                onTimeUpdate={handleTimeUpdate}
              />
              <TimelineControls
                eventPercents={eventPercents}
                eventTitles={sampleData.map(d => `Event at ${d.time_stamp}`)}
                onEventClick={i => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = relativeFrameTimes[i];
                    setVideoTime(relativeFrameTimes[i]);
                  }
                }}
                progressPercent={(videoTime / (relativeFrameTimes[relativeFrameTimes.length - 1])) * 100}
                sampleData={sampleData}
              />
            </div>
            
            {/* Data Visualization Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RiskTrendChart data={sampleData} currentFrame={currentFrame} />
              <HotZonesChart data={sampleData} />
            </div>
            {/* Frame Analysis */}
            <div className="mt-4 pt-4 border-t border-gray-600/50 w-full text-center flex flex-col flex-grow min-h-0">
              <h3 className="text-base font-medium text-gray-100 mb-3">Frame Analysis</h3>
              <div className="text-gray-300 leading-relaxed space-y-2 overflow-y-auto pr-2 flex-grow">
                {sampleData[currentFrame].frame_summary ? (
                  sampleData[currentFrame].frame_summary.split('. ').map((sentence, i, arr) => 
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
                riskLevel={sampleData[currentFrame].risk_level}
                riskTrend={sampleData[currentFrame].risk_trend}
                summary={sampleData[currentFrame].summary}
              />
            </div>
            
            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <HotZones zones={sampleData[currentFrame].hot_zones} />
            </div>
            
            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <InsightsPanel insights={sampleData[currentFrame].insights} protocol={sampleData[currentFrame].protocol} />
            </div>
            
            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <FlagsPanel flags={sampleData[currentFrame].flags} />
            </div>
            {/* <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <RiskLevelPieChart data={sampleData} />
            </div> */}
          </div>
        </div>


      </div>
    </div>
  );
};

export default App;