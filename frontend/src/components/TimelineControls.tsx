import React from 'react';

interface Props {
  eventPercents: number[];
  eventTitles: string[];
  onEventClick: (idx: number) => void;
  progressPercent: number;
}

export const TimelineControls: React.FC<Props> = ({
  eventPercents,
  eventTitles,
  onEventClick,
  progressPercent,
}) => (
  <div className="relative w-full h-4 bg-gray-800 rounded my-4 overflow-hidden">
    {eventPercents.map((percent, i) => (
      <button
        key={i}
        type="button"
        className="absolute top-0 h-4 w-2 bg-blue-400 hover:bg-blue-600 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
        style={{ left: `calc(${Math.min(percent, 100)}% - 15px)` }}
        title={eventTitles[i]}
        onClick={() => onEventClick(i)}
        tabIndex={0}
      />
    ))}
    {/* Progress bar */}
    <div
      className="absolute top-0 left-0 h-4 bg-blue-600 opacity-30"
      style={{
        width: `${Math.min(progressPercent, 100)}%`
      }}
    />
  </div>
);
