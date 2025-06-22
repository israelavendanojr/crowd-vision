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
import { sampleData } from './sampleData';

const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summaryContent, setSummaryContent] = useState('Loading summary...');

  // Extend the imported CrowdData type with frame_summary
  type ExtendedCrowdData = CrowdData & {
    frame_summary?: string;
  };

  // Parse time_stamps to seconds (relative to video start)
  function parseTimeString(str: string) {
    const [min, sec] = str.split(':').map(Number);
    return min * 60 + sec;
  }
  const frameTimes = sampleData.map(d => parseTimeString(d.time_stamp));
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

  useEffect(() => {
    // Fetch the summary text file when the component mounts
    const fetchSummary = async () => {
      try {
        const response = await fetch('/summary.txt');
        const text = await response.text();
        setSummaryContent(text);
      } catch (error) {
        console.error('Error loading summary:', error);
        setSummaryContent('Failed to load summary. Please try again later.');
      }
    };

    fetchSummary();
  }, []);

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
                frameId={sampleData[currentFrame].id}
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
            
            {/* Summary Panel */}
            <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Cummulative Findings
              </h3>
              <div className="max-h-48 overflow-y-auto pr-2 mb-4">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                  {summaryContent.substring(0, 300)}{summaryContent.length > 500 ? '...' : ''}
                </pre>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                View Full Analysis
              </button>
            </div>

            {/* Modal - This will be conditionally rendered */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold text-white mb-4">Crowd Safety Analysis</h2>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans">{summaryContent}</pre>
                  </div>
                </div>
              </div>
            )}
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
            
            
          </div>
          
        </div>


      </div>
      
    </div>
  );
};

export default App;