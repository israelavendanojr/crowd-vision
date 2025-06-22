import React from 'react';

export const VideoPlayer: React.FC<{ src: string; frame: number; total: number }> = ({ src, frame, total }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-2">Live Feed</h2>
    <div className="relative">
      <img src={src} alt={`Frame ${frame + 1}`} className="w-full h-64 object-cover rounded-lg border-2 border-gray-200" />
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        Frame {frame + 1} / {total}
      </div>
    </div>
  </div>
);
