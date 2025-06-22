import React from 'react';

interface VideoPlayerProps {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  videoRef,
  onTimeUpdate,
}) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-2">Live Feed</h2>
    <div className="relative w-full" style={{ height: '360px' }}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        src={src}
        onTimeUpdate={onTimeUpdate}
      />
    </div>
  </div>
);
