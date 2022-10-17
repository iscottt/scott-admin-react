import React, { useState } from 'react';
import './index.less';

const SLoading: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 bottom-0 w-full flex items-center justify-center bg-[rgba(255,255,255,0.9)]">
      <svg viewBox="25 25 50 50" className="w-42px h-42px circular">
        <circle cx="50" cy="50" r="20" fill="none" className="path" />
      </svg>
    </div>
  );
};
export default SLoading;
