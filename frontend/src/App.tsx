import React, { useEffect, useRef, useState } from 'react';
import { framesData } from './framesData';
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

  // State for loaded report and coordinates for the current frame
  const [currentReport, setCurrentReport] = useState<any>(null);
  const [currentCoordinates, setCurrentCoordinates] = useState<any[]>([]);

  // Load report JSON and coordinates for the current frame
  useEffect(() => {
    const frame = framesData[currentFrame];
    // Load JSON report
    fetch(frame.reportFile)
      .then(res => res.json())
      .then(setCurrentReport)
      .catch(() => setCurrentReport(null));
    // Load coordinates (parse txt file)
    fetch(frame.coordinatesFile)
      .then(res => res.text())
      .then(txt => {
        // Parse lines like: "  Class: person, x: 263, y: 91, confidence: 0.29"
        const coords = txt
          .split('\n')
          .map(line => {
            const match = line.match(/Class: person, x: (\d+), y: (\d+), confidence: ([\d.]+)/);
            if (match) {
              return { x: Number(match[1]), y: Number(match[2]), confidence: Number(match[3]) };
            }
            return null;
          })
          .filter(Boolean);
        setCurrentCoordinates(coords as any[]);
      })
      .catch(() => setCurrentCoordinates([]));
  }, [currentFrame]);

  // Timeline logic based on framesData timestamps
  const frameTimes = framesData.map(d => d.timestampMs / 1000);
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

  // For charts: load all reports (for HotZonesChart, RiskTrendChart, etc.)
  const [allReports, setAllReports] = useState<any[]>([]);
  useEffect(() => {
    Promise.all(framesData.map(frame =>
      fetch(frame.reportFile).then(res => res.json()).catch(() => null)
    )).then(setAllReports);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-gray-200">
      <div className="max-w-7xl mx-auto">
        <Header data={currentReport} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-gray-700 rounded-lg shadow-lg p-4 border border-gray-600 transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-blue-500/50">
              <VideoPlayer
                src="/video/test_video_4k.mp4"
                videoRef={videoRef}
                onTimeUpdate={handleTimeUpdate}
                heatmapData={currentCoordinates}
                showHeatmap={true}
              />
              <TimelineControls
                eventPercents={eventPercents}
                eventTitles={framesData.map(d => `Event at ${d.timestampMs}ms`)}
                onEventClick={i => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = relativeFrameTimes[i];
                    setVideoTime(relativeFrameTimes[i]);
                  }
                }}
                progressPercent={(videoTime / (relativeFrameTimes[relativeFrameTimes.length - 1])) * 100}
                sampleData={framesData}
              />
            </div>

            {/* Data Visualization Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RiskTrendChart data={allReports.filter(Boolean)} currentFrame={currentFrame} />
              <HotZonesChart data={allReports.filter(Boolean)} />
            </div>
          </div>

          {/* Right Column - Status Panels */}
          <div className="space-y-6">
            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <RiskAssessment
                riskLevel={currentReport?.risk_level}
                riskTrend={currentReport?.risk_trend}
                summary={currentReport?.text_summary}
              />
            </div>

            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <HotZones zones={currentReport?.hot_zones} />
            </div>

            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <InsightsPanel insights={currentReport?.insights} protocol={currentReport?.protocol} />
            </div>

            <div className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <FlagsPanel flags={currentReport?.flags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;