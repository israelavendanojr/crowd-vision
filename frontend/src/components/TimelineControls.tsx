import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface Props {
  isPlaying: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  speed: number;
  setSpeed: (s: number) => void;
  currentFrame: number;
  totalFrames: number;
  setFrame: (n: number) => void;
}

export const TimelineControls: React.FC<Props> = ({
  isPlaying, onToggle, onNext, onPrev, speed, setSpeed, currentFrame, totalFrames, setFrame
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <button onClick={onPrev} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300">
        <SkipBack className="w-5 h-5" />
      </button>
      <button onClick={onToggle} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <button onClick={onNext} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300">
        <SkipForward className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Speed:</span>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="px-2 py-1 border border-gray-700 rounded text-sm bg-gray-800 text-gray-300"
        >
          {[0.5, 1, 2, 4].map(s => <option key={s} value={s}>{s}x</option>)}
        </select>
      </div>
    </div>
    <div className="relative">
      <input
        type="range"
        min="0"
        max={totalFrames - 1}
        value={currentFrame}
        onChange={(e) => setFrame(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span className="text-gray-400">Start</span>
        <span className="text-gray-400">End</span>
      </div>
    </div>
  </div>
);
