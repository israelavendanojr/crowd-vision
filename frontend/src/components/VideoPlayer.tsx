import React from 'react';

export const VideoPlayer: React.FC<{ src: string; frame: number; total: number }> = ({ src, frame, total }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-2">Live Feed</h2>
    <div className="relative">
      <video width="640" height="360" controls>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        Frame {frame + 1} / {total}
      </div>
    </div>
  </div>
);
