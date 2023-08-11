import React from 'react';

export default function Tile({ number, className = '' }) {
  return (
    <div className={`h-[100px] w-[100px] border border-blue-700 flex justify-center items-center ${className}`}>
      {number || ''}
    </div>
  );
}
